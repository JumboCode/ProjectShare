# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Subtag(models.Model):
    name = models.CharField(max_length = 30)
    keywords = models.TextField()

class Tag(models.Model):
    name = models.CharField(max_length = 30)
    subtag = models.ForeignKey(Subtag, on_delete = models.CASCADE)

class Category(models.Model):
    name = models.CharField(max_length = 30)