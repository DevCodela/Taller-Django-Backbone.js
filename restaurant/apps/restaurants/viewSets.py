from rest_framework import viewsets
from rest_framework.decorators import link, detail_route
from rest_framework.response import Response

from .models import Restaurant, Category, City, Payment, Establishment, Tip
from .serializers import RestaurantSerializer, CategorySerializer, CitySerializer, PaymentSerializer, TipSerializer

class RestaurantViewSet(viewsets.ReadOnlyModelViewSet): #para poder hacer post

	model = Restaurant
	serializer_class = RestaurantSerializer

	@detail_route(methods=['get', 'post'])
	@link()
	def tips(self, request, pk=None):
		tips = Tip.objects.filter(restaurant__pk = pk)
		serializer = TipSerializer(tips, many=True)
		return Response(serializer.data)


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