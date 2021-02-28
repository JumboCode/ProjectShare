# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework import viewsets, permissions, views
from rest_framework.decorators import api_view
from . import serializers
from . import models
from django.core.mail import send_mail, BadHeaderError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os


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
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class LocationViewSet(viewsets.ModelViewSet):
    lookup_url_kwarg = 'location_id'
    queryset = models.Location.objects.all()
    serializer_class = serializers.LocationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# temporarily disable csrf token
@csrf_exempt
def contact(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode("utf-8"))
        subject = "Project Share Website Inquiry"
        body = {
            'email': data['email'],
            'message': data['message'],
        }
        message = "\n".join(body.values())

        try:
            send_mail(subject, message, os.environ['CONTACT_EMAIL'],
                      [os.environ['CONTACT_EMAIL']])
        except BadHeaderError:
            return JsonResponse({'status': 'fail',
                                 'message': 'Invalid header found.'})
        return JsonResponse({'status': 'success',
                             'message': 'Email sent!'})
