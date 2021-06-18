from django.urls import path
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
region_urls = generate_urls(views.RegionViewSet, 'region', 'regions')
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
pdf_urls = [
    path(
        'pdfs/<int:pdf_id>/delete',
        views.PdfViewSet.as_view({'delete': 'destroy'}),
        name='delete pdf'
    ),
    path(
        'pdfs/add',
        views.PdfViewSet.as_view({'post': 'create'}),
        name='add pdf'
    ),
]

csv_url = [path('upload_csv', views.upload_csv, name='upload_csv')]

add_tags_url = [path('add_tags_bulk', views.bulk_add_tags)]
add_cats_url = [path('add_categories_bulk', views.bulk_add_categories)]

featured_posts_urls = [
    path(
        'posts/set_featured_posts',
        views.set_featured_posts
        ),
]

urlpatterns = (tag_urls + category_urls + image_urls + post_urls
               + location_urls + contact_url + add_tags_url
               + add_cats_url + pdf_urls + featured_posts_urls
               + region_urls + csv_url)
