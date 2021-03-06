# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('poll', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('description', models.TextField()),
                ('status', models.TextField()),
                ('due_date', models.DateTimeField(blank=True, null=True)),
                ('poll_key', models.ForeignKey(to='poll.Poll')),
            ],
        ),
    ]
