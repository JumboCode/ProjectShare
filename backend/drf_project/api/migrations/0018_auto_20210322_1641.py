# Generated by Django 3.1.6 on 2021-03-22 16:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_auto_20210126_1659'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='img_name',
            field=models.CharField(blank=True, max_length=50, null=True, unique=True),
        ),
    ]
