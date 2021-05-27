# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework import viewsets, permissions, filters
from django.db.models import Q
from . import serializers
from . import models
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt


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
    ordering_fields = ['featured_post_order', '-date']
    ordering = ['featured_post_order', '-date']


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


@csrf_exempt
def set_featured_posts(request, methods=['POST']):
    fp_1_id = request.POST.get("fp_1", "")
    fp_2_id = request.POST.get("fp_2", "")
    fp_3_id = request.POST.get("fp_3", "")
    fp_4_id = request.POST.get("fp_4", "")
    fp_5_id = request.POST.get("fp_5", "")

    if (fp_1_id == "" or fp_2_id == "" or fp_3_id == ""
       or fp_4_id == "" or fp_5_id == ""):
        return HttpResponse("Error, Provide Post Body")

    models.Post.objects.update(featured_post_order=None)
    models.Post.objects.filter(id=fp_1_id).update(featured_post_order=1)
    models.Post.objects.filter(id=fp_2_id).update(featured_post_order=2)
    models.Post.objects.filter(id=fp_3_id).update(featured_post_order=3)
    models.Post.objects.filter(id=fp_4_id).update(featured_post_order=4)
    models.Post.objects.filter(id=fp_5_id).update(featured_post_order=5)

    return HttpResponse("Success, set featured post Ids")
