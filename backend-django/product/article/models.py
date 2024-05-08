from collections import Counter
from django.db import models
from django.contrib import admin
from django.db.models import Case, When,Count
from django.core.mail import send_mail
import math
from django.conf import settings

class Carrera(models.Model):
    codigo = models.CharField(max_length=3, primary_key=True)
    nombre = models.CharField(max_length=50)
   

    def __str__(self):
       return self.nombre 

class Estudiante(models.Model):
    dni = models.CharField(max_length=8, primary_key=True)
    apellidoPaterno = models.CharField(max_length=35)
    apellidoMaterno = models.CharField(max_length=35)
    nombres = models.CharField(max_length=35)
    fechaNacimiento = models.DateField()
    sexos = [
        ('F', 'Femenino'),
        ('M', 'Masculino')
    ]
    sexo = models.CharField(max_length=1, choices=sexos, default='M')
    carrera = models.ForeignKey(Carrera, null=False, blank=False, on_delete=models.CASCADE)
    vigencia = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)

    def nombreCompleto(self):
        txt = "{0}, {1}, {2}"
        return txt.format(self.apellidoPaterno, self.apellidoMaterno, self.nombres)

    def __str__(self):
        txt = "{0} / Carrera: {1} / {2}"
        if self.vigencia:
            estadoEstudiante = "VIGENTE"
        else:
            estadoEstudiante = "DE BAJA"
        return txt.format(self.nombreCompleto(), self.carrera, estadoEstudiante)




class Asignatura(models.Model):
    nombre = models.CharField(max_length=255,blank=True, default='')
    horas_conferencias = models.IntegerField(verbose_name='Cantidad de Horas Conferencia', blank=True, null=True,
                                             default=0)


    horas_cp = models.IntegerField(verbose_name='Cantidad de Horas Clase Practica', blank=True, null=True, default=0)

    horas_cpc = models.IntegerField(verbose_name='Cantidad de Horas Clase Practica Computadoras', blank=True, null=True,
                                    default=0)

    horas_lab = models.IntegerField(verbose_name='Cantidad de Horas Laboratorio', blank=True, null=True, default=0)

    horas_taller = models.IntegerField(verbose_name='Cantidad de Horas Taller', blank=True, null=True, default=0)

    horas_seminarios = models.IntegerField(verbose_name='Cantidad de Horas Seminario', blank=True, null=True, default=0)

    def __str__(self):
        
      return self.nombre
class Profesor(models.Model):
    STATUS_CHOICES = (
        ('completo' ,'Completo'),
        ('contrato' , 'Contrato'),
        ('colaborar' , 'Colaborar'),
    )
    titulo = models.CharField(max_length=50)
    email = models.EmailField(max_length=50, unique=True)
    name = models.CharField(max_length=50, blank=False, default='')
    telefono = models.IntegerField(null=True,blank=True)
    movil = models.IntegerField(null=True,blank=True)
    categoria_doc = models.CharField(max_length=50)
    categorias_cientificas = models.CharField(max_length=50)

    responsabilidad= models.CharField( max_length=250, blank=False, default='')
    tipo_relacion= models.CharField(max_length=50, choices=STATUS_CHOICES)
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)

  
    def __str__(self):
        return self.name     
class Plan_Estudio(models.Model):

    STATUS_CHOICES = (
        ('diurno' , 'Diurno'),
        ('encuentro' , 'Encuentro'),
        ('distancia' , 'Distancia'),
        ('ciclo_corto' ,'Ciclo_corto'),

    )
    grupo = models.SlugField(max_length=50, blank=False, default='')
    carrera = models.CharField(max_length=50, blank=False, default='')
    anno = models.SlugField(verbose_name='Año del grupo')
    curso = models.DateTimeField(null=True,blank=True)
    curso_f = models.DateTimeField(null=True,blank=True)
    semestre = models.CharField(max_length=50, blank=False, default='')
    tipo_curso = models.CharField(max_length=50, choices=STATUS_CHOICES)
    profesores = models.ManyToManyField(Profesor,through='Relacion2')
    
    nombre = models.CharField(max_length=255,blank=True, default='')
    horas_conferencias = models.IntegerField(verbose_name='Cantidad de Horas Conferencia', blank=True, null=True,
                                             default=0)


    horas_cp = models.IntegerField(verbose_name='Cantidad de Horas Clase Practica', blank=True, null=True, default=0)

    horas_cpc = models.IntegerField(verbose_name='Cantidad de Horas Clase Practica Computadoras', blank=True, null=True,
                                    default=0)

    horas_lab = models.IntegerField(verbose_name='Cantidad de Horas Laboratorio', blank=True, null=True, default=0)

    horas_taller = models.IntegerField(verbose_name='Cantidad de Horas Taller', blank=True, null=True, default=0)

    horas_seminarios = models.IntegerField(verbose_name='Cantidad de Horas Seminario', blank=True, null=True, default=0)
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)

   
   
    def __str__(self):
      return self.grupo


