# Generated by Django 4.1.7 on 2023-04-23 16:43

from django.db import migrations, models
import tic_tac_toe.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Room_reference', models.CharField(default=tic_tac_toe.models.get_ref, max_length=6)),
            ],
        ),
    ]