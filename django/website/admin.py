from django.contrib import admin
from .models import *

class ContactAdmin(admin.ModelAdmin):
  list_display = ('name', 'email', 'subject', 'message', 'open')
  list_filter = list_display

admin.site.register(ContactModel, ContactAdmin)

class FAQAdmin(admin.ModelAdmin):
  list_display = ('category', 'question', 'answer')
  list_filter = list_display

admin.site.register(FAQCategoryModel)
admin.site.register(FAQModel, FAQAdmin)

class CurricularUnitAdmin(admin.ModelAdmin):
  list_display = ('abbreviation', 'name') #TODO: Add Course
  list_filter = list_display

admin.site.register(CourseModel)
admin.site.register(CurricularUnitModel, CurricularUnitAdmin)

class MaterialAdmin(admin.ModelAdmin):
  list_display = ('name', 'file', 'link', 'curricularUnit', 'visible') #TODO: Add Course
  list_filter = list_display

admin.site.register(MaterialTagModel)
admin.site.register(MaterialModel, MaterialAdmin)

class CalendarAdmin(admin.ModelAdmin):
  list_display = ('name', 'startDate', 'endDate', 'description')
  list_filter = list_display

admin.site.register(CalendarModel, CalendarAdmin)

class MentoringRequestAdmin(admin.ModelAdmin):
  list_display = ('mentee', 'curricularUnit', 'date') #TODO: Add Course
  list_filter = list_display

admin.site.register(MentoringRequestModel, MentoringRequestAdmin)

class MentoringAdmin(admin.ModelAdmin):
  list_display = ('mentee', 'mentor', 'curricularUnit', 'date') #TODO: Add Course
  list_filter = list_display

admin.site.register(MentoringModel, MentoringAdmin)

class MentoringReviewAdmin(admin.ModelAdmin):
  list_display = ('mentoring', 'comment', 'rating', 'date')
  list_filter = list_display

admin.site.register(MentoringReviewModel, MentoringReviewAdmin)

admin.site.register(BlogTopicModel)
admin.site.register(BlogImageModel)

class BlogPostAdmin(admin.ModelAdmin):
  list_display = ('title', 'author', 'date')
  list_filter = list_display

admin.site.register(BlogPostModel, BlogPostAdmin)
admin.site.register(ProfileModel)
