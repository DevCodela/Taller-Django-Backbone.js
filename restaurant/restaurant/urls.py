from django.conf.urls import patterns, include, url
from django.conf import settings

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'restaurant.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^', include('apps.restaurants.urls')),

    url('', include('social.apps.django_app.urls', namespace='social')),

    url(r'^media/(?P<path>.*)$','django.views.static.serve',
            {'document_root':settings.MEDIA_ROOT,}
        ),

    url(r'^admin/', include(admin.site.urls)),
)
