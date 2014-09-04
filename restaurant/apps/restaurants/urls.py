from django.conf.urls import patterns, include, url

from rest_framework import routers
from .views import IndexView
from .viewSets import RestaurantViewSet

router = routers.DefaultRouter()
router.register(r'restaurants', RestaurantViewSet)

urlpatterns = patterns('',
    url(r'^$', IndexView.as_view()),

    url(r'^api/', include(router.urls)),
)
