from django.db import models
import uuid

from django.db.models.fields import CharField, DateField

# Create your models here.

class Experience(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date1 = CharField(max_length=20)
    date2 = CharField(max_length=20)
    date3 = CharField(max_length=20)