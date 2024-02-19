from django.contrib import admin
from django.urls import path, include
from .views import Register, Health_check, PricesView, get_bill

urlpatterns = [
    path('register/', Register.as_view(), name="register"),
    path('health_check/', Health_check.as_view(), name="Health_check"),
    path('prices/', PricesView.as_view(), name="PricesView"),
    path('bill/', get_bill.as_view(), name="get_bill")
]