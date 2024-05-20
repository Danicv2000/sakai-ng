from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return HttpResponse("Sistema de Gestión")

import pymongo

client = pymongo.MongoClient('mongodb://localhost:27017/?retryWrites=true&loadBalanced=false&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&3t.uriVersion=3&3t.connection.name=data&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true')
#Define DB Name
dbname = client['admin']

#Define Collection
collection = dbname['mascot']

mascot_1={
    "name": "Conexión válida",
    "type" : "Villa"
}

collection.insert_one(mascot_1)

mascot_details = collection.find({})

for r in mascot_details:
    print(r['name'])


from django.core.mail import EmailMultiAlternatives
from django.conf import settings

from user.models import User
from .serializers import Relacion31Serializer, UserSerializers,AuthokenSerializer
from rest_framework import generics
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


from rest_framework import viewsets
from django.core.mail import send_mail,EmailMessage
from django.db.models import Count
from asyncio import exceptions
import email
import smtplib
from django.shortcuts import render
from html5lib import serializer
from requests import request
from .serializers import RelacionSerializer,DepartamentoSerializer,Relacion3Serializer,Relacion1Serializer,Relacion2Serializer,ProfesorSerializer,Plan_EstudioSerializer,EventSerializer,DisciplinaSerializer,DisciplinaSerializers,AsignaturaSerializers
from rest_framework.authtoken.models import Token
from .models import Plan_Estudio,Relacion31, Relacion,Relacion1,Departamento,Relacion3,Relacion2,Profesor,Events,Disciplina,Asignatura
from rest_framework.generics import ListAPIView, CreateAPIView,  RetrieveAPIView, UpdateAPIView , DestroyAPIView,RetrieveUpdateDestroyAPIView
from django.contrib.auth import authenticate, login, logout
from rest_framework import status,generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Case, When,Count




class CreateUserView(generics.CreateAPIView):
    serializer_class=UserSerializers

class LoginView(ObtainAuthToken):
     serializer_class= AuthokenSerializer

     def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username,
            'user_id': user.id,
            'email': user.email,
            'password': user.password
        })

class LogoutView(APIView):
    def post(self, request):
        # Borramos de la request la información de sesión
        logout(request)

        return Response(status=status.HTTP_200_OK)

class ProfileView(ListAPIView):
    serializer_class = UserSerializers
    permission_classes = ()
    queryset =  User.objects.all()

class ProfileListView(ListAPIView):

    serializer_class = ProfesorSerializer
    permission_classes = ()
    queryset = Profesor.objects.all()

class ReView(ListAPIView):

    serializer_class = Relacion31Serializer
    permission_classes = ()
    queryset = Relacion31.objects.all()

class ReCreate(CreateAPIView):

    serializer_class = Relacion31Serializer
    permission_classes = ()

class RetrieveView(RetrieveAPIView):
    serializer_class = Relacion31Serializer
    permission_classes = ()
    queryset = Relacion31.objects.all()
    lookup_field = 'id'

class RelacionUpdateView31(UpdateAPIView):
    serializer_class = Relacion31Serializer
    permission_classes = ()
    queryset = Relacion31.objects.all()
    lookup_field = 'id'

class ProfileCreate(CreateAPIView):

    serializer_class = ProfesorSerializer
    permission_classes = ()

class ProfileUpdate(UpdateAPIView):
    serializer_class = ProfesorSerializer
    permission_classes = ()
    queryset = Profesor.objects.all()
    lookup_field = 'id'



class ProfileDelete(APIView):

  def delete(self, request,id):
    profesor =Profesor.objects.get(id=id)
    profesor.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

class DisciplinaListView(ListAPIView):

    serializer_class = DisciplinaSerializer
    permission_classes = ()
    queryset= Disciplina.objects.all()

class DisciplinaCreate(CreateAPIView):

    serializer_class = DisciplinaSerializer
    permission_classes = ()

class DisciplinaUpdate(UpdateAPIView):
    serializer_class = DisciplinaSerializer
    permission_classes = ()
    queryset = Disciplina.objects.all()
    lookup_field = 'id'

class DisciplinaDelete(APIView):

  def delete(self, request,id):
    profesor = Disciplina.objects.get(id=id)
    profesor.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

