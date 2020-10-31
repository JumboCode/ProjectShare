from rest_framework import serializers
from api.models import Posts, Location, Subtag, Tag, Category

class LocationSerializer(serializers.Serializer):
    latitude = serializers.CharField(max_length=50)
    longitude = serializers.CharField(max_length=50)

    def create(self, validated_data):
        return Location.object.create(**validated_data)

    def update(self, instance, validated_data):
        instance.latitude = validated_data.get('latitude', instance.latitude)
        instance.longitude = validated_data.get('longitude', instance.longitude)
        instance.save()
        return instance

class SubtagSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=30)
    keywords = serializers.TextField()

    def create(self, validated_data):
        return Subtag.object.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.keywords = validated_data.get('keywords', instance.keywords)
        instance.save()
        return instance

class TagSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=30)
    subtag = SubtagSerializer()

    def create(self, validated_data):
        return Tag.object.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.subtag = validated_data.get('subtag', instance.subtag)
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

class PostsSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=5000)
    date = serializers.DateTimeField()
    category = CategorySerializer()
    tag = TagSerializer()
    content = serializers.TextField()
    img = serializers.ImageField()
    language = serializers.CharField(max_length=20)
    location = LocationSerializer()

    def create(self, validated_data):
        return Posts.object.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.date = validated_data.get('date', instance.date)
        instance.category = validated_data.get('category', instance.category)
        instance.tag = validated_data.get('tag', instance.tag)
        instance.content = validated_data.get('content', instance.content)
        instance.img = validated_data.get('img', instance.img)
        instance.language = validated_data.get('language', instance.language)
        instance.location = validated_data.get('location', instance.location)
        instance.save()
        return instance