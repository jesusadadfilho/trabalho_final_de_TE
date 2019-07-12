from rest_framework import serializers

from personagem.models import Personagem, Comida

class PersonagemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Personagem
        fields = ('id', 'nome', 'vida', 'classe')

class ComidaSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Comida
        fields = ('id', 'nome', 'nutrientes', 'saudavel')