from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group

class Command(BaseCommand):
  help = 'Add Roles to the database.' 
  
  def handle(self, *args, **options):

    nei = Group.objects.get_or_create(name='NEI')
    self.stdout.write(self.style.SUCCESS('Added NEI group'))
    student = Group.objects.get_or_create(name='Student')
    self.stdout.write(self.style.SUCCESS('Added Student group'))
    #TODO: Add permissions to groups
    
    
    
