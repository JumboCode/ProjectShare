from rest_framework import serializers
from .models import Post, Location, Tag, Category, Image


class LocationSerializer(serializers.Serializer):
    latitude = serializers.CharField(max_length=50)
    longitude = serializers.CharField(max_length=50)

    def create(self, validated_data):
        return Location.object.create(**validated_data)

    def update(self, instance, validated_data):
        instance.latitude = validated_data.get('latitude', instance.latitude)
        instance.longitude = validated_data.get('longitude',
                                                instance.longitude)
        instance.save()
        return instance


class TagSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=30)

    def create(self, validated_data):
        return Tag.object.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


class CategorySerializer(serializers.Serializer):
    name = serializers.CharField(max_length=30)

    def create(self, validated_data):
        return Category.object.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


class ImageSerializer(serializers.Serializer):
    img_file = serializers.ImageField(required=False)
    img_name = serializers.CharField(max_length=50, required=False)

    def create(self, validated_data):
        print('aaaaaaaa')
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
    tags = TagSerializer(read_only=True, many=True)
    content = serializers.CharField()
    images = ImageSerializer(many=True)
    language = serializers.CharField(max_length=20)
    location = LocationSerializer()

    class Meta:
        model = Post
        fields = ['id', 'title', 'date', 'category', 'tags',
                  'content', 'images', 'language', 'location']

    def create(self, validated_data):
        print(validated_data['category'])
        category, _ = Category.objects.get_or_create(
            **validated_data['category'])
        location, _ = Location.objects.get_or_create(
            **validated_data['location'])
        data = {**validated_data, 'category': category, 'location': location}
        del data['images']
        instance = Post.objects.create(**data)

        images = validated_data['images']
        for image_data in images:
            print(image_data)
            image, created = Image.objects.get_or_create(**image_data)
            print(image, created)
            instance.images.add(image)
        return instance
