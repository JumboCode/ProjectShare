from django.urls import path
from django.conf.urls import url
from . import views


def generate_urls(viewset, obj_name, obj_name_pl):
    # generate CRUD urls given a viewset and a base strings for the url
    return [
        path(
            '%s/add' % (obj_name_pl),
            viewset.as_view({'post': 'create'}),
            name='add %s' % (obj_name)
        ),
        path(
            '%s' % (obj_name_pl),
            viewset.as_view({'get': 'list'}),
            name='view %s' % (obj_name_pl)
        ),
        path(
            '%s/<int:%s_id>/update' % (obj_name_pl, obj_name),
            viewset.as_view({'patch': 'partial_update'}),
            name='update %s' % (obj_name)
        ),
        path(
            '%s/<int:%s_id>/delete' % (obj_name_pl, obj_name),
            viewset.as_view({'delete': 'destroy'}),
            name='delete %s' % (obj_name))
    ]


tag_urls = generate_urls(views.TagViewSet, 'tag', 'tags')
category_urls = generate_urls(views.CategoryViewSet, 'category', 'categories')
post_urls = generate_urls(views.PostViewSet, 'post', 'posts')
location_urls = generate_urls(views.LocationViewSet, 'location', 'locations')

image_urls = [
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

contact_url = [path('contact', views.contact, name='contact')]

urlpatterns = (tag_urls + category_urls + image_urls + post_urls
               + location_urls + contact_url)
