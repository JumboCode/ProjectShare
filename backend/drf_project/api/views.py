# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import csv, io
from django.shortcuts import render
from django.contrib import messages 



# Create your views here.

def csv_upload(request):
    template = 'csv_upload.html'
    data = Posts.objects.all()

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
    _, created = Posts.objects.update_or_create(
        title=column[0],
        date=column[1],
        category=column[2],
        tag=column[3],
        content=column[4], 
        language=column[5], 
        location=column[6], 
        img=column[7]
    )
context = {}
return render(request, template, context)

