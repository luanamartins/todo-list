from django.db import models

# Create your models here.

class Poll(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    due_date = models.DateTimeField(blank=True, null=True)

    def __unicode__(self):
        return "%s" % self.title
