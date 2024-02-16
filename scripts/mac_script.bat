cd ui/
npm run build
cd ..
rm -r backend/static
mkdir backend/static

cp -r ui/build/static/  backend/static/

rm -r backend/templates
mkdir backend/templates

cp ui/build/index.html  backend/templates/
source env/bin/activate 
cd backend
python manage.py runserver 0.0.0.0:9091