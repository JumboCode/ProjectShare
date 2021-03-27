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

class CategoryViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient
        self.user = User.objects.create(
            username="tester", password="test", email="test@example.com")
        self.client.force_authenticate(user=self.user)

    @classmethod
    def setUpTestData(self):
        self.test_category = models.Category.objects.create(
            name = 'test_category'
        )
        '''
        obj = models.Category.objects.create(
            name = 'test_category'
        )
        '''
    def test_get_category(self):
        res = self.client.get(reverse('view categories'))
        self.assertEqual(self.test_category.name, 'test_category')
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_delete_category(self):
        obj = models.Category.objects.create(
            name = 'test_category'
        )
        
        res = self.client.delete(
            reverse('delete category', kwargs={'category_id': obj.id}))

    def test_patch_category(self):
        obj = models.Category.objects.create(
            name = 'test_category'
        )

        res = self.client.get(reverse('view categories'))

        new_data = {
            'name':"update_category"
        }
        self.client.post(reverse('add category'),
                               new_data, format="multipart")
        self.assertEqual(res.test_category.name, 'test_category')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        #rename the category and see its renamed 

    def test_post_category(self):
        category_data = {
            'name':"test_category"
        }

        res = self.client.post(reverse('add category'),
                               category_data, format="multipart")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        