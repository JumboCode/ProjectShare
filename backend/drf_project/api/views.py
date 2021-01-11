# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework import viewsets, permissions
from .serializers import TagSerializer, CategorySerializer, \
    PostSerializer, ImageSerializer
from .models import Tag, Category, Post, Image
from rest_framework.response import Response


class TagViewSet(viewsets.ModelViewSet):
    lookup_url_kwarg = 'tag_id'
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # only return the contents of the name field
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        return Response(queryset.values_list('name', flat=True))


class CategoryViewSet(viewsets.ModelViewSet):
    lookup_url_kwarg = 'category_id'
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # only return the contents of the name field
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        return Response(queryset.values_list('name', flat=True))


class ImageViewSet(viewsets.ModelViewSet):
    lookup_url_kwarg = 'image_id'
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PostViewSet(viewsets.ModelViewSet):
    lookup_url_kwarg = 'post_id'
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
