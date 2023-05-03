from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import Room
import json
import random


class Game(WebsocketConsumer):

    def connect(self):
        self.room = self.scope["url_route"]["kwargs"]["game_id"]
        room = Room.objects.get(Room_reference=self.room)
        if room.count < 2:
            async_to_sync(self.channel_layer.group_add)(
                "game_" + self.room,
                self.channel_name
            )
            if room.count == 0:
                user = "X"
            else:
                user = "O"
            room.count += 1
            room.save()
            self.accept()
            self.send(json.dumps({
                "status": "success",
                "user": user
            }))
            if room.count == 2:
                async_to_sync(self.channel_layer.group_send)(
                    "game_"+self.room,
                    {
                        "type": "start_game",
                        "text": json.dumps({
                            "message": "Start"
                        })
                    }
                )
        else:
            self.accept()
            self.send(json.dumps({
                "status": "failed",
                "message": "room is full"
            }))

    def receive(self, text_data):
        data = json.loads(text_data)
        print(data)
        if data["type"] == "move":
            async_to_sync(self.channel_layer.group_send)(
                "game_" + self.room,
                {
                    "type": "move",
                    "data": text_data
                }
            )
        elif data["type"] == "message":
            async_to_sync(self.channel_layer.group_send)(
                "game_" + self.room,
                {
                    "type": "message",
                    "data": text_data
                }
            )

    def disconnect(self, code):
        print(self.room)

    def start_game(self, event):
        self.send(text_data=event["text"])

    def move(self, event):
        self.send(text_data=event["data"])

    def message(self, event):
        self.send(text_data=event["data"])