class DisciplinaRetrieveView(RetrieveAPIView):
    serializer_class = DisciplinaSerializer
    permission_classes = ()
    queryset = Disciplina.objects.all()
    lookup_field = 'id'


class ProfesorRetrieveView(RetrieveAPIView):
    serializer_class = ProfesorSerializer
    permission_classes = ()
    queryset = Profesor.objects.all()
    lookup_field = 'id'

class RelacionListView(ListAPIView):
    serializer_class = RelacionSerializer
    permission_classes = ()
    queryset = Relacion.objects.all()

class RelacionCreateView(CreateAPIView):
    serializer_class = RelacionSerializer
    permission_classes = ()

class RelacionRetrieveView(RetrieveAPIView):
    serializer_class = RelacionSerializer
    permission_classes = ()
    queryset = Relacion.objects.all()
    lookup_field = 'id'

class RelacionUpdateView(UpdateAPIView):
    serializer_class = RelacionSerializer
    permission_classes = ()
    queryset = Relacion.objects.all()
    lookup_field = 'id'

class Relacion1ListView(ListAPIView):
    serializer_class = Relacion1Serializer
    permission_classes = ()
    queryset = Relacion1.objects.all()

class Relacion1CreateView(CreateAPIView):
    serializer_class = Relacion1Serializer
    permission_classes = ()

class Relacion1RetrieveView(RetrieveAPIView):
    serializer_class = Relacion1Serializer
    permission_classes = ()
    queryset = Relacion1.objects.all()
    lookup_field = 'id'

class Relacion1UpdateView(UpdateAPIView):
    serializer_class = Relacion1Serializer
    permission_classes = ()
    queryset = Relacion1.objects.all()
    lookup_field = 'id'


class RelacionListView2(ListAPIView):
    serializer_class = Relacion2Serializer
    permission_classes = ()
    queryset = Relacion2.objects.all()

class RelacionCreateView2(CreateAPIView):
    serializer_class = Relacion2Serializer
    permission_classes = ()

class RelacionRetrieveView2(RetrieveAPIView):
    serializer_class = Relacion2Serializer
    permission_classes = ()
    queryset = Relacion2.objects.all()
    lookup_field = 'id'

class RelacionUpdateView2(UpdateAPIView):
    serializer_class = Relacion2Serializer
    permission_classes = ()
    queryset = Relacion2.objects.all()
    lookup_field = 'id'

class Plan_EstudioListView(ListAPIView):
    serializer_class = Plan_EstudioSerializer
    permission_classes = ()
    queryset = Plan_Estudio.objects.all()


class Plan_EstudioCreate(CreateAPIView):

   serializer_class = Plan_EstudioSerializer
   permission_classes = ()

class Plan_EstudioUpdateView(UpdateAPIView):
    serializer_class = Plan_EstudioSerializer
    permission_classes = ()
    queryset = Plan_Estudio.objects.all()
    lookup_field = 'id'

class Plan_EstudioDelete(APIView):

  def delete(self, request,id):
    profesor = Plan_Estudio.objects.get(id=id)
    profesor.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


class Plan_EstudioRetrieveView(RetrieveAPIView):
    serializer_class = Plan_EstudioSerializer
    permission_classes = ()
    queryset = Plan_Estudio.objects.all()
    lookup_field = 'id'  


class all_events(ListAPIView):
    serializer_class = EventSerializer
    permission_classes = ()
    queryset = Events.objects.all()

class add_event(CreateAPIView):
    serializer_class = EventSerializer
    permission_classes = ()

class update(UpdateAPIView):
    serializer_class = EventSerializer
    permission_classes = ()
    queryset = Events.objects.all()
    lookup_field = 'id'

class remove(APIView):

  def delete(self, request,id):
    events = Events.objects.get(id=id)
    events.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

class EventRetrieveView(RetrieveAPIView):
    serializer_class = EventSerializer
    permission_classes = ()
    queryset = Events.objects.all()
    lookup_field = 'id'

class AsignaturaListView(ListAPIView):
    serializer_class = AsignaturaSerializers
    permission_classes = ()
    queryset = Asignatura.objects.all()


class AsignaturaCreate(CreateAPIView):
   serializer_class = AsignaturaSerializers
   permission_classes = ()

class AsignaturaUpdate(UpdateAPIView):
    serializer_class = AsignaturaSerializers
    permission_classes = ()
    queryset = Asignatura.objects.all()
    lookup_field = 'id'

