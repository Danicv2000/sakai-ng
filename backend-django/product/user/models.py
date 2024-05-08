from pickle import NONE
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import Group, Permission
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class UserManager(BaseUserManager):

    def create_user(self, email, username=None, password=None, **extra_fields):
         if not email:
            raise ValueError('Users must have an email')
         user = self.model( username=username, email = self.normalize_email(email), **extra_fields)
         user.set_password(password)
         user.save(using=self._db)
         return user


    def create_superuser(self, email, password, username=None):
        user=self.create_user(email,username,password)
        user.is_staff=True
        user.is_superuser=True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    STATUS_CHOICES = (
        ('coordinador_carrera' ,'coordinador de carrera'),
        ('jefe_departamento' , 'jefe de departamento'),
        ('jefes_disciplina' , 'jefe de disciplina'),
    )
    username = models.CharField(max_length=150,unique=True,null=True)
    email = models.EmailField(max_length=150, unique=True)
    name = models.CharField(max_length=150)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    admins= models.CharField(max_length=50, choices=STATUS_CHOICES)
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_permissions')
    groups = models.ManyToManyField(Group, related_name='custom_user_groups')

    objects = UserManager()

    USERNAME_FIELD = 'email'
   

