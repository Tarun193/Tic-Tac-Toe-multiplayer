from django.urls import path, include
from .views import CreateRoom

urlpatterns = [
    path('createRoom/', view=CreateRoom),

]
