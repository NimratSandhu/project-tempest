from django.contrib import admin
from .models import Restaurant, Menu, MenuItem, Deal, UserProfile, Claim


@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ('name', 'cuisine_type', 'address')
    search_fields = ('name', 'cuisine_type')


@admin.register(Deal)
class DealAdmin(admin.ModelAdmin):
    list_display = ('title', 'restaurant', 'deal_price', 'expiration_time', 'is_active', 'claim_count')
    list_filter = ('is_active',)


@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    list_display = ('name', 'restaurant', 'is_active')


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'menu', 'price', 'category')


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'points', 'claim_count')


@admin.register(Claim)
class ClaimAdmin(admin.ModelAdmin):
    list_display = ('user', 'deal', 'claimed_at')
