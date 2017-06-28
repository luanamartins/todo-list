from django.db import models

# Create your models here.

class Task(models.Model):
    description = models.TextField()
    poll_key = models.ForeignKey('poll.Poll')

    def __unicode__(self):
        return "%s" % self.description
