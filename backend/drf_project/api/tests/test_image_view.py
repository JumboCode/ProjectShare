# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from django.urls import reverse
from .. import models
from django.conf import settings
from django.core.files.uploadedfile import SimpleUploadedFile
import os


class ImageViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(
            username="tester", password="test", email="test@example.com")
        self.client.force_authenticate(user=self.user)

    @classmethod
    def setUpTestData(self):
        path = os.path.join(settings.MEDIA_ROOT, 'test.png')
        self.test_image = SimpleUploadedFile(
            name='test.png',
            content=open(path, 'rb').read(),
            content_type='image/png')

    def test_delete_image(self):
        obj = models.Image.objects.create(
            img_name="test_image_1",
            img_file=self.test_image)
        old_count = models.Image.objects.count()
        res = self.client.delete(
            reverse('delete image', kwargs={'image_id': obj.id}))
        new_count = models.Image.objects.count()
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(new_count + 1, old_count)

    def test_add_image(self):
        image_data = {
            'img_name': "test_image",
            'img_file': self.test_image
        }
        res = self.client.post(reverse('add image'),
                               image_data, format="multipart")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
