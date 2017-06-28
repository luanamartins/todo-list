from poll import views
from django.conf.urls import patterns, url


urlpatterns = patterns('',
                       url(r'^$', views.PollList.as_view(), name='poll_list'),
                       url(r'^(?P<pk>[0-9]+)/$', views.PollDetail.as_view(), name='poll_detail'),
                       url(r'^(?P<q>.+)/$', views.SearchPoll.as_view(), name='search-poll'),
                       )
