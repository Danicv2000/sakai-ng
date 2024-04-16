

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUser
from user import models
from django.utils.translation import gettext as _ 


class UserAdmin(BaseUser):
     ordering= ['id']
     list_display = ['id','username','email','name']
     list_display_links = ['id','email']
     fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        (_('Personal info'), {'fields': ('name',)}),
        (_('Permissions'), {'fields': ('is_active','is_staff','is_superuser','admins')}),
        (_('Imp dates'), {'fields': ('last_login',)}),
    )
     add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2')
         }),
     )


admin.site.register(models.User, UserAdmin)
