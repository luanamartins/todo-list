from django.db.models import Q
from rest_framework import generics
from task.models import Task
from task.serializers import TaskSerializer
from django.shortcuts import render


# Create your views here.


class TaskList(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class SearchTask(generics.ListAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        q = self.kwargs['q']
        return Person.objects.filter(Q(description__iexact=q))
        # | Q(email__iexact=q))
