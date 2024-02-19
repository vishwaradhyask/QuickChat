from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.mixins import CreateModelMixin
from rest_framework.response import Response
from .serializers.auth_user_serializers import Auth_user_serializers, PricesSerilaizer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser, IsAuthenticatedOrReadOnly, DjangoModelPermissions, DjangoModelPermissionsOrAnonReadOnly
from .models import Users, Prices
import uuid
# Create your views here.

class Register(CreateAPIView):
    def post(self, request):
        req_body = request.data
        resp_body = {
            'succes': False,
            "message": "",
        }
        try:
            if len(req_body) > 0:
                req_body['username'] = req_body.get('email', None)
                req_body['id'] = uuid.uuid4()
                ser_res = Auth_user_serializers(data=req_body)
                if ser_res.is_valid():
                    ser_res.save()
                    resp_body['succes'] = True
                    resp_body['message'] = "created"
                    return Response(resp_body, status=200, template_name=None, headers=None, content_type=None)    
                else:
                    resp_body['succes'] = True
                    resp_body['message'] = ser_res.errors
                    return Response(resp_body, status=403, template_name=None, headers=None, content_type=None)    
            else:
                resp_body['message'] = "Body is missing"
                return Response(resp_body, status=403, template_name=None, headers=None, content_type=None)
        except Exception as e:
            if("Duplicate entry" in str(e)):
                resp_body['message'] = f"Email id already present"
                return Response(resp_body, status=403, template_name=None, headers=None, content_type=None)
            resp_body['message'] = f"error: {e}"
            return Response(resp_body, status=501, template_name=None, headers=None, content_type=None)
        
        
class Health_check(APIView):
    def get(self, request):
        resp_body = {
            'succes': True,
            "message": "Alive",
        }
        return Response(resp_body, status=200, template_name=None, headers=None, content_type=None)   
    def post(self, request):
        resp_body = {
            'succes': True,
            "message": "Alive",
        }
        return Response(resp_body, status=200, template_name=None, headers=None, content_type=None)    
    
class PricesView(APIView):
    def get(self, request): 
        return Response(Prices.objects.all().values(), status=200, template_name=None, headers=None, content_type=None)
    def post(self, request):
        try:
            data = request.data
            data['changed_by'] = Users.objects.get(email=request.user).id
            res = PricesSerilaizer(data=data)
            if res.is_valid():
                res.save()
                return Response("success", status=200, template_name=None, headers=None, content_type=None)
            else:
                return Response(res.errors, status=401, template_name=None, headers=None, content_type=None)
        except Exception as e: 
            return Response(f"failed:{e}", status=500, template_name=None, headers=None, content_type=None)
    def delete(self, request):
        try:
            del_id = request.GET.get("id")
            if del_id:
                obj = Prices.objects.get(id=del_id)
                obj.delete()
                return Response("success", status=200, template_name=None, headers=None, content_type=None)
            else:
                return Response("Please share id in the param", status=401, template_name=None, headers=None, content_type=None)
        except Exception as e: 
            return Response(f"failed:{e}", status=500, template_name=None, headers=None, content_type=None)
    def put(self, request):
        try:
            del_id = request.GET.get("id")
            if del_id:
                obj = Prices.objects.get(id=del_id)
                res = PricesSerilaizer(obj, data=request.data, partial=True)
                if res.is_valid():
                    res.save()
                    return Response("pu updated", status=200, template_name=None, headers=None, content_type=None)
                else:
                    return Response(res.errors, status=401, template_name=None, headers=None, content_type=None)
            else:
                return Response("Please share id in the param", status=401, template_name=None, headers=None, content_type=None)
        except Exception as e: 
            return Response(f"failed:{e}", status=500, template_name=None, headers=None, content_type=None)
        

class get_bill(APIView):
    def post(self, request):
        try:
            data = request.data
            km = data.get('km')
            wt = data.get('wt')
            if(len(data) > 0):
                b_data = {
                    "Total_price" : 0
                }
                obj = Prices.objects.filter(default=True).values()[0]
                print(obj)
                obj['distance_base_price'][0]
                dbp_km = obj['distance_base_price'][0]['up_to']
                dbp_price = obj['distance_base_price'][0]['price']
                if(km > dbp_km):
                    km = km-dbp_km
                else:
                    km = 0
                dap_price = km*obj['distance_additional_price']
                tmf = int(obj['multiple_factor_time'][:-1])
                wc_price = (wt/3)*5
                b_data['Total_price'] = round((dbp_price + dap_price + tmf + wc_price))
                return Response(b_data, status=200, template_name=None, headers=None, content_type=None)
            else:
                return Response("Please km and waiting time", status=401, template_name=None, headers=None, content_type=None)
        except Exception as e: 
            return Response(f"failed:{e}", status=500, template_name=None, headers=None, content_type=None)