from rest_framework import serializers
from .models import Post, Location, Tag, Category, Image


class LocationSerializer(serializers.ModelSerializer):
    latitude = serializers.CharField(max_length=50)
    longitude = serializers.CharField(max_length=50)

    class Meta:
        model = Location
        fields = ['latitude', 'longitude']


class TagSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=30)

    class Meta:
        model = Tag
        fields = ['name']


class CategorySerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=30)

    class Meta:
        model = Category
        fields = ['name']


class ImageSerializer(serializers.ModelSerializer):
    img_file = serializers.ImageField(required=False)
    img_name = serializers.CharField(max_length=50, required=False)

    class Meta:
        model = Image
        fields = ['img_file', 'img_name']

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
    locations = LocationSerializer(required=False, many=True)

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

        images = validated_data['images']
        for image_data in images:
            image, created = Image.objects.get_or_create(**image_data)
            instance.images.add(image)

        tags = validated_data['tags']
        for tag_data in tags:
            tag, created = Tag.objects.get_or_create(**tag_data)
            instance.tags.add(tag)

        if 'locations' in validated_data:
            locations = validated_data['locations']
            for location_data in locations:
                location, created = Location.objects.get_or_create(
                    **location_data)
                instance.locations.add(location)

        return instance
