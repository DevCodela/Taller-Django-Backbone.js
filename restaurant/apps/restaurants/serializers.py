from rest_framework import serializers

from .models import Restaurant, Category, City, Payment

class RestaurantSerializer(serializers.ModelSerializer):

	tips = serializers.SerializerMethodField('get_tips')

	def get_tips(self, restaurant):
		tips = restaurant.tip_set.all().count()
		return tips

	class Meta:
		model = Restaurant
		exclude = ('payment', 'category')


class CategorySerializer(serializers.ModelSerializer):

	class Meta:
		model = Category

class CitySerializer(serializers.ModelSerializer):

	class Meta:
		model = City

class PaymentSerializer(serializers.ModelSerializer):

	class Meta:
		model = Payment


