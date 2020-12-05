# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework import viewsets


class TestView(APIView):
    def get(self, request):
        return JsonResponse({'testResponse': 'success'})
