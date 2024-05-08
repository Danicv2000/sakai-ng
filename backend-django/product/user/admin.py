
from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import models

class CustomUserAdmin(UserAdmin):
    list_filter = UserAdmin.list_filter + ('is_staff', 'is_active',)  # Add valid fields for filtering

class UserAdmin(UserAdmin):
    ordering = ['id']
    list_display = ['id', 'username', 'email', 'get_name']
    list_display_links = ['id', 'email']
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        (_('Personal info'), {'fields': ('name',)}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'admins')}),
        (_('Important dates'), {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2')
         }),
     )

    def get_name(self, obj):
        return obj.name
    get_name.short_description = 'Name'

admin.site.unregister(models.User)
admin.site.register(models.User, UserAdmin)