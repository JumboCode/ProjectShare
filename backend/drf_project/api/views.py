# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework import viewsets, permissions
from .models import Category
from .serializers import CategorySerializer


class TestView(APIView):
    def get(self, request):
        return JsonResponse({'testResponse': 'success'})

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
