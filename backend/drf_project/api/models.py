# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models


class Location(models.Model):
    latitude = models.CharField(max_length=50)
    longitude = models.CharField(max_length=50)


class Tag(models.Model):
    name = models.CharField(max_length=30)
    keywords = models.TextField()


class Category(models.Model):
    name = models.CharField(max_length=30)


# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=5000)
    date = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    content = models.TextField()
    # Cannot use ImageField because Pillow is not installed.
    # img = models.ImageField(upload_to=user_directory_path)
    language = models.CharField(max_length=20)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
