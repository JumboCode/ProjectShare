# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework import viewsets, permissions
from django.db.models import Q
from . import serializers
from . import models
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from django.core.mail import BadHeaderError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError
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
            queryset = queryset.filter(q_object).distinct()
        return queryset

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
        body = {
            'email': data['email'],
            'message': data['message'],
        }
        message = Mail(
            from_email=os.environ['CONTACT_EMAIL'],
            to_emails=os.environ['CONTACT_EMAIL'],
            subject='Project Share Website Inquiry',
            html_content="\n".join(body.values()))

        try:
            sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
            sg.send(message)
        except BadHeaderError:
            return JsonResponse({'status': 'fail',
                                 'message': 'Invalid header found.'})
        return JsonResponse({'status': 'success',
                             'message': 'Email sent!'})


@csrf_exempt
def bulk_add_tags(request, methods='POST'):
    tags_string = request.POST.get("tags", "")
    if len(tags_string) != 0:
        tags = tags_string.split(",")
        tag_objects = [models.Tag(name=tag.strip()) for tag in tags]
        try:
            models.Tag.objects.bulk_create(tag_objects, ignore_conflicts=True)
        except IntegrityError as err:
            return JsonResponse({'status': 'fail',
                                 'message': str(err)})
        return JsonResponse({'status': 'success',
                            'message': 'Added tags to database.'})
    return JsonResponse({'status': 'fail',
                         'message': 'Please send a list of tags.'})
