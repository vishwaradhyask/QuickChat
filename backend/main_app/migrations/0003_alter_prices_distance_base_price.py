# Generated by Django 4.2.9 on 2024-02-19 08:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0002_prices_default'),
    ]

    operations = [
        migrations.AlterField(
            model_name='prices',
            name='distance_base_price',
            field=models.JSONField(),
        ),
    ]
