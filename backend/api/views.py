from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.utils import timezone
from django.contrib.auth.models import User
from datetime import timedelta

from .models import Restaurant, Deal, UserProfile, Claim
from .serializers import (
    RestaurantSerializer, DealSerializer, UserProfileSerializer,
)


class RestaurantListView(generics.ListAPIView):
    serializer_class = RestaurantSerializer

    def get_queryset(self):
        return Restaurant.objects.prefetch_related('menus__items').all()


class RestaurantDetailView(generics.RetrieveAPIView):
    queryset = Restaurant.objects.prefetch_related('menus__items').all()
    serializer_class = RestaurantSerializer


class DealListView(generics.ListAPIView):
    serializer_class = DealSerializer

    def get_queryset(self):
        qs = Deal.objects.filter(is_active=True).select_related('restaurant')
        if self.request.query_params.get('expiring_soon') == 'true':
            cutoff = timezone.now() + timedelta(hours=24)
            qs = qs.filter(expiration_time__lte=cutoff)
        return qs.order_by('expiration_time')


@api_view(['POST'])
def create_claim(request):
    deal_id = request.data.get('deal')
    if not deal_id:
        return Response({'error': 'deal is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        deal = Deal.objects.get(id=deal_id, is_active=True)
    except Deal.DoesNotExist:
        return Response({'error': 'Deal not found or inactive'}, status=status.HTTP_404_NOT_FOUND)

    dev_user, _ = User.objects.get_or_create(username='dev_user')
    profile, _ = UserProfile.objects.get_or_create(user=dev_user)

    claim, created = Claim.objects.get_or_create(user=dev_user, deal=deal)
    if not created:
        return Response({'error': 'Already claimed'}, status=status.HTTP_409_CONFLICT)

    deal.claim_count += 1
    deal.save(update_fields=['claim_count'])
    profile.points += 10
    profile.claim_count += 1
    profile.save(update_fields=['points', 'claim_count'])

    return Response({
        'message': 'Claimed!',
        'points_earned': 10,
        'total_points': profile.points,
    }, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def current_user(request):
    dev_user, _ = User.objects.get_or_create(username='dev_user')
    profile, _ = UserProfile.objects.get_or_create(user=dev_user)
    serializer = UserProfileSerializer(profile)
    return Response(serializer.data)
