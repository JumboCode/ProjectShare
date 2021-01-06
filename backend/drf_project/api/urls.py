from django.urls import path
from . import views

urlpatterns = [
    path('test', views.TestView.as_view(), name='test'),
    path('tags', views.TagView.as_view({'get': 'list'}), name='tags'),
    path('categories/', 
         views.CategoryViewSet.as_view({'get': 'list'}),
         name='category'),
    path('posts/',
         views.PostViewSet.as_view({'get': 'list'}),
         name='post'),
]
