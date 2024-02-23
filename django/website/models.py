from django.db import models
from django.contrib.auth.models import User, Group
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django_prometheus.models import ExportModelOperationsMixin

class ContactModel(ExportModelOperationsMixin('ContactModel'), models.Model):
  name = models.TextField()
  email = models.EmailField()
  subject = models.TextField()
  message = models.TextField()
  date = models.DateTimeField(auto_now_add=True)
  open = models.BooleanField(default=True)

  class Meta:
    # check for duplicates
    constraints = [
      models.UniqueConstraint(fields=['name', 'email', 'subject', 'message'], name='unique_contact')
    ]
    verbose_name = "Formulário de Contacto"
    verbose_name_plural = "Formulário de Contactos"

  def __str__(self):
    return self.name

class FAQCategoryModel(ExportModelOperationsMixin('FAQCategoryModel'), models.Model):
  name = models.TextField(primary_key=True)

  class Meta:
    verbose_name = "Categoria de FAQ"
    verbose_name_plural = "Categorias de FAQ"

  def __str__(self):
    return self.name

class FAQModel(ExportModelOperationsMixin('FAQModel'), models.Model):
  question = models.TextField()
  answer = models.TextField()
  category = models.ForeignKey(FAQCategoryModel, on_delete=models.CASCADE)

  class Meta:
    constraints = [
      models.UniqueConstraint(fields=['question', 'category'], name='unique_faq')
    ]
    verbose_name = "FAQ"
    verbose_name_plural = "FAQs"

  def __str__(self):
    return self.question


class CourseModel(ExportModelOperationsMixin('CourseModel'), models.Model):
  abbreviation = models.TextField(primary_key=True)
  name = models.TextField()

  class Meta:
    verbose_name = "Curso"
    verbose_name_plural = "Cursos"

  def __str__(self):
    return self.abbreviation


class CurricularUnitModel(ExportModelOperationsMixin('CurricularUnitModel'), models.Model):
  name = models.TextField()
  abbreviation = models.TextField()
  course = models.ManyToManyField(CourseModel)
  year = models.IntegerField(
    choices=[
      (1, '1º'),
      (2, '2º'),
      (3, '3º')
    ]
  )

  class Meta:
    verbose_name = "Unidade Curricular"
    verbose_name_plural = "Unidades Curriculares"

  def __str__(self):
    return self.abbreviation


class MaterialTagModel(ExportModelOperationsMixin('MaterialTagModel'), models.Model):
  name = models.TextField(primary_key=True)

  class Meta:
    verbose_name = "Tag de Material"
    verbose_name_plural = "Tags de Material"

  def __str__(self):
    return self.name


class MaterialModel(ExportModelOperationsMixin('MaterialModel'), models.Model):
  name = models.TextField()
  file = models.FileField(null=True, blank=True)
  link = models.URLField(null=True, blank=True)
  tags = models.ManyToManyField(MaterialTagModel, blank=True)
  curricularUnit = models.ForeignKey(CurricularUnitModel, on_delete=models.CASCADE)
  date = models.DateTimeField(auto_now_add=True)
  visible = models.BooleanField(default=False)

  class Meta:
    #constraint to have either file or link filled
    constraints = [
      models.CheckConstraint(
        check=models.Q(file__isnull=False) | models.Q(link__isnull=False),
        name='file_or_link'
      )
    ]
    verbose_name = "Material de Unidade Curricular"
    verbose_name_plural = "Materiais das Unidades Curriculares"

  def __str__(self):
    return self.name


