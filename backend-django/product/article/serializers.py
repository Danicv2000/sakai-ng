
from pyexpat import model
from .models import Disciplina,Profesor,Departamento,Plan_Estudio,Events,Contacts,Relacion,Relacion1,Relacion2,Asignatura,Relacion3, Relacion31
from django.contrib.auth import get_user_model,authenticate
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework.serializers import SerializerMethodField 

class UserSerializers(serializers.ModelSerializer):
      class Meta:
          model=get_user_model()
          fields= ('email', 'username', 'password')
          extra_kwargs= {'password':{'write_only':True,'min_length':8}}

    
    

class AuthokenSerializer(serializers.Serializer):
    email=serializers.CharField()
    password=serializers.CharField(
        style={'input_type':'password'},
        trim_whitespace=False
    )
    def validate(self, attrs):
         email=attrs.get('email')
         password=attrs.get('password')

         user=authenticate(
             request=self.context.get('request'),
             email=email,
             password=password
         )
         if not user:
             raise serializers.ValidationError("Invalid User Credentials")
         attrs['user']= user
         return attrs




class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model= Events
        fields=('id','name','estado','start','end')     



class ProfesorSerializer(serializers.ModelSerializer):
    evento = EventSerializer(many=True, read_only=True)
    class Meta:
        model = Profesor
        fields = ('id','name', 'email','categoria_doc','telefono','movil', 'categorias_cientificas','titulo','responsabilidad','tipo_relacion','evento')  
class AsignaturaSerializers(serializers.ModelSerializer): 
    class Meta:
        model = Asignatura
        fields = ('id','nombre','horas_conferencias','horas_cp','horas_cpc','horas_lab','horas_taller','horas_seminarios')    
class Plan_EstudioSerializer(serializers.ModelSerializer):
  profesores = ProfesorSerializer(many=True, read_only=True)
  class Meta: 
      model = Plan_Estudio
      fields = '__all__'

class DisciplinaSerializer(serializers.ModelSerializer):
  
   profesores = ProfesorSerializer(many=True, read_only=True)
   class Meta:
         model = Disciplina
         fields = ('id','nombre','profesores')

class DisciplinaSerializers(serializers.ModelSerializer):
   count = SerializerMethodField()
   def get_count(self,obj):
       return obj.count
   class Meta:
        model = Disciplina
        fields = ('nombre','count')

class DisciplinaSerialize(serializers.ModelSerializer):
   counting = SerializerMethodField()
   def get_counting(self,obj):
       return obj.counting
   class Meta:
        model = Disciplina
        fields = ('nombre','counting')

       
class DepartamentoSerializer(serializers.ModelSerializer):
   class Meta:
        model = Departamento
        fields = ('id','nombre')

class RelacionSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Relacion
        fields = ('id', 'profesor', 'disciplina')
        
class Relacion1Serializer(serializers.ModelSerializer): 
    class Meta:
        model = Relacion1
        fields = ('id', 'profesor', 'tarea')
        

class Relacion2Serializer(serializers.ModelSerializer): 
   
    class Meta:
        model = Relacion2
        fields = ('id', 'profesor', 'plan')

class Relacion3Serializer(serializers.ModelSerializer): 
    

    class Meta:
        model = Relacion3
        fields = ('id', 'asignatura', 'plan')  
class Relacion31Serializer(serializers.ModelSerializer): 
    
    class Meta:
        model = Relacion31
        fields = ('id', 'asignatura', 'plan')  


class ContactsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contacts
        fields=('id','mail','subject','message')        

     