from django.shortcuts import render
from rest_framework import viewsets, generics, permissions
from rest_framework.views import APIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from personagem.models import Personagem, Comida
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


# Create your views here.
from personagem.serializers import PersonagemSerializer, ComidaSerializer


class PersonagemViewSet(generics.ListCreateAPIView):
    queryset = Personagem.objects.all()
    serializer_class = PersonagemSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (JSONWebTokenAuthentication,)


class ComidaViewSet(generics.ListCreateAPIView):
    queryset = Comida.objects.all()
    serializer_class = ComidaSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (JSONWebTokenAuthentication,)


class Alimentar(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)


    def get(self, request, personagemId, comidaId):
        personagem = Personagem.objects.get(id=personagemId)
        comida = Comida.objects.get(id=comidaId)
        if comida.saudavel:
            if personagem.vida + comida.nutrientes <= 100:
                personagem.vida = personagem.vida + comida.nutrientes
            else:
                personagem.vida = 100
        else:
            if personagem.vida - comida.nutrientes >= 0:
                personagem.vida = personagem.vida - comida.nutrientes
            else:
                personagem.vida = 0
        personagem.save()
        return Response(status=200)


class TrocarDeClasse(APIView):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, personagemId):
        classes = ['MG', 'GU', 'TK', 'BA']
        classe = request.data['classe']
        personagem = Personagem.objects.get(id=personagemId)
        if classe in classes:
            personagem.classe = classe
            personagem.save()
            return Response(status=200)
        else:
            return Response(400)
