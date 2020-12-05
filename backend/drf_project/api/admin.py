# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from .models import Post, Location, Tag, Category

admin.site.register(Post)
admin.site.register(Location)
admin.site.register(Tag)
admin.site.register(Category)
