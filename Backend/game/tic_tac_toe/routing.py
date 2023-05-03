from django.urls import re_path, path
from .consumers import Game

webscoket_urlpattern = [
    re_path(r'ws/game/(?P<game_id>\w+)/$', Game.as_asgi()),
]
