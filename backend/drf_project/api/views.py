# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework import viewsets, permissions, filters
from django.db.models import Q
from . import serializers
from . import models


class TagViewSet(viewsets.ModelViewSet):
    lookup_url_kwarg = 'tag_id'
    queryset = models.Tag.objects.all()
    serializer_class = serializers.TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class CategoryViewSet(viewsets.ModelViewSet):
    lookup_url_kwarg = 'category_id'
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ImageViewSet(viewsets.ModelViewSet):
    lookup_url_kwarg = 'image_id'
    queryset = models.Image.objects.all()
    serializer_class = serializers.ImageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PostViewSet(viewsets.ModelViewSet):
    lookup_url_kwarg = 'post_id'
    serializer_class = serializers.PostSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['-featured_post_order', '-date']
    ordering = ['-featured_post_order', '-date']


    def get_queryset(self):
        """
        Optionally restricts the returned posts by filtering
        against a `post_id`, `category_id` or `tag_id` query
        parameter in the URL, or by using the `keyword` query
        parameter to return posts that contain that keyword
        in the title, the category, any of its tags, or the
        body text.
        """
        queryset = models.Post.objects.all()
        post_id = self.request.query_params.get('post_id', None)
        tag_id = self.request.query_params.get('tag_id', None)
        category_id = self.request.query_params.get('category_id', None)
        keyword = self.request.query_params.get('keyword', None)
        if post_id is not None:
            queryset = queryset.filter(id=post_id)
        if tag_id is not None:
            queryset = queryset.filter(tags__id=tag_id)
        if category_id is not None:
            queryset = queryset.filter(category_id=category_id)
        if keyword is not None:
            q_object = (Q(title__icontains=keyword)
                | Q(category__name__icontains=keyword)
                | Q(content__icontains=keyword)
                | Q(tags__name__icontains=keyword))
            queryset = queryset.filter(q_object)
        return queryset

    serializer_class = serializers.PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class LocationViewSet(viewsets.ModelViewSet):
    lookup_url_kwarg = 'location_id'
    queryset = models.Location.objects.all()
    serializer_class = serializers.LocationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


#def set_featured_posts(request, methods=['POST']):
    