class AsignaturaDelete(APIView):

  def delete(self, request,id):
    profesor = Asignatura.objects.get(id=id)
    profesor.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

class RelacionListView3(ListAPIView):
    serializer_class = Relacion3Serializer
    permission_classes = ()
    queryset = Relacion3.objects.all()

class RelacionCreateView3(CreateAPIView):
    serializer_class = Relacion3Serializer
    permission_classes = ()

class RelacionRetrieveView3(RetrieveAPIView):
    serializer_class = Relacion3Serializer
    permission_classes = ()
    queryset = Relacion3.objects.all()
    lookup_field = 'id'

class RelacionUpdateView3(UpdateAPIView):
    serializer_class = Relacion3Serializer
    permission_classes = ()
    queryset = Relacion3.objects.all()
    lookup_field = 'id'


class Status(APIView):
    def contar(self):
      
        return self.PDisciplina.objects.filter(profesores__titulo = 'Lic').annotate(count=Count('profesores'))
        
class DepartamentoCreateView(CreateAPIView):
    serializer_class = DepartamentoSerializer
    permission_classes = ()
class DepartamentoListView(ListAPIView):
    serializer_class = DepartamentoSerializer
    permission_classes = ()
    queryset = Departamento.objects.all()    
       
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.core.mail import send_mail

class usersList(APIView):

    def get(self,request):
        users = Profesor.objects.all()
        
        context = {
            'users':users
        }
        return render(request,'usersList.html',context)

    def post(self,request,*args,**kwargs):
        if request.method == 'POST':
            users_ids = request.POST.getlist('ids[]')
         
            message = request.POST.get('message')

            for id in users_ids:
              
                user = Profesor.objects.get(pk=id)
                
                send_mail(
                    
                     message,
                    'Universidad de Oriente',
                     settings.EMAIL_HOST_USER,
                    [user.email],
                    fail_silently=False,
                )
            return redirect('users')


# prueba 2 aprobada


def formularioContacto(request):
    return render(request, "formularioContacto.html")

csrf_exempt
def send_email(email,message,subject):
     email= EmailMessage( subject, message,settings.EMAIL_HOST_USER,
        [email]
 )
     email.send()
csrf_exempt
def send(request):
    if request.method == "POST":
       email=request.POST.get('email')
       message=request.POST.get('message')
       subject=request.POST.get('subject')
       send_email(email,message,subject)
    return HttpResponse(send_email, status=status.HTTP_200_OK)

from io import BytesIO
import io
from django.http import HttpResponse
from django.views.generic import ListView
from reportlab.platypus import SimpleDocTemplate, Paragraph,  Table,  Spacer,  TableStyle
from reportlab.lib.styles import  ParagraphStyle, TA_CENTER,getSampleStyleSheet
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import Table
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, mm,cm


class IndexView(ListView):
    model = Profesor
    context_object_name = "c"


def generar_pdf(request):
    print ("Genero el PDF")
    response = HttpResponse(content_type='application/pdf')
    pdf_name = "docentes.pdf"  # llamado docentes
    # la linea 26 es por si deseas descargar el pdf a tu computadora
    response['Content-Disposition'] = 'attachment; filename=%s' % pdf_name
    
    buff = BytesIO()
    doc = SimpleDocTemplate(buff,
                            pagesize=letter,
                            rightMargin=72,
                            leftMargin=72,
                            topMargin=60,
                            bottomMargin=18,
                            )
    clientes = []
    styles = getSampleStyleSheet()
    header = Paragraph("Listado de docentes", styles['Heading1'])
    clientes.append(header)
    headings = ('ID','Nombre', 'Email', 'Responsabilidad', 'Doc', 'Cfica','Titulo','Tel','Movil','Relación')
    allclientes = [(p.id ,p.name, p.email, p.responsabilidad, p.categoria_doc, p.categorias_cientificas, p.titulo, p.telefono, p.movil, p.tipo_relacion) for p in Profesor.objects.all()]
   
    print (allclientes)
     
    t = Table([headings] + allclientes, colWidths=[0.50 * cm, 4.2 * cm, 4.2 * cm,4.8 * cm,1.1 * cm, 1.1 * cm, 1.1 * cm, 1.4 * cm, 1.4 * cm, 1.6 * cm])
    t.setStyle(TableStyle(
        [
            #La primera fila(encabezados) va a estar centrada
                ('ALIGN',(0,0),(3,0),'CENTER'),
                #Los bordes de todas las celdas serán de color negro y con un grosor de 1
                ('GRID', (0, 0), (-1, -1), 1, colors.black), 
                #El tamaño de las letras de cada una de las celdas será de 10
                ('FONTSIZE', (0, 0), (-1, -1), 10),
        ]
    ))
   
    clientes.append(t)
    doc.build(clientes)
    response.write(buff.getvalue())
    buff.close()
    return response



