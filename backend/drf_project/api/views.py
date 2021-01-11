# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework import viewsets, permissions
from . import serializers
from . import models
from rest_framework.response import Response


class TagViewSet(viewsets.ModelViewSet):
    lookup_url_kwarg = 'tag_id'
    queryset = models.Tag.objects.all()
    serializer_class = serializers.TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # only return the contents of the name field
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        return Response(queryset.values_list('name', flat=True))


class CategoryViewSet(viewsets.ModelViewSet):
    lookup_url_kwarg = 'category_id'
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # only return the contents of the name field
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        return Response(queryset.values_list('name', flat=True))


class ImageViewSet(viewsets.ModelViewSet):
    lookup_url_kwarg = 'image_id'
    queryset = models.Image.objects.all()
    serializer_class = serializers.ImageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PostViewSet(viewsets.ModelViewSet):
    lookup_url_kwarg = 'post_id'
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class LocationViewSet(viewsets.ModelViewSet):
    lookup_url_kwarg = 'location_id'
    queryset = models.Location.objects.all()
    serializer_class = serializers.LocationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
