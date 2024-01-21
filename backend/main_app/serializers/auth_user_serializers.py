from rest_framework import serializers
# from django.contrib.auth.models import User
from ..models import Users
from django.contrib.auth.hashers import make_password

class Auth_user_serializers(serializers.Serializer):
    id = serializers.UUIDField(format='hex')
    password = serializers.CharField(max_length=100)
    username = serializers.CharField(max_length=100)
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    email = serializers.CharField(max_length=100)
    is_superuser = serializers.IntegerField()
    is_staff = serializers.IntegerField()
    is_active = serializers.IntegerField()
    
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return Users.objects.create(**validated_data)
    
    class Meta:
        model = Users
    