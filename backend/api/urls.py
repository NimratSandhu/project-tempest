from django.urls import path
from . import views

urlpatterns = [
    path('restaurants/', views.RestaurantListView.as_view(), name='restaurant-list'),
    path('restaurants/<int:pk>/', views.RestaurantDetailView.as_view(), name='restaurant-detail'),
    path('deals/', views.DealListView.as_view(), name='deal-list'),
    path('claims/', views.create_claim, name='create-claim'),
    path('users/me/', views.current_user, name='current-user'),
]
