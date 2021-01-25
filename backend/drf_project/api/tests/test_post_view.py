# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from django.urls import reverse
from ... import models
from django.conf import settings
from django.core.files.uploadedfile import SimpleUploadedFile
import os
from time import time


class PostViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(
            username="tester", password="test", email="test@example.com")
        self.client.force_authenticate(user=self.user)

    @classmethod
    def setUpTestData(self):
        path = os.path.join(settings.MEDIA_ROOT, 'test_image.png')
        self.test_image = SimpleUploadedFile(
            name='test_image.png',
            content=open(path, 'rb').read(),
            content_type='image/png')

    def test_get_posts(self):
        res = self.client.get(reverse('view posts'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_add_post_with_predefined_category_and_tags(self):
        # add current time to guarantee uniqueness
        category = models.Category.objects.create(name='cat_1' + str(time()))
        tag1 = models.Tag.objects.create(name='tag_1' + str(time()))
        tag2 = models.Tag.objects.create(name='tag_2' + str(time()))
        old_tag_count = models.Tag.objects.count()
        old_cat_count = models.Category.objects.count()
        old_post_count = models.Post.objects.count()

        post_data = {
            "title": "Test Post",
            "date": "2021-01-06T02:50:24.052412Z",
            "category": {"id": category.id, "name": category.name},
            "tags": [
                {"id": tag1.id, "name": tag1.name},
                {"id": tag2.id, "name": tag2.name}],
            "content": "<p>Test Content</p>",
            "images": [],
            "locations": []
        }
        res = self.client.post(reverse('add post'), post_data, format="json")
        new_tag_count = models.Tag.objects.count()
        new_cat_count = models.Category.objects.count()
        new_post_count = models.Post.objects.count()
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(new_tag_count, old_tag_count)
        self.assertEqual(new_cat_count, old_cat_count)
        self.assertEqual(new_post_count, old_post_count + 1)

    def test_add_post_with_new_category_and_tags(self):
        old_tag_count = models.Tag.objects.count()
        old_cat_count = models.Category.objects.count()
        post_data = {
            "title": "Test Post",
            "date": "2021-01-06T02:50:24.052412Z",
            "category": {"name": 'cat_1' + str(time())},
            "tags": [
                {"name": 'tag_1' + str(time())},
                {"name": 'tag_2' + str(time())}],
            "content": "<p>Test Content</p>",
            "images": [],
            "locations": []
        }
        res = self.client.post(reverse('add post'), post_data, format="json")
        new_tag_count = models.Tag.objects.count()
        new_cat_count = models.Category.objects.count()
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(new_tag_count, old_tag_count + 2)
        self.assertEqual(new_cat_count, old_cat_count + 1)

    def test_add_post_with_predefined_images(self):
        image = models.Image.objects.create(
            img_name="test_image", img_file=self.test_image
        )
        old_image_count = models.Image.objects.count()
        post_data = {
            "title": "Test Post",
            "date": "2021-01-06T02:50:24.052412Z",
            "category": {"name": 'cat_1' + str(time())},
            "tags": [],
            "content": "<p>Test Content</p>",
            "images": [{"img_name": image.img_name, "id": image.id}],
            "locations": []
        }
        res = self.client.post(reverse('add post'), post_data, format="json")
        new_image_count = models.Image.objects.count()
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(new_image_count, old_image_count)

    def test_add_post_with_predefined_locations(self):
        loc1 = models.Location.objects.create(
            latitude=50,
            longitude=50,
            name="test_loc_1" + str(time())  # satisfy uniqueness condition
        )
        loc2 = models.Location.objects.create(
            latitude=60,
            longitude=50,
            name="test_loc_2" + str(time())
        )
        old_loc_count = models.Location.objects.count()
        post_data = {
            "title": "Test Post",
            "date": "2021-01-06T02:50:24.052412Z",
            "category": {"name": "cat_1" + str(time())},
            "tags": [],
            "content": "<p>Test Content</p>",
            "images": [],
            "locations": [
                {
                    "latitude": loc1.latitude,
                    "longitude": loc1.longitude,
                    "name": loc1.name},
                {
                    "latitude": loc2.latitude,
                    "longitude": loc2.longitude,
                    "name": loc2.name}
            ],
            "language": "SP"
        }
        res = self.client.post(reverse('add post'), post_data, format="json")
        new_loc_count = models.Location.objects.count()
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(new_loc_count, old_loc_count)
