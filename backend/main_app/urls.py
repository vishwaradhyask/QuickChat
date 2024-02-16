from django.contrib import admin
from django.urls import path, include
from .views import Register, Health_check, UsersView

urlpatterns = [
    path('register/', Register.as_view(), name="register"),
    path('health_check/', Health_check.as_view(), name="Health_check"),
    path('users/', UsersView.as_view(), name="UsersView")
]