# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import csv, io
import pandas as pd 
from django.shortcuts import render
from django.contrib import messages 

from drf_project.models import Posts, Location, Subtag, Category


# Create your views here.

def csv_upload(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            handle_uploaded_file(request.FILES['file'])
            return HttpResponseRedirect('/success/url/')
    else:
        form = UploadFileForm()
        
prompt = {
        'order': 'Order of the CSV should be title,date,category,tags,content,language,location,img',
        'profiles': data    
        }

    if request.method == "GET":
        return render(request, template, prompt)
        csv_file = request.FILES['file']
    
    if not csv_file.name.endswith('.csv'):
        messages.error(request, 'THIS IS NOT A CSV FILE')
        data_set = csv_file.read().decode('UTF-8')


io_string = io.StringIO(data_set)
next(io_string)
for column in csv.reader(io_string, delimiter=',', quotechar="|"):
    _, postsCreated = Posts.objects.update_or_create(
        title=column[0],
        date=column[1],
        category=column[2],
        tag=column[3],
        content=column[4], 
        language=column[5], 
        location=column[6], 
        img=column[7]
    ) 
    _, locationCreated = Location.object.update_or_create(
        latitude=column[0],
        longitude=column[1],
    )
    _, subtagCreated = Subtag.object.update_or_create(
        name=column[0],
        keywords=column[1],
    )
    _, tagCreated = Subtag.object.update_or_create(
        name=column[0],
        subtag=column[1],
    )
    _, categoryCreated = Category.object.update_or_create(
        name=column[0],
        context=column[1],

return render(request, template, context)

