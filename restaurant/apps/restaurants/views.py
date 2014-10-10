from django.shortcuts import render
from django.views.generic import TemplateView

from .models import Category, Payment, City, Restaurant

class IndexView(TemplateView):

	template_name = 'index.html'

	def get_context_data(self, **kwargs):
		context = super(IndexView, self).get_context_data(**kwargs)
		context['categories'] = Category.objects.all()
		context['payments'] = Payment.objects.all()
		context['cities'] = City.objects.all()
		restaurants = Restaurant.objects.all()[:5]
		tips = [ restaurant.tip_set.all().count() for restaurant in restaurants]
		context['restaurants'] = zip(restaurants, tips)
		return context

class DetalleView(TemplateView):

	template_name = "detalle.html"