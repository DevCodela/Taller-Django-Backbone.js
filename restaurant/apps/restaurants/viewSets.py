from rest_framework import viewsets
from rest_framework.decorators import link
from rest_framework.response import Response

from .models import Restaurant, Category, City, Payment, Establishment
from .serializers import RestaurantSerializer, CategorySerializer, CitySerializer, PaymentSerializer

class RestaurantViewSet(viewsets.ReadOnlyModelViewSet):

	model = Restaurant
	serializer_class = RestaurantSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):

	model = Category
	serializer_class = CategorySerializer

	@link()
	def restaurants(self, request, pk=None):
		establishments = Establishment.objects.filter(restaurant__category__pk = pk).distinct('restaurant__name')
		restaurants = [establishment.restaurant  for establishment in establishments]		
		serializer = RestaurantSerializer(restaurants, many=True)
		return Response(serializer.data)

class CityViewSet(viewsets.ReadOnlyModelViewSet):

	model = City
	serializer_class = CitySerializer

	@link()
	def restaurants(self, request, pk=None):
		establishments = Establishment.objects.filter(city__pk = pk).distinct('restaurant__name')
		restaurants = [establishment.restaurant  for establishment in establishments]		
		serializer = RestaurantSerializer(restaurants, many=True)
		return Response(serializer.data)

class PaymentViewSet(viewsets.ReadOnlyModelViewSet):

	model = Payment
	serializer_class = PaymentSerializer

	@link()
	def restaurants(self, request, pk=None):
		establishments = Establishment.objects.filter(restaurant__payment__pk = pk).distinct('restaurant__name')
		restaurants = [establishment.restaurant  for establishment in establishments]		
		serializer = RestaurantSerializer(restaurants, many=True)
		return Response(serializer.data)