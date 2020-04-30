from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField('名称', max_length=50)
    price = models.FloatField('价格', max_length=200)
    detail = models.CharField('详细信息', max_length=200)

    def __str__(self):
        return self.name