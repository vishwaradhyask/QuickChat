from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.mixins import CreateModelMixin
from rest_framework.response import Response
from .serializers.auth_user_serializers import Auth_user_serializers
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser, IsAuthenticatedOrReadOnly, DjangoModelPermissions, DjangoModelPermissionsOrAnonReadOnly
from .models import Users
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
            print('dat: ', request.data)
            if len(req_body) > 0:
                req_body['username'] = req_body.get('email', None)
                req_body['id'] = uuid.uuid4()
                print("req_body", req_body)
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
    
class UsersView(APIView):
    serializer_class = Users
    permission_classes = [IsAuthenticated]

    def get(self, request):
        param = request.GET.get('param', None)
        req_user = request.user
        print('param came is: ', param, req_user)
        resp_body = {
            'succes': True,
            "message": "Alive",
        }
        if(param and param == 'current'):
            resp_body['body'] = Users.objects.filter(email=req_user).values()[0]
        else:
            resp_body['body'] = Users.objects.all().values()
        return Response(resp_body, status=200, template_name=None, headers=None, content_type=None)