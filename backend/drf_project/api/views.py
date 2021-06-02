
from __future__ import unicode_literals
from rest_framework import viewsets, permissions, filters
from django.db.models import Q, F
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
from django.core.files import File
import codecs
import csv
from datetime import datetime
import pytz
import json
import os
from django.http import HttpResponse, HttpResponseBadRequest
from string import capwords


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
    serializer_class = serializers.PostSerializer
    filter_backends = [filters.OrderingFilter]

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

        sort_by = self.request.query_params.get('sort_by', 'Newest')
        if sort_by == 'Newest':
            queryset = queryset.order_by('-date')
        elif sort_by == 'Oldest':
            queryset = queryset.order_by('date')
        else:
            queryset = queryset.order_by(
                F('featured_post_order').asc(nulls_last=True),
                '-date')

        post_id = self.request.query_params.get('post_id', None)
        region_id = self.request.query_params.get('region_id', None)
        tag_ids = self.request.query_params.getlist('tag_id', None)
        category_id = self.request.query_params.get('category_id', None)
        keyword = self.request.query_params.get('keyword', None)
        featured = self.request.query_params.get('featured', None)
        if post_id is not None:
            queryset = queryset.filter(id=post_id)
        if region_id is not None:
            queryset = queryset.filter(region_id=region_id)
        if len(tag_ids) != 0:
            queryset = queryset.filter(tags__id__in=tag_ids)
        if category_id is not None:
            queryset = queryset.filter(category_id=category_id)
        if keyword is not None:
            q_object = (Q(title__icontains=keyword)
                        | Q(category__name__icontains=keyword)
                        | Q(content__icontains=keyword)
                        | Q(tags__name__icontains=keyword))
            queryset = queryset.filter(q_object).distinct()
        if featured is not None:
            queryset = queryset.filter(featured_post_order__isnull=False)
        return queryset.distinct()

    serializer_class = serializers.PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class LocationViewSet(viewsets.ModelViewSet):
    lookup_url_kwarg = 'location_id'
    queryset = models.Location.objects.all()
    serializer_class = serializers.LocationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class RegionViewSet(viewsets.ModelViewSet):
    lookup_url_kwarg = 'region_id'
    queryset = models.Region.objects.all()
    serializer_class = serializers.RegionSerializer
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
def set_featured_posts(request, methods=['POST']):
    data = json.loads(request.body.decode("utf-8"))
    fp_1_id = data.get('fp_1', "")
    fp_2_id = data.get('fp_2', "")
    fp_3_id = data.get('fp_3', "")
    fp_4_id = data.get('fp_4', "")
    fp_5_id = data.get('fp_5', "")

    if (fp_1_id == "" or fp_2_id == "" or fp_3_id == ""
       or fp_4_id == "" or fp_5_id == ""):
        return HttpResponseBadRequest("Error, Provide Post Body")

    models.Post.objects.update(featured_post_order=None)
    models.Post.objects.filter(id=fp_1_id).update(featured_post_order=1)
    models.Post.objects.filter(id=fp_2_id).update(featured_post_order=2)
    models.Post.objects.filter(id=fp_3_id).update(featured_post_order=3)
    models.Post.objects.filter(id=fp_4_id).update(featured_post_order=4)
    models.Post.objects.filter(id=fp_5_id).update(featured_post_order=5)

    return HttpResponse("Success, set featured post Ids")


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
        if line_count > 2 and row['title'] != "":
            try:
                pdf_file = None
                if row['pdf'] != "":
                    file = File(
                        open(os.path.join(settings.MEDIA_ROOT, row['pdf']), "rb"),
                        name=row['pdf'])
                    pdf_file = models.Pdf.objects.create(pdf_file=file)

                image_names = row['images'].split(';')
                image_list = []
                for name in image_names:
                    if name != "":
                        img_file = File(
                            open(os.path.join(settings.MEDIA_ROOT, name), "rb"),
                            name=name)
                        img_obj = models.Image.objects.create(img_file=img_file)
                        image_list.append(models.Image.objects.get(id=img_obj.id))

                tag_list = [models.Tag.objects.get_or_create(name=capwords(tag.strip()))[0]
                            for tag in row['tags'].split(';') if len(tag.strip()) > 0]
                category = models.Category.objects.get_or_create(
                    name=row['category'].title())[0]
                region = models.Region.objects.get_or_create(
                    name=row['region'].title())[0]
                date = datetime.strptime(row['date'], '%m/%d/%y %H:%M')
                timezone = pytz.timezone("US/Eastern")
                date = timezone.localize(date)
                post, updated = models.Post.objects.update_or_create(
                    title=row['title'],
                    region=region,
                    date=date,
                    category=category,
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
