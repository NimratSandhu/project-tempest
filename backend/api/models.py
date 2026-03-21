from django.db import models
from django.contrib.auth.models import User


class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    address = models.CharField(max_length=500)
    image_url = models.URLField(blank=True)
    cuisine_type = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Menu(models.Model):
    restaurant = models.ForeignKey(
        Restaurant, on_delete=models.CASCADE, related_name='menus'
    )
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.restaurant.name} — {self.name}"


class MenuItem(models.Model):
    menu = models.ForeignKey(
        Menu, on_delete=models.CASCADE, related_name='items'
    )
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    category = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Deal(models.Model):
    restaurant = models.ForeignKey(
        Restaurant, on_delete=models.CASCADE, related_name='deals'
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    original_price = models.DecimalField(max_digits=8, decimal_places=2)
    deal_price = models.DecimalField(max_digits=8, decimal_places=2)
    expiration_time = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    claim_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.title} @ {self.restaurant.name}"


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='profile'
    )
    points = models.PositiveIntegerField(default=0)
    claim_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Profile: {self.user.username}"


class Claim(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='claims'
    )
    deal = models.ForeignKey(
        Deal, on_delete=models.CASCADE, related_name='claims'
    )
    claimed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'deal')

    def __str__(self):
        return f"{self.user.username} claimed {self.deal.title}"
