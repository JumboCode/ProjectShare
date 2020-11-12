# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView

# Create your views here.

class Test(APIView):
    def get(self, request):
        return JsonResponse({'testResponse': 'success'})

