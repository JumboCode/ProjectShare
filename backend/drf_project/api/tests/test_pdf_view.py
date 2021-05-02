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


class PdfViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(
            username="tester", password="test", email="test@example.com")
        self.client.force_authenticate(user=self.user)

    @classmethod
    def setUpTestData(self):
        path = os.path.join(settings.MEDIA_ROOT, 'test.pdf')
        self.test_pdf = SimpleUploadedFile(
            name='test.pdf',
            content=open(path, 'rb').read(),
            content_type='application/pdf')

    def test_delete_pdf(self):
        obj = models.Pdf.objects.create(pdf_file=self.test_pdf)
        old_count = models.Pdf.objects.count()
        res = self.client.delete(
            reverse('delete pdf', kwargs={'pdf_id': obj.id}))
        new_count = models.Pdf.objects.count()
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(new_count + 1, old_count)

    def test_add_pdf(self):
        pdf_data = {'pdf_file': self.test_pdf}
        res = self.client.post(reverse('add pdf'), pdf_data,
                               format="multipart")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
