from django.db import models
from django.contrib.auth.models import User, Group
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django_prometheus.models import ExportModelOperationsMixin
import datetime

class ContactModel(ExportModelOperationsMixin('ContactModel'), models.Model):
  name = models.TextField()
  email = models.EmailField()
  subject = models.TextField()
  message = models.TextField()
  date = models.DateTimeField(auto_now_add=True)
  open = models.BooleanField(default=True)

  class Meta:
    unique_together = ('name', 'email', 'subject', 'message')
    verbose_name = "Formulário de Contacto"
    verbose_name_plural = "Formulário de Contactos"

  def __str__(self):
    return self.name


class FAQModel(ExportModelOperationsMixin('FAQModel'), models.Model):
  question = models.TextField()
  answer = models.TextField()

  class Meta:
    verbose_name = "FAQ"
    verbose_name_plural = "FAQs"

  def __str__(self):
    return self.question


class CourseModel(ExportModelOperationsMixin('CourseModel'), models.Model):
  name = models.TextField()
  abbreviation = models.TextField()

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
  name = models.TextField()

  class Meta:
    verbose_name = "Tag de Material"
    verbose_name_plural = "Tags de Material"

  def __str__(self):
    return self.name


class MaterialModel(ExportModelOperationsMixin('MaterialModel'), models.Model):
  name = models.TextField()
  file = models.FileField()
  tags = models.ManyToManyField(MaterialTagModel)
  curricular_unit = models.ForeignKey(CurricularUnitModel, on_delete=models.CASCADE)
  date = models.DateTimeField(auto_now_add=True)
  visible = models.BooleanField(default=False)

  class Meta:
    verbose_name = "Material de Unidade Curricular"
    verbose_name_plural = "Materiais das Unidades Curriculares"

  def __str__(self):
    return self.name
  
class MaterialLinkModel(ExportModelOperationsMixin('MaterialLinkModel'), models.Model):
  name = models.TextField()
  link = models.URLField()
  tags = models.ManyToManyField(MaterialTagModel)
  curricular_unit = models.ForeignKey(CurricularUnitModel, on_delete=models.CASCADE)
  date = models.DateTimeField(auto_now_add=True)
  visible = models.BooleanField(default=False)

  class Meta:
    verbose_name = "Link de Material de Unidade Curricular"
    verbose_name_plural = "Links de Materiais das Unidades Curriculares"

  def __str__(self):
    return self.name
  
class CalendarModel(ExportModelOperationsMixin('CalendarModel'), models.Model):
  name = models.TextField()
  date = models.DateTimeField()
  description = models.TextField()
  curricular_unit = models.ForeignKey(CurricularUnitModel, on_delete=models.CASCADE, null=True, blank=True)
  
  class Meta:
    verbose_name = "Evento de Calendário"
    verbose_name_plural = "Eventos de Calendário"
    
  def __str__(self):
    return self.name


class MentorshipRequestModel(ExportModelOperationsMixin('MentorshipRequestModel'), models.Model):
  mentee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mentorship_request_mentee')
  curricular_unit = models.ForeignKey(CurricularUnitModel, on_delete=models.CASCADE)
  date = models.DateTimeField(auto_now_add=True)

  class Meta:
    verbose_name = "Pedido de Mentoria"
    verbose_name_plural = "Pedidos de Mentoria"

  def __str__(self):
    return self.mentee.username + " - " + self.curricular_unit.name


class MentorshipModel(ExportModelOperationsMixin('MentorshipModel'), models.Model):
  mentor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mentor')
  mentee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mentee')
  curricular_unit = models.ForeignKey(CurricularUnitModel, on_delete=models.CASCADE)
  date = models.DateTimeField(auto_now_add=True)

  class Meta:
    verbose_name = "Mentoria"
    verbose_name_plural = "Mentorias"

  def __str__(self):
    return self.mentor.username + " -> " + self.mentee.username + ": " + self.curricular_unit.name

class MentorshipReviewModel(ExportModelOperationsMixin('MentorshipReviewModel'), models.Model):
  mentee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mentorship_review_mentee')
  mentor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mentorship_review_mentor')
  curricular_unit = models.ForeignKey(CurricularUnitModel, on_delete=models.CASCADE)
  comment = models.TextField()
  rating = models.IntegerField(
    choices=[
      (0, '0'),
      (1, '1'),
      (2, '2'),
      (3, '3'),
      (4, '4'),
      (5, '5')
    ]
  )
  date = models.DateTimeField(auto_now_add=True)

  class Meta:
    verbose_name = "Review de Mentoria"
    verbose_name_plural = "Reviews de Mentoria"
    
  def __str__(self):
    return self.mentee.username + " -> " + self.mentor.username + ": " + self.curricular_unit.name

class BlogTopicModel(ExportModelOperationsMixin('BlogTopicModel'), models.Model):
  name = models.TextField()

  class Meta:
    verbose_name = "Tópico de Blog"
    verbose_name_plural = "Tópicos de Blog"

  def __str__(self):
    return self.name


class BlogImageModel(ExportModelOperationsMixin('BlogImageModel'), models.Model):
  name = models.TextField()
  image = models.ImageField()

  class Meta:
    verbose_name = "Imagem de Blog"
    verbose_name_plural = "Imagens de Blog"

  def __str__(self):
    return self.name


class BlogPostModel(ExportModelOperationsMixin('BlogPostModel'), models.Model):
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
  course = models.ManyToManyField(CourseModel, blank=True)
  year = models.IntegerField(
    choices=[
      (1, '1º'),
      (2, '2º'),
      (3, '3º'),
      (4, 'Erasmus'),
      (5, 'Alumni')
    ], null=True
  )
  image = models.ImageField(null=True, blank=True)
  bio = models.TextField(null=True, blank=True)
  
  class Meta:
    ordering = ['user']
    verbose_name = "Perfil de Utilizador"
    verbose_name_plural = "Perfis de Utilizadores"  

  def __str__(self):
    return self.user.username


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
  if created:
    ProfileModel.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
  instance.profilemodel.save()
