from django.db import models
from django.contrib.auth.models import AbstractBaseUser
import uuid
from django.contrib.auth.models import UserManager
# Create your models here.

class Users(AbstractBaseUser):
    id = models.UUIDField(primary_key = True, default=uuid.uuid4, editable=False)
    username = None
    email  = models.EmailField(max_length=254, unique=True)
    first_name = models.CharField(max_length = 250)
    last_name = models.CharField(max_length = 250)
    last_login = models.DateTimeField(auto_now_add=True)
    username = models.CharField(max_length = 250)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    is_superuser = models.IntegerField()
    
    objects = UserManager()
    USERNAME_FIELD = 'email'
    
    class Meta:
        db_table: "users"

class Prices(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    distance_base_price = models.JSONField()
    distance_additional_price = models.FloatField()
    updatedOn = models.DateTimeField(auto_now=True)
    waiting_price = models.FloatField()
    multiple_factor_time=models.TextField()
    default = models.BooleanField()
    changed_by = models.ForeignKey(
        'Users',
        on_delete = models.CASCADE,
        related_name='creator'
    )

    class Meta:
        db_table = 'Prices'
        managed = True
        verbose_name = 'ModelName'
        verbose_name_plural = 'ModelNames'