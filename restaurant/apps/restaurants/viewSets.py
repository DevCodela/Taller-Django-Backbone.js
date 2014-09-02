from django.http import Http404

from rest_framework import viewsets
from rest_framework.response import Response

from .models import Restaurant
from .serializers import RestaurantSerializer

class RestaurantViewSet(viewsets.ModelViewSet):

	model = Restaurant
	# serializer_class = RestaurantSerializer

	def list(self, request):
		try:
			page = int(request.GET['page'])*5
			restaurants = Restaurant.objects.all()[page-5:page]
		except:
			raise Http404
		serializer = RestaurantSerializer(restaurants, many=True)
		return Response(serializer.data)