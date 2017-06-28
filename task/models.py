from django.db import models

# Create your models here.

class Task(models.Model):
    description = models.TextField()
    status = models.TextField()
    due_date = models.DateTimeField(null=True, blank=True)
    poll_key = models.ForeignKey('poll.Poll')

    def __unicode__(self):
        return "%s" % self.description
