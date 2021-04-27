# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from django.urls import reverse
from .. import models, serializers
import json


class TagViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(
            username="tester", password="test", email="test@example.com")
        self.client.force_authenticate(user=self.user)

    @classmethod
    def setUpTestData(self):
        self.test_tag = models.Tag.objects.create(
            name='test_tag'
        )

    def test_get_tag(self):
        res = self.client.get(reverse('view tags'))
        serializer = serializers.TagSerializer(self.test_tag)
        # response is a list of tags containing only the test_tag
        res_data = res.data[0]

        self.assertEqual(len(res.data), 1)
        self.assertEqual(res_data['id'], serializer.data['id'])
        self.assertEqual(res_data['name'], serializer.data['name'])
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_valid_delete_tag(self):
        res = self.client.delete(
            reverse('delete tag', kwargs={'tag_id': self.test_tag.id})
        )
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

    def test_invalid_delete_tag(self):
        res = self.client.delete(
            reverse('delete tag', kwargs={'tag_id': 100})
        )
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_patch_tag(self):
        new_tag = models.Tag(name='update_tag')
        serializer = serializers.TagSerializer(new_tag)
        res = self.client.patch(
            reverse('update tag', kwargs={'tag_id': self.test_tag.id}),
            data=json.dumps(serializer.data),
            content_type='application/json')

        self.assertEqual(res.status_code, status.HTTP_200_OK)

        # compare to the original tag
        updated_tag = self.client.get(reverse('view tags')).data[0]
        self.assertNotEqual(updated_tag['id'], serializer.data['id'])
        self.assertEqual(updated_tag['name'], serializer.data['name'])

    def test_add_tag(self):
        new_tag = models.Tag(id=self.test_tag.id+1, name='new_tag')
        serializer = serializers.TagSerializer(new_tag)
        res = self.client.post(
            reverse('add tag'),
            serializer.data,
        )

        # check if the new tag is added successfully
        new_tag = self.client.get(reverse('view tags')).data[1]
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(new_tag['id'], serializer.data['id'])
        self.assertEqual(new_tag['name'], serializer.data['name'])