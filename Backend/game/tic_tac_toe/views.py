from django.shortcuts import render
from django.http.response import HttpResponse
from .models import Room
import json
# Create your views here.


def CreateRoom(request):
    room = Room()
    room.save()
    return HttpResponse(json.dumps({
        "Status": "success",
        "room": room.Room_reference
    }))