def categoria_print(self, pk=None):
   response = HttpResponse(content_type='application/pdf')
   pdf_name = "docentes.pdf"  # llamado docentes
    # la linea 26 es por si deseas descargar el pdf a tu computadora
   response['Content-Disposition'] = 'attachment; filename=%s' % pdf_name
   buff = io.BytesIO()
   doc = SimpleDocTemplate(buff,
               pagesize=letter,
               rightMargin=40,
               leftMargin=40,
               topMargin=60,
               bottomMargin=18,
               )
   categorias = []
   styles = getSampleStyleSheet()
   header = Paragraph("Listado de docentes", styles['Heading1'])
   categorias.append(header)
   headings = ('ID','Nombre', 'Email', 'Responsabilidad', 'Categoria_cientifica')
   if not pk:
     todascategorias = [(p.id ,p.name, p.email, p.responsabilidad, p.categorias_cientificas)
               for p in Profesor.objects.all().order_by('pk')]
   else:
     todascategorias = [(p.id ,p.name, p.email, p.responsabilidad, p.categorias_cientificas)
               for p in Profesor.objects.filter(id=pk)]
   t = Table([headings] + todascategorias)
   t.setStyle(TableStyle(
     [
       ('GRID', (0, 0), (3, -1), 1, colors.dodgerblue),
       ('LINEBELOW', (0, 0), (-1, 0), 2, colors.darkblue),
       ('BACKGROUND', (0, 0), (-1, 0), colors.dodgerblue)
     ]
   ))

   categorias.append(t)
   doc.build(categorias)
   response.write(buff.getvalue())
   buff.close()
   return response

class View(ListView):
    model = Disciplina
    context_object_name = "c"

def generar_pdfs(request):
    print ("Genero el PDF")
    response = HttpResponse(content_type='application/pdf')
    pdf_name = "docentes.pdf"  # llamado docentes
    # la linea 26 es por si deseas descargar el pdf a tu computadora
    response['Content-Disposition'] = 'attachment; filename=%s' % pdf_name
    buff = BytesIO()
    doc = SimpleDocTemplate(buff,
                            pagesize=letter,
                            rightMargin=40,
                            leftMargin=40,
                            topMargin=60,
                            bottomMargin=18,
                            )
    clientes = []
    styles = getSampleStyleSheet()
    header = Paragraph("Listado de docentes", styles['Heading1'])
    clientes.append(header)
    headings = ('ID','Nombre')
    allclientes = [(p.id ,p.nombre) for p in Disciplina.objects.all()]
    print (allclientes)

    t = Table([headings] + allclientes)
    t.setStyle(TableStyle(
        [
            ('GRID', (0, 0), (3, -1), 1, colors.dodgerblue),
            ('LINEBELOW', (0, 0), (-1, 0), 2, colors.darkblue),
            ('BACKGROUND', (0, 0), (-1, 0), colors.dodgerblue)
        ]
    ))
    clientes.append(t)
    doc.build(clientes)
    response.write(buff.getvalue())
    buff.close()
    return response

