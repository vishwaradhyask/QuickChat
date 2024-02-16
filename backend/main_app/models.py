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

class chatTable(models.Model):
    id  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sender = models.ForeignKey(
        'Users',
        on_delete = models.CASCADE,
        related_name='creator'
    )
    reciever = models.ForeignKey(
        'Users',
        on_delete = models.CASCADE,
        related_name='assignee'
    )
    datetime = models.DateTimeField(auto_now=True)
    content = models.TextField()

class Connections(models.Model):
    id = models.UUIDField(primary_key = True, default=uuid.uuid4, editable=False)
    started_by = models.ForeignKey(
        'Users',
        on_delete = models.CASCADE,
        related_name='starter'
    )
    other_end_user = models.ForeignKey(
        'Users',
        on_delete = models.CASCADE,
        related_name='accepter'
    )
    datetime = models.DateTimeField(auto_now=True)