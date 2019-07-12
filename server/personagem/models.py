from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.conf import settings


# Create your models here.

class Personagem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             related_name='personagens',
                             on_delete=models.CASCADE)
    nome = models.CharField(max_length=200, blank=True, default='')
    vida = models.FloatField(default=0, null=False, validators=[MinValueValidator(0), MaxValueValidator(100)])
    CLASSES_DE_RPG = [
        ('MG', 'mago'),
        ('GU', 'guerreiro'),
        ('TK', 'tank'),
        ('BA', 'barbaro'),
    ]

    classe = models.CharField(
        max_length=2,
        choices=CLASSES_DE_RPG,
        default='MG',
    )


class Comida(models.Model):
    nome = models.CharField(max_length=200, blank=True, default='')
    nutrientes = models.IntegerField(default=1, null=False, validators=[MinValueValidator(1), MaxValueValidator(5)])
    saudavel = models.BooleanField(null=False, default=True)


