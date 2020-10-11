# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.


class Posts(models.Model):
    title = models.CharField(max_length=5000)
    date = models.DateTimeField(auto_now_add = True)

    # which category is better 
    # category = models.ManyToManyField(Category)
    category = models.ForeignKey(Category) 
    #tag = models.ManyToManyField(Tag)
    tag = models.ForeignKey(Tag)
    content = models.TextField()
    img = models.ImageField(upload_to = user_directory_path) 
    language = models.CharField(max_length=20)
    location = models.ForeignKey(Location)