class CalendarModel(ExportModelOperationsMixin('CalendarModel'), models.Model):
  name = models.TextField()
  startDate = models.DateTimeField()
  endDate = models.DateTimeField()
  description = models.TextField()
  curricularUnit = models.ForeignKey(CurricularUnitModel, on_delete=models.CASCADE, null=True, blank=True)
  place = models.TextField(null=True, blank=True)
  visible = models.BooleanField(default=False)
  
  class Meta:
    constraints = [
      models.CheckConstraint(
        check=models.Q(startDate__lt=models.F('endDate')),
        name='start_date_before_end_date'
      ),
      models.UniqueConstraint(fields=['name', 'startDate', 'endDate', 'curricularUnit'], name='unique_calendar')
    ]
    verbose_name = "Evento de Calendário"
    verbose_name_plural = "Eventos de Calendário"
    
  def __str__(self):
    return self.name


class MentoringRequestModel(ExportModelOperationsMixin('MentoringRequestModel'), models.Model):
  mentee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mentoring_request_mentee')
  curricularUnit = models.ForeignKey(CurricularUnitModel, on_delete=models.CASCADE)
  date = models.DateTimeField(auto_now_add=True)

  class Meta:
    constraints = [
      models.UniqueConstraint(fields=['mentee', 'curricularUnit'], name='unique_mentoring_request')
    ]
    verbose_name = "Pedido de Mentoria"
    verbose_name_plural = "Pedidos de Mentoria"

  def __str__(self):
    return self.mentee.username + " - " + self.curricularUnit.name


class MentoringModel(ExportModelOperationsMixin('MentoringModel'), models.Model):
  mentor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mentor')
  mentee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mentee')
  curricularUnit = models.ForeignKey(CurricularUnitModel, on_delete=models.CASCADE)
  date = models.DateTimeField(auto_now_add=True)

  class Meta:
    constraints = [
      models.UniqueConstraint(fields=['mentor', 'mentee', 'curricularUnit'], name='unique_mentoring')
    ]
    verbose_name = "Mentoria"
    verbose_name_plural = "Mentorias"

  def __str__(self):
    return self.mentor.username + " -> " + self.mentee.username + ": " + self.curricular_unit.name

class BlogTopicModel(ExportModelOperationsMixin('BlogTopicModel'), models.Model):
  name = models.TextField(primary_key=True)

  class Meta:
    verbose_name = "Tópico de Blog"
    verbose_name_plural = "Tópicos de Blog"

  def __str__(self):
    return self.name


class BlogImageModel(ExportModelOperationsMixin('BlogImageModel'), models.Model):
  name = models.TextField(primary_key=True)
  image = models.ImageField(upload_to='blog')

  class Meta:
    verbose_name = "Imagem de Blog"
    verbose_name_plural = "Imagens de Blog"

  def __str__(self):
    return self.name


class BlogPostModel(ExportModelOperationsMixin('BlogPostModel'), models.Model):
  slug = models.SlugField(primary_key=True)
  title = models.TextField()
  description = models.TextField()
  content = models.TextField()
  images = models.ManyToManyField(BlogImageModel)
  topics = models.ManyToManyField(BlogTopicModel)
  author = models.ForeignKey(User, on_delete=models.CASCADE)
  date = models.DateTimeField(auto_now_add=True)

  class Meta:
    verbose_name = "Post de Blog"
    verbose_name_plural = "Posts de Blog"

  def __str__(self):
    return self.title

class ProfileModel(ExportModelOperationsMixin('ProfileModel'), models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  course = models.ManyToManyField(CourseModel)
  year = models.IntegerField(
    choices=[
      (1, '1st'),
      (2, '2nd'),
      (3, '3rd'),
      (4, 'Erasmus'),
      (5, 'Alumni')
    ], null = True
  )
  image = models.ImageField(null=True, blank=True, upload_to='profile')

  class Meta:
    ordering = ['user']
    verbose_name = "Perfil de Utilizador"
    verbose_name_plural = "Perfis de Utilizadores"  

  def __str__(self):
    return self.user.username

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
  if created and instance.is_superuser:
    ProfileModel.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
  if instance.is_superuser:
    instance.profilemodel.save()

@receiver(post_save, sender=User)
def create_student_group(sender, instance, created, **kwargs):
  if created:
    group, _ = Group.objects.get_or_create(name='Student')
    instance.groups.add(group)
