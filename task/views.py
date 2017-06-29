from django.db.models import Q
from rest_framework import generics
from task.models import Task
from task.serializers import TaskSerializer
from django.shortcuts import render

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
        print("Valor de q = " + q)
        return Task.objects.filter(Q(poll_key__iexact=q))
        # | Q(email__iexact=q))
