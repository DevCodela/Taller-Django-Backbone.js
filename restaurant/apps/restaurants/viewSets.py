from rest_framework import viewsets

from .models import Restaurant
from .serializers import RestaurantSerializer

class RestaurantViewSet(viewsets.ModelViewSet):

	model = Restaurant
	serializer_class = RestaurantSerializer
	paginate_by = 5