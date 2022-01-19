from django.db import models
import uuid

from django.db.models.fields import CharField, DateField

# Create your models here.

class Experience(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date1 = CharField(max_length=20)
    date2 = CharField(max_length=20)
    date3 = CharField(max_length=20)
    @classmethod
    def create(cls, dates):
        exp = cls(
            date1 = dates[0],
            date2 = dates[1],
            date3 = dates[2],
        )
        exp.save()
        return exp 

    def toList(self):
        return [self.date1, self.date2, self.date3]