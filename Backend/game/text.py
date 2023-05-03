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
        print(unique_ref)


print(get_ref())
