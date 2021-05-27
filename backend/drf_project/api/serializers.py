from rest_framework import serializers
from .models import Post, Location, Tag, Category, Image, Pdf, Region


class LocationSerializer(serializers.ModelSerializer):
    latitude = serializers.DecimalField(
        max_digits=8,
        decimal_places=5,
        required=False)
    longitude = serializers.DecimalField(
        max_digits=8,
        decimal_places=5,
        required=False)
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


class RegionSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=30)

    class Meta:
        model = Region
        fields = ['id', 'name']


class ImageSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    img_file = serializers.ImageField(required=False)

    class Meta:
        model = Image
        fields = ['id', 'img_file']

    def create(self, validated_data):
        instance = Image.objects.create(**validated_data)
        return instance


class PdfSerializer(serializers.ModelSerializer):
    pdf_file = serializers.FileField(required=False)
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Pdf
        fields = ['id', 'pdf_file']

    def create(self, validated_data):
        instance = Pdf.objects.create(**validated_data)
        instance.save()
        return instance


class PostSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=5000)
    date = serializers.DateTimeField()
    category = CategorySerializer()
    tags = TagSerializer(many=True)
    pdf = PdfSerializer()
    content = serializers.CharField()
    region = RegionSerializer()
    images = ImageSerializer(many=True)
    language = serializers.CharField(max_length=20, required=False)
    locations = LocationSerializer(many=True)
    featured_post_order = serializers.IntegerField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'date', 'category', 'tags', 'region',
                  'content', 'images', 'language', 'locations', 'pdf',
                  'featured_post_order']

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
        if 'region' in validated_data:
            region, _ = Region.objects.get_or_create(
                **validated_data['region']
            )
            data['region'] = region
        if 'language' in validated_data:
            data['language'] = validated_data['language']
        if 'pdf' in validated_data:
            data['pdf'] = validated_data['pdf']
        instance = Post.objects.create(**data)

        for image_data in validated_data['images']:
            image = Image.objects.get(**image_data)
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
        instance.pdf = validated_data.get('pdf', instance.pdf)
        if 'region' in validated_data:
            region, _ = Region.objects.get_or_create(
                **validated_data['region']
            )
            instance.region = region
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
