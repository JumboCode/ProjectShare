# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models


class Location(models.Model):
    latitude = models.CharField(max_length=50)
    longitude = models.CharField(max_length=50)

    class Meta:
        unique_together = ('latitude', 'longitude')


class Tag(models.Model):
    name = models.CharField(max_length=30, unique=True)


class Category(models.Model):
    name = models.CharField(max_length=30, unique=True)


class Image(models.Model):
    img_file = models.ImageField()
    img_name = models.CharField(
        max_length=50,
        blank=True,
        unique=True)


class Post(models.Model):
    LANG_CHOICES = [
            ('EN', 'English'),
            ('SP', 'Spanish'),
    ]

    title = models.CharField(max_length=5000)
    date = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, related_name='posts')
    images = models.ManyToManyField(Image, related_name='posts')
    locations = models.ManyToManyField(Location, related_name='posts')
    content = models.TextField()
    language = models.CharField(
        max_length=20,
        choices=LANG_CHOICES,
        default="EN",
        blank=True,
    )
