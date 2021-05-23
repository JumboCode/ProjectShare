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
from django.conf import settings
from collections import defaultdict
import codecs
import csv
import datetime
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


class PdfViewSet(viewsets.ModelViewSet):
    lookup_url_kwarg = 'pdf_id'
    queryset = models.Pdf.objects.all()
    serializer_class = serializers.PdfSerializer
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
        tag_objects = [models.Tag(name=tag.strip().title()) for tag in tags]
        try:
            models.Tag.objects.bulk_create(tag_objects, ignore_conflicts=True)
        except IntegrityError as err:
            return JsonResponse({'status': 'fail',
                                 'message': str(err)})
        return JsonResponse({'status': 'success',
                            'message': 'Added tags to database.'})
    return JsonResponse({'status': 'fail',
                         'message': 'Please send a list of tags.'})


@csrf_exempt
def bulk_add_categories(request, methods='POST'):
    categories_string = request.POST.get("categories", "")
    if len(categories_string) != 0:
        categories = categories_string.split(",")
        cat_objects = [models.Category(
            name=cat.strip().title()) for cat in categories]
        try:
            models.Category.objects.bulk_create(
                cat_objects,
                ignore_conflicts=True
            )
        except IntegrityError as err:
            return JsonResponse({'status': 'fail',
                                 'message': str(err)})
        return JsonResponse({'status': 'success',
                             'message': 'Added categories to database.'})
    return JsonResponse({'status': 'fail',
                         'message': 'Please send a list of categories.'})


@csrf_exempt
def upload_csv(request, methods='POST'):
    locations = defaultdict(lambda: [])
    loc_file = request.FILES['locations']
    csv_reader = csv.DictReader(codecs.iterdecode(loc_file, 'utf-8'),
                                ['desc', 'lat', 'long', 'post_id'])

    line_count = 0
    for row in csv_reader:
        if line_count > 2:
            loc = models.Location.objects.create(
                latitude=row['lat'],
                longitude=row['long'],
                name=row['desc'])
            locations[row['post_id']].append(loc)
        line_count += 1

    csv_file = request.FILES['csv']
    csv_reader = csv.DictReader(codecs.iterdecode(csv_file, 'utf-8'),
                                ['id', 'title', 'content', 'language',
                                 'images', 'tags', 'category', 'date',
                                 'has_map', 'pdf', 'region'])

    line_count = 0
    for row in csv_reader:
        if line_count > 2:
            try:
                pdf_file = None
                if row['pdf'] != "":
                    pdf_file = open(os.path.join(settings.MEDIA_ROOT, row['pdf']))
                image_names = row['images'].split(';')
                image_list = []
                for name in image_names:
                    if name != "":
                        image_list.append(open(os.path.join(settings.MEDIA_ROOT, name)))

                tag_list = [models.Tag.objects.get_or_create(name=tag)[0] for tag in row['tags'].split(';')]
                cat, created = models.Category.objects.get_or_create(name=row['category'])
                post, updated = models.Post.objects.update_or_create(
                    title=row['title'],
                    date=datetime.datetime.strptime(row['date'], '%m/%d/%y %H:%M'),
                    category=cat,
                    pdf=pdf_file,
                    content=row['content'],
                    language=row['language'])
                post.tags.set(tag_list)
                post.images.set(image_list)
                post.locations.set(locations[row['id']])
            except IntegrityError as err:
                return JsonResponse({'status': 'fail', 'message': str(err)})
        line_count += 1

    return JsonResponse({'status': 'sucess',
                         'message': 'CSV uploaded and processed.'})
