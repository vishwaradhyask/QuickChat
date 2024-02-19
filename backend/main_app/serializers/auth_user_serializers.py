from rest_framework import serializers
# from django.contrib.auth.models import User
from ..models import Users, Prices
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

class PricesSerilaizer(serializers.ModelSerializer):
    distance_base_price = serializers.JSONField()
    distance_additional_price = serializers.FloatField()
    waiting_price = serializers.FloatField()

    def create(self, validated_data):
        """
        Create and return a new `Prices` instance, given the validated data.
        """
        return Prices.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        """
        Update and return an existing `Prices` instance, given the validated data.
        """
        instance.distance_base_price = validated_data.get('istance_base_price', instance.distance_base_price)
        instance.distance_additional_price = validated_data.get('distance_additional_price', instance.distance_additional_price)
        instance.waiting_price = validated_data.get('waiting_price', instance.waiting_price)
        instance.save()
        return instance
    class Meta:
        model = Prices
        fields = '__all__'
    