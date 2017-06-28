from task import views
from django.conf.urls import patterns, url


urlpatterns = patterns('',
                       url(r'^$', views.TaskList.as_view(), name='task_list'),
                       url(r'^(?P<pk>[0-9]+)/$', views.TaskDetail.as_view(), name='task_detail'),
                       url(r'^(?P<q>.+)/$', views.SearchTask.as_view(), name='search-task'),
                       )
