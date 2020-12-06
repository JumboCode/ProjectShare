# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework import viewsets
from .serializers import TagSerializer
from .models import Tag


class TagView(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()


class TestView(APIView):
    def get(self, request):
        return JsonResponse({'testResponse': 'success'})
