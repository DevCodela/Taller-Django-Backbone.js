from django.contrib.auth.models import User #ahora para importar el usuario

from rest_framework import serializers

from .models import Restaurant, Category, City, Payment, Tip

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

class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = ('username',)


class TipSerializer(serializers.ModelSerializer): #para obtener el user y contenido
#para el ususario tenemos que crear un serializador, 
	user = UserSerializer()

	class Meta:
		model = Tip
		fields = ('user','content')

class CitySerializer(serializers.ModelSerializer):

	class Meta:
		model = City

class PaymentSerializer(serializers.ModelSerializer):

	class Meta:
		model = Payment


