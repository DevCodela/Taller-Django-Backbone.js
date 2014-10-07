from django.conf.urls import patterns, include, url

from rest_framework import routers
from .views import IndexView, DetalleView
from .viewSets import RestaurantViewSet, CategoryViewSet, PaymentViewSet, CityViewSet

router = routers.DefaultRouter()
router.register(r'restaurants', RestaurantViewSet)
router.register(r'categorias', CategoryViewSet)
router.register(r'payments', PaymentViewSet)
router.register(r'ciudades', CityViewSet)

urlpatterns = patterns('',
    url(r'^$', IndexView.as_view()),
    url(r'^detalle/$', DetalleView.as_view()),
    url(r'^api/', include(router.urls)),
)
