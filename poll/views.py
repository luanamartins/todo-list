from django.db.models import Q
from rest_framework import generics
from poll.models import Poll
from poll.serializers import PollSerializer
from django.shortcuts import render

class PollList(generics.ListCreateAPIView):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer


class PollDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer


class SearchPoll(generics.ListAPIView):
    serializer_class = PollSerializer

    def get_queryset(self):
        q = self.kwargs['q']
        return Poll.objects.filter(Q(title__iexact=q))
            # | Q(email__iexact=q))
