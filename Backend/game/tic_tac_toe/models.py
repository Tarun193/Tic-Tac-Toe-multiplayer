from django.db import models
import random
import string

options = list(set(string.ascii_lowercase).union(
    set(string.ascii_uppercase)).union(set(string.digits)))


def get_ref():
    not_unique = True
    while not_unique:
        unique_ref = ""
        for i in range(0, 6):
            unique_ref += random.choice(options)
        if not Room.objects.filter(Room_reference=unique_ref):
            not_unique = False
            return unique_ref


class Room(models.Model):
    Room_reference = models.CharField(
        max_length=6, blank=False, default=get_ref)
    count = models.IntegerField(blank=True, default=0)

    def __str__(self):
        return self.Room_reference