def categoria_prints(self, pk=None):
   response = HttpResponse(content_type='application/pdf')
   pdf_name = "docentes.pdf"  # llamado docentes
    # la linea 26 es por si deseas descargar el pdf a tu computadora
   response['Content-Disposition'] = 'attachment; filename=%s' % pdf_name
   buff = io.BytesIO()
   doc = SimpleDocTemplate(buff,
               pagesize=letter,
               rightMargin=40,
               leftMargin=40,
               topMargin=60,
               bottomMargin=18,
               )
   categorias = []
   styles = getSampleStyleSheet()
   header = Paragraph("Listado de docentes", styles['Heading1'])
   categorias.append(header)
   headings = ('ID','Nombre')
   if not pk:
     todascategorias = [(p.id ,p.nombre)
               for p in Disciplina.objects.all().order_by('pk')]
   else:
     todascategorias = [(p.id ,p.nombre, p.profesores.name)
               for p in Disciplina.objects.filter(id=pk)]
   t = Table([headings] + todascategorias)
   t.setStyle(TableStyle(


    
     [
       ('GRID', (0, 0), (3, -1), 1, colors.dodgerblue),
       ('LINEBELOW', (0, 0), (-1, 0), 2, colors.darkblue),
       ('BACKGROUND', (0, 0), (-1, 0), colors.dodgerblue)
     ]
   ))

   categorias.append(t)
   doc.build(categorias)
   response.write(buff.getvalue())
   buff.close()
   return response


   
class TareaView(ListView):
    model = Events
    context_object_name = "c"

def generar_pdft(request):
    print ("Genero el PDF")
    response = HttpResponse(content_type='application/pdf')
    pdf_name = "docentes.pdf"  # llamado docentes
    # la linea 26 es por si deseas descargar el pdf a tu computadora
    response['Content-Disposition'] = 'attachment; filename=%s' % pdf_name
    buff = BytesIO()
    doc = SimpleDocTemplate(buff,
                            pagesize=letter,
                            rightMargin=40,
                            leftMargin=40,
                            topMargin=60,
                            bottomMargin=18,
                            )
    clientes = []
    styles = getSampleStyleSheet()
    header = Paragraph("Listado de docentes", styles['Heading1'])
    clientes.append(header)
    headings = ('ID','Nombre','Comienzo','Fin','Estado')
    allclientes = [(p.id ,p.name,p.start,p.end ,p.estado) for p in Events.objects.all()]
    print (allclientes)

    t = Table([headings] + allclientes)
    t.setStyle(TableStyle(
        [
            ('GRID', (0, 0), (3, -1), 1, colors.dodgerblue),
            ('LINEBELOW', (0, 0), (-1, 0), 2, colors.darkblue),
            ('BACKGROUND', (0, 0), (-1, 0), colors.dodgerblue)
        ]
    ))
    clientes.append(t)
    doc.build(clientes)
    response.write(buff.getvalue())
    buff.close()
    return response

def categoria_printt(self, pk=None):
   response = HttpResponse(content_type='application/pdf')
   pdf_name = "docentes.pdf"  # llamado docentes
    # la linea 26 es por si deseas descargar el pdf a tu computadora
   response['Content-Disposition'] = 'attachment; filename=%s' % pdf_name
   buff = io.BytesIO()
   doc = SimpleDocTemplate(buff,
               pagesize=letter,
               rightMargin=40,
               leftMargin=40,
               topMargin=60,
               bottomMargin=18,
               )
   categorias = []
   styles = getSampleStyleSheet()
   header = Paragraph("Listado de docentes", styles['Heading1'])
   categorias.append(header)
   headings = ('ID','Nombre','Comienzo','Fin','Estado')
   if not pk:
     todascategorias = [(p.id ,p.name,p.start,p.end ,p.estado)
               for p in Events.objects.all().order_by('pk')]
   else:
     todascategorias = [(p.id,p.name,p.start,p.end ,p.estado)
               for p in Events.objects.filter(id=pk)]
   t = Table([headings] + todascategorias)
   t.setStyle(TableStyle(
     [
       ('GRID', (0, 0), (3, -1), 1, colors.dodgerblue),
       ('LINEBELOW', (0, 0), (-1, 0), 2, colors.darkblue),
       ('BACKGROUND', (0, 0), (-1, 0), colors.dodgerblue)
     ]
   ))

   categorias.append(t)
   doc.build(categorias)
   response.write(buff.getvalue())
   buff.close()
   return response


   
class PlanView(ListView):
    model = Plan_Estudio
    context_object_name = "c"

