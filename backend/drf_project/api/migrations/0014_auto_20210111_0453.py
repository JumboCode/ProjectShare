# Generated by Django 3.1.5 on 2021-01-11 04:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_auto_20210111_0435'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='location',
        ),
        migrations.AddField(
            model_name='post',
            name='locations',
            field=models.ManyToManyField(related_name='posts', to='api.Location'),
        ),
    ]
