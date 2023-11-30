from django.contrib import admin
from .models import *

class ContactAdmin(admin.ModelAdmin):
  list_display = ('name', 'email', 'subject', 'message', 'open')
  list_filter = ('open',)

admin.site.register(ContactModel, ContactAdmin)
admin.site.register(FAQModel)
admin.site.register(CourseModel)
admin.site.register(CurricularUnitModel)
admin.site.register(MaterialTagModel)
admin.site.register(MaterialModel)
admin.site.register(MaterialLinkModel)
admin.site.register(CalendarModel)
admin.site.register(MentorshipRequestModel)
admin.site.register(MentorshipModel)
admin.site.register(MentorshipReviewModel)
admin.site.register(BlogTopicModel)
admin.site.register(BlogImageModel)
admin.site.register(BlogPostModel)
admin.site.register(ProfileModel)
