from django.conf.urls import patterns, include, url

from rest_framework import routers

from .viewSets import RestaurantViewSet
from .views import IndexView

router = routers.DefaultRouter()
router.register(r'restaurants', RestaurantViewSet)

urlpatterns = patterns('',
    url(r'^$', IndexView.as_view()),
    url(r'^api/', include(router.urls)),
)
