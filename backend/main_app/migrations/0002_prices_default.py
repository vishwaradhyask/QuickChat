# Generated by Django 4.2.9 on 2024-02-19 07:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='prices',
            name='default',
            field=models.BooleanField(default=None),
            preserve_default=False,
        ),
    ]