from rest_framework import viewsets

from .models import Restaurant
from .serializers import RestaurantSerializer

class RestaurantViewSet(viewsets.ReadOnlyModelViewSet):

	model = Restaurant
	serializer_class = RestaurantSerializer