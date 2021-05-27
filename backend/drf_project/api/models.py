# -*- coding: utf-8 -*-
from __future__ import all_feature_names, unicode_literals
from django.db import models
from rest_framework import serializers


class Location(models.Model):
    latitude = models.DecimalField(max_digits=20, decimal_places=10)
    longitude = models.DecimalField(max_digits=20, decimal_places=10)
    name = models.CharField(max_length=80, blank=True)


class Tag(models.Model):
    name = models.CharField(max_length=30, unique=True)


class Category(models.Model):
    name = models.CharField(max_length=30, unique=True)


class Image(models.Model):
    img_file = models.ImageField()


class Pdf(models.Model):
    pdf_file = models.FileField()


class Post(models.Model):
    LANG_CHOICES = [
            ('EN', 'English'),
            ('SP', 'Spanish'),
    ]

    title = models.CharField(max_length=5000)
    date = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    pdf = models.ForeignKey(Pdf, on_delete=models.CASCADE, blank=True, null=True)
    tags = models.ManyToManyField(Tag, related_name='posts')
    images = models.ManyToManyField(Image, related_name='posts', blank=True)
    locations = models.ManyToManyField(Location, related_name='posts', blank=True)
    content = models.TextField()
    featured_post_order = models.IntegerField(blank=True, null=True)
    region = models.CharField(max_length=64, blank=True, null=True)
    language = models.CharField(
        max_length=20,
        choices=LANG_CHOICES,
        default="EN",
        blank=True,
    )
