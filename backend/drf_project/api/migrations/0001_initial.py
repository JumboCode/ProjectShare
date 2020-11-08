# Generated by Django 3.1.2 on 2020-11-01 21:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latitude', models.CharField(max_length=50)),
                ('longitude', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Subtag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('keywords', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('subtag', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.subtag')),
            ],
        ),
        migrations.CreateModel(
            name='Posts',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=5000)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('content', models.TextField()),
                ('language', models.CharField(max_length=20)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.category')),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.location')),
                ('tag', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.tag')),
            ],
        ),
    ]