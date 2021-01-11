from django.urls import path
from . import views

urlpatterns = [
    path('test', views.TestView.as_view(), name='test'),
    path('tags', views.TagView.as_view({'get': 'list'}), name='tags'),
    path(
        'categories/',
        views.CategoryViewSet.as_view({'get': 'list'}),
        name='category'
    ),
    path(
        'posts/',
        views.PostViewSet.as_view({'get': 'list'}),
        name='view post'
    ),
    path(
        'posts/<int:post_id>/update',
        views.PostViewSet.as_view({'patch': 'partial_update'}),
        name='update post'
    ),
    path(
        'posts/<int:post_id>/delete',
        views.PostViewSet.as_view({'delete': 'destroy'}),
        name='delete post'
    ),
    path(
        'posts/add',
        views.PostViewSet.as_view({'post': 'create'}),
        name='add post'
    ),
    path(
        'images/<int:image_id>/delete',
        views.ImageViewSet.as_view({'delete': 'destroy'}),
        name='delete image'
    ),
    path(
        'images/add',
        views.ImageViewSet.as_view({'post': 'create'}),
        name='add image'
    ),
]
