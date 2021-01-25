from rest_framework import serializers
from .models import Post, Location, Tag, Category, Image


class LocationSerializer(serializers.ModelSerializer):
    latitude = serializers.DecimalField(max_digits=8, decimal_places=5, required=False)
    longitude = serializers.DecimalField(max_digits=8, decimal_places=5, required=False)
    name = serializers.CharField(max_length=80, required=False)

    class Meta:
        model = Location
        fields = ['id', 'latitude', 'longitude', 'name']


class TagSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=30)

    class Meta:
        model = Tag
        fields = ['id', 'name']


class CategorySerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=30)

    class Meta:
        model = Category
        fields = ['id', 'name']


class ImageSerializer(serializers.ModelSerializer):
    img_file = serializers.ImageField(required=False)
    img_name = serializers.CharField(max_length=50, required=False)

    class Meta:
        model = Image
        fields = ['id', 'img_file', 'img_name']

    def create(self, validated_data):
        if 'img_name' in validated_data:
            instance = Image.objects.create(**validated_data)
        else:
            instance = Image.objects.create(
                img_file=validated_data['img_file'],
                img_name="")
            instance.img_name = instance.img_file.name
            instance.save()
        return instance


class PostSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=5000)
    date = serializers.DateTimeField()
    category = CategorySerializer()
    tags = TagSerializer(many=True)
    content = serializers.CharField()
    images = ImageSerializer(many=True)
    language = serializers.CharField(max_length=20, required=False)
    locations = LocationSerializer(many=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'date', 'category', 'tags',
                  'content', 'images', 'language', 'locations']

    def create(self, validated_data):
        category, _ = Category.objects.get_or_create(
            **validated_data['category']
        )
        data = {
            'title': validated_data['title'],
            'date': validated_data['date'],
            'content': validated_data['content'],
            'category': category,
        }
        if 'language' in validated_data:
            data['language'] = validated_data['language']
        instance = Post.objects.create(**data)

        for image_data in validated_data['images']:
            image, created = Image.objects.get_or_create(**image_data)
            instance.images.add(image)

        for tag_data in validated_data['tags']:
            tag, created = Tag.objects.get_or_create(**tag_data)
            instance.tags.add(tag)

        for location_data in validated_data['locations']:
            location, created = Location.objects.get_or_create(
                **location_data)
            instance.locations.add(location)

        return instance

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.date = validated_data.get('date', instance.date)
        instance.content = validated_data.get('content', instance.content)
        instance.category = validated_data.get('category', instance.category)
        instance.language = validated_data.get('language', instance.language)
        if 'images' in validated_data:
            for image_data in validated_data['images']:
                image, created = Image.objects.update_or_create(**image_data)
                instance.images.add(image)
        if 'tags' in validated_data:
            for tag_data in validated_data['tags']:
                tag, created = Tag.objects.update_or_create(**tag_data)
                instance.tags.add(tag)
        if 'locations' in validated_data:
            for location_data in validated_data['locations']:
                location, created = Location.objects.update_or_create(
                    **location_data)
                instance.locations.add(location)
        instance.save()
        return instance