def generar_pdfp(request):
    print ("Genero el PDF")
    response = HttpResponse(content_type='application/pdf')
    pdf_name = "docentes.pdf"  # llamado docentes
    # la linea 26 es por si deseas descargar el pdf a tu computadora
    response['Content-Disposition'] = 'attachment; filename=%s' % pdf_name
    buff = BytesIO()
    doc = SimpleDocTemplate(buff,
                            pagesize=letter,
                            rightMargin=40,
                            leftMargin=40,
                            topMargin=60,
                            bottomMargin=18,
                            )
    clientes = []
    styles = getSampleStyleSheet()
    header = Paragraph("Listado de plan", styles['Heading1'])
    clientes.append(header)
    headings = ('ID','grupo','carrera','año','curso','curso f','semestre','tipo de curso')
    allclientes = [(p.id ,p.grupo,p.carrera ,p.anno,p.curso,p.curso_f ,p.semestre,p.tipo_curso) for p in Plan_Estudio.objects.all()]
    print (allclientes)

    t = Table([headings] + allclientes)
    t.setStyle(TableStyle(
        [
            ('GRID', (0, 0), (3, -1), 1, colors.dodgerblue),
            ('LINEBELOW', (0, 0), (-1, 0), 2, colors.darkblue),
            ('BACKGROUND', (0, 0), (-1, 0), colors.dodgerblue)
        ]
    ))
    clientes.append(t)
    doc.build(clientes)
    response.write(buff.getvalue())
    buff.close()
    return response

def categoria_printp(self, pk=None):
   response = HttpResponse(content_type='application/pdf')
   pdf_name = "docentes.pdf"  # llamado docentes
    # la linea 26 es por si deseas descargar el pdf a tu computadora
   response['Content-Disposition'] = 'attachment; filename=%s' % pdf_name
   buff = io.BytesIO()
   doc = SimpleDocTemplate(buff,
               pagesize=letter,
               rightMargin=40,
               leftMargin=40,
               topMargin=60,
               bottomMargin=18,
               )
   categorias = []
   styles = getSampleStyleSheet()
   header = Paragraph("Listado de docentes", styles['Heading1'])
   categorias.append(header)
   headings = ('ID','grupo','carrera','año','curso','curso f','semestre','tipo de curso')
   if not pk:
     todascategorias = [(p.id ,p.grupo,p.carrera ,p.anno,p.curso,p.curso_f ,p.semestre,p.tipo_curso)
               for p in Plan_Estudio.objects.all().order_by('pk')]
   else:
     todascategorias = [(p.id,p.grupo,p.carrera ,p.anno,p.curso,p.curso_f ,p.semestre,p.tipo_curso)
               for p in Plan_Estudio.objects.filter(id=pk)]
   t = Table([headings] + todascategorias)
   t.setStyle(TableStyle(
     [
       ('GRID', (0, 0), (3, -1), 1, colors.dodgerblue),
       ('LINEBELOW', (0, 0), (-1, 0), 2, colors.darkblue),
       ('BACKGROUND', (0, 0), (-1, 0), colors.dodgerblue)
     ]
   ))

   categorias.append(t)
   doc.build(categorias)
   response.write(buff.getvalue())
   buff.close()
   return response


from django.db.models import Count, Q
from django.shortcuts import render




def ticket_classv(request):
    dataset = Disciplina.objects \
        .values('nombre') \
        .annotate(titulo_count=Count('profesores', filter=Q(profesores__titulo='ing')),
                  titulod_count=Count('profesores', filter=Q(profesores__titulo='lic'))) \
        .order_by('nombre')
    return render(request, 'grafica.html', {'dataset': dataset})


import json
from django.db.models import Count, Q
from django.shortcuts import render


def ticket_class_view_2(request):
    dataset = Disciplina.objects \
        .values('profesores') \
        .annotate(survived_count=Count('profesores', filter=Q(profesores__titulo = 'Lic')),
                  not_survived_count=Count('profesores', filter=Q(profesores__titulo = 'Ing'))) \
        .order_by('profesores')

    categories = list()
    survived_series = list()
    not_survived_series = list()

    for entry in dataset:
        categories.append('%s Class' % entry['profesores'])
        survived_series.append(entry['survived_count'])
        not_survived_series.append(entry['not_survived_count'])

    return render(request, 'ticket_class_2.html', {
        'categories': json.dumps(categories),
        'survived_series': json.dumps(survived_series),
        'not_survived_series': json.dumps(not_survived_series)
    })



def count(request):
    total = Profesor.objects.count()
    return  JsonResponse({'total':total})  
     

def count_event(request):
    total = Events.objects.count()
    return  JsonResponse({'total':total})    


 # ok
