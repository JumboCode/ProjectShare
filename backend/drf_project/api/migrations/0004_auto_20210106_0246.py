# Generated by Django 3.1.2 on 2021-01-06 02:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20201126_2149'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='language',
            field=models.CharField(choices=[('EN', 'English'), ('SP', 'Spanish')], default='EN', max_length=20),
        ),
        migrations.AlterField(
            model_name='post',
            name='location',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='api.location'),
        ),
        migrations.AlterField(
            model_name='post',
            name='tag',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='api.tag'),
        ),
        migrations.AlterField(
            model_name='tag',
            name='keywords',
            field=models.TextField(blank=True),
        ),
    ]
