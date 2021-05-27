# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from .models import Post, Location, Tag, Category, Image, Pdf, Region

admin.site.register(Post)
admin.site.register(Location)
admin.site.register(Tag)
admin.site.register(Category)
admin.site.register(Image)
admin.site.register(Pdf)
admin.site.register(Region)
