from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

admin.site.register(User, UserAdmin)

class ContactAdmin(admin.ModelAdmin):
  list_display = ('name', 'email', 'subject', 'message', 'open')
  list_filter = list_display
  
  def make_closed(self, request, queryset):
    queryset.update(open=False)
  make_closed.short_description = "Set selected rows as closed"
  
  actions = [make_closed]

admin.site.register(ContactModel, ContactAdmin)

class FAQAdmin(admin.ModelAdmin):
  list_display = ('category', 'question', 'answer')
  list_filter = list_display

admin.site.register(FAQCategoryModel)
admin.site.register(FAQModel, FAQAdmin)

class CurricularUnitAdmin(admin.ModelAdmin):
  list_display = ('abbreviation', 'name')
  list_filter = list_display + ('course',)

admin.site.register(CourseModel)
admin.site.register(CurricularUnitModel, CurricularUnitAdmin)

class MaterialAdmin(admin.ModelAdmin):
  list_display = ('name', 'link', 'curricularUnit', 'visible')
  list_filter = list_display
  
  def make_visible(self, request, queryset):
    queryset.update(visible=True)
  make_visible.short_description = "Set selected rows as visible"

  actions = [make_visible]

admin.site.register(MaterialTagModel)
admin.site.register(MaterialModel, MaterialAdmin)

class CalendarAdmin(admin.ModelAdmin):
  list_display = ('name', 'startDate', 'endDate', 'description', 'visible')
  list_filter = list_display

  def make_visible(self, request, queryset):
    queryset.update(visible=True)
  make_visible.short_description = "Set selected rows as visible"

  actions = [make_visible]

admin.site.register(CalendarModel, CalendarAdmin)

class MentoringRequestAdmin(admin.ModelAdmin):
  list_display = ('mentee', 'curricularUnit', 'date')
  list_filter = list_display

admin.site.register(MentoringRequestModel, MentoringRequestAdmin)

class MentoringAdmin(admin.ModelAdmin):
  list_display = ('mentee', 'mentor', 'curricularUnit', 'date')
  list_filter = list_display

admin.site.register(MentoringModel, MentoringAdmin)

admin.site.register(BlogTopicModel)
admin.site.register(BlogImageModel)

class BlogPostAdmin(admin.ModelAdmin):
  list_display = ('slug', 'title', 'author', 'date')
  list_filter = list_display

admin.site.register(BlogPostModel, BlogPostAdmin)

class ProfileAdmin(admin.ModelAdmin):
  exclude = ('resetCode',)

admin.site.register(ProfileModel, ProfileAdmin)

admin.site.register(UserActivationModel)
admin.site.register(UserResetModel)
