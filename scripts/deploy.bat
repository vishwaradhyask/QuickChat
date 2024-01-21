cd .\ui\
call npm run build
cd ..
rmdir /s /q .\backend\static\
mkdir .\backend\static\
xcopy  /s .\ui\build\static\  .\backend\static\
rmdir /s /q .\backend\templates\
mkdir .\backend\templates\
xcopy .\ui\build\index.html  .\backend\templates\
cd backend
call python .\manage.py runserver 0.0.0.0:9091