from django.contrib import admin


from .models import DisciplinaAdmin,Relacion31,Relacion,PlanAdmin,Departamento, EventsAdmin,ProfesorAdmin,PlanAdmin,Profesor,Plan_Estudio,Events,Disciplina,Asignatura,AsignaturaAdmin,Estudiante,Curso,Matricula,Carrera

from django.utils.translation import gettext as _

from django.contrib.auth import get_user_model


from django.contrib.auth.models import Group  # new
from django.db.models import Count
  # new

admin.site.register(Profesor,ProfesorAdmin)

class ProfesorAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'updated')
admin.site.register(Plan_Estudio,PlanAdmin)
class PlanAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'updated')

admin.site.register(Disciplina,DisciplinaAdmin)
class DisciplinaAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'updated')
admin.site.register(Events,EventsAdmin)
class EventsAdmin(admin.ModelAdmin):
    readonly_fields = ('created', 'updated')


admin.site.register(Asignatura,AsignaturaAdmin)

admin.site.register(Estudiante)

admin.site.register(Curso)

admin.site.register(Matricula)

admin.site.register(Carrera)

admin.site.register(Relacion31)