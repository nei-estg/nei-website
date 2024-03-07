from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission

class Command(BaseCommand):
  help = 'Add Roles to the database.' 
  
  def handle(self, *args, **options):
    studentRoles = ['add_calendarmodel', 'add_materialmodel', 'add_mentoringrequestmodel', 'add_mentoringmodel', 'delete_mentoringmodel']
    student = Group.objects.get_or_create(name='Student')
    self.stdout.write(self.style.SUCCESS('Added Student group'))
    for role in studentRoles:
      permission = Permission.objects.get(codename=role)
      student[0].permissions.add(permission)
      self.stdout.write(self.style.SUCCESS('Added ' + role + ' to Student group'))
