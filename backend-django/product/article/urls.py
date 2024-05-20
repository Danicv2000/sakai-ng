from django.urls import path

from article.views import formularioContacto, send
from django.views.decorators.csrf import csrf_exempt
from article import views
from . import views

urlpatterns=[
    path('',views.index,name='index'),
    path('signup/',views.CreateUserView.as_view()),
    path('login/',views.LoginView.as_view()),
    path('logout/',views.LogoutView.as_view(), name='auth_logout'),
    path('user/profile/',views.ProfileView.as_view(), name='user_profile'),

   

    path('pdfs', views.View.as_view(), name='home'),
    path('prints/', views.generar_pdfs, name='pdf'),
    path('prints/<int:pk>', views.categoria_prints, name='categoria_print_one'),

    path('pdf', views.IndexView.as_view(), name='home'),
    path('print/', views.generar_pdf, name='pdf'),

  
    
    path('print/<int:pk>', views.categoria_print, name='categoria_print'),


    path('pdft', views.TareaView.as_view(), name='home'),
    path('printt/', views.generar_pdft, name='pdf'),
    path('printt/<int:pk>', views.categoria_printt, name='categoria_print_one'),


    path('pdfp', views.PlanView.as_view(), name='home'),
    path('printp/', views.generar_pdfp, name='pdfp'),
    path('printp/<int:pk>', views.categoria_printp, name='categoria_print_one'),



    path('formularioContacto/', formularioContacto),


    path('ticket_class2/', views.ticket_class_view_2),
    path('ticket_class1/', views.ticket_classv),




    path('count',views.count),


    path('counting',views.Profileing),
    # path('countlic',views.Profilelic),

    # path('countmsc',views.Profilemsc),
    # path('countdrc',views.Profiledrc),

    path('countdis',views.Profiledis),
   
    # path('countdisc',views.Profiledisc),
    path('countdi',views.DisciplinasListView.as_view()),
   

    path('countpa',views.ProfilePA),
    path('counti',views.ProfileI),

    path('countadi',views.ProfileADI),
    path('countpt',views.ProfilePT),

    path('countatd',views.ProfileATD),
    path('counta',views.ProfileA),


    path('counte',views.count_event),

    path('users',views.usersList.as_view(), name='users'),



    path('profile/',views.ProfileListView.as_view()),
    path('profile/create/',views.ProfileCreate.as_view()),
    path('profile/update/<int:id>',views.ProfileUpdate.as_view()),
    path('profile/delete/<int:id>',views.ProfileDelete.as_view()),
    path('profile/<int:id>', views.ProfesorRetrieveView.as_view(),),


    path('re/',views.ReView.as_view()),
    path('re/create/',views.ReCreate.as_view()),
    path('re/update/<int:id>',views.RelacionUpdateView31.as_view()),
    path('re/<int:id>',views.RetrieveView.as_view()),

    path('plan/',views.Plan_EstudioListView.as_view()),
    path('plan/create/',views.Plan_EstudioCreate.as_view()),
    path('plan/update/<int:id>',views.Plan_EstudioUpdateView.as_view()),
    path('plan/delete/<int:id>',views.Plan_EstudioDelete.as_view()),
    path('plan/<int:id>',views.Plan_EstudioRetrieveView.as_view()),


   



    path('event/create/', views.add_event.as_view(), name='add_event'),
    path('event/update/<int:id>', views.update.as_view(), name='update'),
    path('event/remove/<int:id>', views.remove.as_view(), name='remove'),
    path('event', views.all_events.as_view(), name='all_events'),
    path('event/<int:id>', views.EventRetrieveView.as_view(), ),


    path('dis',views.DisciplinasListViews.as_view()),
    path('disi',views.DisciplinasLists.as_view()),

    path('di',views.DisciplinasList.as_view()),
  
    
    path('dep',views.departmentApi),

    path('deps',views.departmentAp),
    path('de',views.departmentA),
    path('disciplina/',views.DisciplinaListView.as_view()),
    
   
    path('disciplina/create/',views.DisciplinaCreate.as_view()),
    path('disciplina/update/<int:id>',views.DisciplinaUpdate.as_view()),
    path('disciplina/delete/<int:id>',views.DisciplinaDelete.as_view()),
    path('disciplina/<int:id>/', views.DisciplinaRetrieveView.as_view()),


    path('asignar',views.AsignaturaListView.as_view()),
    path('asignar/create/',views.AsignaturaCreate.as_view()),
    path('asignar/update/<int:id>',views.AsignaturaUpdate.as_view()),
    path('asignar/delete/<int:id>',views.AsignaturaDelete.as_view()),



    path('relacion/', views.RelacionListView.as_view(), name='relacion'),
    path('relacion/create/', views.RelacionCreateView.as_view(), name='relacion_c'),
    path('relacion/<int:id>/', views.RelacionRetrieveView.as_view(), name='relacion_g'),
    path('relacion/update/<int:id>/', views.RelacionUpdateView.as_view(), name='relacion_u'),


    path('relacions/', views.Relacion1ListView.as_view(), name='relacion'),
    path('relacions/create/', views.Relacion1CreateView.as_view(), name='relacion_c'),
    path('relacions/<int:id>/', views.Relacion1RetrieveView.as_view(), name='relacion_g'),
    path('relacions/update/<int:id>/', views.Relacion1UpdateView.as_view(), name='relacion_u'),


    path('relaciones/', views.RelacionListView2.as_view(), name='relacion'),
    path('relaciones/create/', views.RelacionCreateView2.as_view(), name='relacion_c'),
    path('relaciones/<int:id>/', views.RelacionRetrieveView2.as_view(), name='relacion_g'),
    path('relaciones/update/<int:id>/', views.RelacionUpdateView2.as_view(), name='relacion_u'),
    
    path('relacione/', views.RelacionListView3.as_view(), name='relacion'),
    path('relacione/create/', views.RelacionCreateView3.as_view(), name='relacion_c'),
    path('relacione/<int:id>/', views.RelacionRetrieveView3.as_view(), name='relacion_g'),
    path('relacione/update/<int:id>/', views.RelacionUpdateView3.as_view(), name='relacion_u'),
    
    path('depa/create/', views.DepartamentoCreateView.as_view(), name='relacion_u'),
    path('depa/', views.DepartamentoListView.as_view(), name='relacion_u'),
    path('status/', views.Status.as_view(), name='u'),
]