def Profileing(request):
    ing_total = Profesor.objects.filter(titulo='Ing').count()
    lic_total = Profesor.objects.filter(titulo='Lic').count()
    total = ing_total + lic_total
    return JsonResponse({'total': total, 'ing_total': ing_total, 'lic_total': lic_total})

# def ProfileI(request):
#     total = Profesor.objects.filter(titulo='Ing').count()
#     return  JsonResponse({'total':total})

# def Profilelic(request):
#     total = Profesor.objects.filter(titulo='Lic').count()
#     return  JsonResponse({'total':total})    

def Profiledis(request):
    msc_total = Profesor.objects.filter(categorias_cientificas='MsC').count()
    drc_total = Profesor.objects.filter(categorias_cientificas='DrC').count()
    total = msc_total + drc_total
    return JsonResponse({'total': total, 'msc_total': msc_total, 'drc_total': drc_total})


# def Profilemsc(request):
#     total = Profesor.objects.filter(categorias_cientificas='MsC').count()
#     return  JsonResponse({'total':total})

# def Profiledrc(request):
#     total = Profesor.objects.filter(categorias_cientificas='DrC').count()
#     return  JsonResponse({'total':total})   


class DisciplinasListView(ListAPIView):
    serializer_class = DisciplinaSerializer
    permission_classes = ()
    queryset = Disciplina.objects.all()

class DisciplinasListViews(ListAPIView):
    serializer_class = DisciplinaSerializers
    permission_classes = ()
    queryset = Disciplina.objects.filter(profesores__titulo = 'Lic').annotate(count=Count('profesores'))
    

class DisciplinasLists(ListAPIView):
    serializer_class = DisciplinaSerializer
    permission_classes = ()
    queryset = Disciplina.objects.filter(profesores__titulo = 'Ing').annotate(count=Count('profesores'))



class DisciplinasList(ListAPIView):
    serializer_class = DisciplinaSerializers
    permission_classes = ()
    queryset = Disciplina.objects.filter(profesores__categorias_cientificas = 'DrC').annotate(count=Count('profesores'))


class DisciplinasLis(ListAPIView):
    serializer_class = DisciplinaSerializers
    permission_classes = ()
    queryset = Disciplina.objects.filter(profesores__categorias_cientificas = 'MsC').annotate(count=Count('profesores'))


@csrf_exempt
def departmentApi(request,id=0):
    if request.method=='GET':
        departments=Disciplina.objects.filter(profesores__titulo = 'Ing').annotate(count=Count('profesores'))
        department_serializer=DisciplinaSerializers(departments,many=True)
        return JsonResponse(department_serializer.data,safe=False)

@csrf_exempt
def departmentAp(request,id=0):
    if request.method=='GET':
        departments=Disciplina.objects.filter(profesores__categorias_cientificas = 'MsC').annotate(count=Count('profesores'))
        department_serializer=DisciplinaSerializers(departments,many=True)
        return JsonResponse(department_serializer.data,safe=False)

@csrf_exempt
def departmentA(request,id=0):
    if request.method=='GET':
        departments=Disciplina.objects.filter(profesores__categorias_cientificas = 'DrC').annotate(count=Count('profesores'))
        department_serializer=DisciplinaSerializers(departments,many=True)
        return JsonResponse(department_serializer.data,safe=False)
def Profiledisc(self):
      total=Disciplina.objects.filter(profesores__titulo = 'Ing').count('profesores')
      return HttpResponse(total)  
      
def ProfilePA(request):
    total = Profesor.objects.filter(categoria_doc='PA').count()
    return  JsonResponse({'total':total})

def ProfileI(request):
    total = Profesor.objects.filter(categoria_doc='I').count()
    return  JsonResponse({'total':total})    

def ProfileADI(request):
    total = Profesor.objects.filter(categoria_doc='ADI').count()
    return  JsonResponse({'total':total})

def ProfilePT(request):
    total = Profesor.objects.filter(categoria_doc='PT').count()
    return  JsonResponse({'total':total})  
def ProfileATD(request):
    total = Profesor.objects.filter(categoria_doc='ATD').count()
    return  JsonResponse({'total':total})  
def ProfileA(request):
    total = Profesor.objects.filter(categoria_doc='A').count()
    return  JsonResponse({'total':total})     


