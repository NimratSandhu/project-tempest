from rest_framework import serializers
from django.utils import timezone
from .models import Restaurant, Menu, MenuItem, Deal, UserProfile, Claim


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ['id', 'name', 'description', 'price', 'category']


class MenuSerializer(serializers.ModelSerializer):
    items = MenuItemSerializer(many=True, read_only=True)

    class Meta:
        model = Menu
        fields = ['id', 'name', 'description', 'is_active', 'items']


class RestaurantSerializer(serializers.ModelSerializer):
    menus = MenuSerializer(many=True, read_only=True)

    class Meta:
        model = Restaurant
        fields = [
            'id', 'name', 'description', 'latitude', 'longitude',
            'address', 'image_url', 'cuisine_type', 'menus',
        ]


class DealSerializer(serializers.ModelSerializer):
    time_remaining = serializers.SerializerMethodField()
    restaurant_name = serializers.CharField(source='restaurant.name', read_only=True)
    restaurant_image_url = serializers.URLField(source='restaurant.image_url', read_only=True)

    class Meta:
        model = Deal
        fields = [
            'id', 'restaurant', 'restaurant_name', 'restaurant_image_url',
            'title', 'description', 'discount_percentage',
            'original_price', 'deal_price', 'expiration_time',
            'is_active', 'claim_count', 'time_remaining',
        ]

    def get_time_remaining(self, obj):
        delta = obj.expiration_time - timezone.now()
        return int(delta.total_seconds())


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email', 'points', 'claim_count']
