from django.urls import path

from .views import CategoryViewSet

urlpatterns = [
    path('categories/', CategoryViewSet.as_view({'get': 'list'}),
         name='category'),
]
