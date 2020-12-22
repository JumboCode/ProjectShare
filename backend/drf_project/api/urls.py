from django.urls import path
from . import views

urlpatterns = [
    path('test', views.TestView.as_view(), name='test'),
    path('tags', views.TagView.as_view({'get': 'list'}), name='tags'),
]