class Curso(models.Model):
    codigo = models.CharField(max_length=6, primary_key=True)
    nombre = models.CharField(max_length=30)
    creditos = models.PositiveSmallIntegerField()
    docente = models.ForeignKey(Profesor, null=False, blank=False, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        txt = "{0} ({1}) / Docente: {2}"
        return txt.format(self.nombre, self.codigo, self.docente)

class Matricula(models.Model):
    id = models.AutoField(primary_key=True)
    estudiante = models.ForeignKey(Estudiante, null=False, blank=False, on_delete=models.CASCADE)
    curso = models.ForeignKey(Curso, null=False, blank=False, on_delete=models.CASCADE)
    fechaMatricula = models.DateTimeField(auto_now_add=True)
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        txt = "{0} matriculad{1} en el curso {2} / Fecha: {3}"
        if self.estudiante.sexo == "F":
            letraSexo = "a"
        else:
            letraSexo = "o"
        fecMat = self.fechaMatricula.strftime("%A %D/%M/%Y %H:%M:%S")
        return txt.format(self.estudiante.nombreCompleto(), letraSexo, self.curso, fecMat)

class Disciplina(models.Model):
     nombre = models.CharField(max_length=50, blank=False, default='')
     profesores = models.ManyToManyField(Profesor, through='Relacion')
     created = models.DateTimeField(auto_now=True)
     updated = models.DateTimeField(auto_now=True)

     def __str__(self):
        return self.nombre

class Events(models.Model):
    STATUS_CHOICES = (
        ('pendiente' , 'Pendiente'),
        ('proceso'   , 'En Proceso'),
        ('resuelto'  , 'Resuelto'),
        ('cerrado'   , 'Cerrado')
    )
    name = models.CharField(max_length=255,blank=True, default='')
    start = models.DateTimeField(null=True,blank=True)
    end = models.DateTimeField(null=True,blank=True)
    estado = models.CharField(max_length=10, choices=STATUS_CHOICES)
    profesores = models.ManyToManyField(Profesor, through='Relacion1')
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def send_email(self):
        if self.estado == 'pendiente':

              send_mail(
                'La tarea esta pendiente',
                'Hagala cuanto antes.',
                email_desde = settings.EMAIL_HOST_USER,
                recipient_list=[self.Profesor.email],
                fail_silently=False,
            )
 

  

class Relacion (models.Model):
    profesor = models.ForeignKey(Profesor, on_delete=models.CASCADE)
    disciplina = models.ForeignKey(Disciplina, on_delete=models.CASCADE)
class RelacionInLine(admin.TabularInline):
    model = Relacion
class DisciplinaAdmin(admin.ModelAdmin):
    inlines = (RelacionInLine,)

class Relacion1(models.Model):
    profesor = models.ForeignKey(Profesor, on_delete=models.CASCADE)
    tarea = models.ForeignKey(Events, on_delete=models.CASCADE)
class RelacionInLine1(admin.TabularInline):
    model = Relacion1
class EventsAdmin(admin.ModelAdmin):
    inlines = (RelacionInLine1,)


class Relacion2(models.Model):
    profesor = models.ForeignKey(Profesor, on_delete=models.CASCADE)
    plan = models.ForeignKey(Plan_Estudio, on_delete=models.CASCADE)

class RelacionInLine2(admin.TabularInline):
    model = Relacion2
    extra = 1



class Relacion3(models.Model):
    plan = models.ForeignKey(Plan_Estudio, on_delete=models.CASCADE)
    asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE)

class Relacion31(models.Model):
    asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE) 
    plan = models.ForeignKey(Plan_Estudio, on_delete=models.CASCADE)
    

class RelacionInLine31(admin.TabularInline):
    model = Relacion31
    extra = 1


class RelacionInLine3(admin.TabularInline):
    model = Relacion3
    extra = 1

class PlanAdmin(admin.ModelAdmin):
    inlines = (RelacionInLine3,RelacionInLine2,RelacionInLine31)
    
class AsignaturaAdmin(admin.ModelAdmin):
    inlines = (RelacionInLine3,RelacionInLine31)

class ProfesorAdmin(admin.ModelAdmin):
    inlines = (RelacionInLine,RelacionInLine1,RelacionInLine2)


class Contacts(models.Model):

    mail = models.ForeignKey(Profesor, on_delete=models.CASCADE)
    subject=models.CharField(max_length=100)
    message=models.TextField(max_length=100)


class Departamento(models.Model):
     nombre = models.CharField(max_length=50, blank=False, default='')
     def __str__(self):
        return self.nombre
    