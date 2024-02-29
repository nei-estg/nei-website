from django.core.management.base import BaseCommand
from website.models import CourseModel, CurricularUnitModel, FAQCategoryModel, FAQModel, MaterialTagModel, BlogTopicModel
import json


class Command(BaseCommand):
  help = 'Add Static Data from JSON file to the database.'
  
  def handle(self, *args, **options):
    with open('data.json', 'r') as file:
      data = json.load(file)
    
    self.update_courses(data.get('Courses', []))
    self.update_material_tags(data.get('MaterialTags', []))
    self.update_blog_topics(data.get('BlogTopics', []))
    self.update_faqs(data.get('FAQs', []))

  def update_courses(self, courses_data):
    for course_data in courses_data:
      course, _ = CourseModel.objects.get_or_create(
        name=course_data['name'],
        abbreviation=course_data['abbreviation']
      )
      curricular_units_data = course_data.get('curricularUnits', {})
      for year, curricular_units in curricular_units_data.items():
        for unit_data in curricular_units:
          if 'together' in unit_data:
            self.stdout.write(self.style.SUCCESS(
              f'Processing together curricular units for {unit_data["abbreviation"]}'))
            for course_abbreviation in unit_data['together']:
              course_together = CourseModel.objects.filter(abbreviation=course_abbreviation)
              if course_together.exists():
                self.stdout.write(self.style.SUCCESS(
                  f'Found Course {course_together[0]}'))
                for course_t in course_together:
                  curricular_unit = CurricularUnitModel.objects.filter(
                    abbreviation=unit_data['abbreviation'],
                    course=course_t
                  )
                  if curricular_unit.exists():
                    curricular_unit[0].course.add(course_t)
                    self.stdout.write(self.style.SUCCESS(
                      f'Added Course {course_t} to existing Curricular Unit {curricular_unit[0]}'))
                  else:
                    self.stdout.write(self.style.SUCCESS(
                      f'Course {course_t} not found. Adding curricular unit to current course'))
                    unit = CurricularUnitModel.objects.create(
                      name=unit_data['name'],
                      abbreviation=unit_data['abbreviation'],
                      year=year
                    )
                    unit.course.add(course_t)
                    self.stdout.write(self.style.SUCCESS(
                      f'Created new Curricular Unit {unit}'))
              else:
                self.stdout.write(self.style.SUCCESS(
                  f'Course {course_abbreviation} not found. Adding curricular unit to current course'))
                unit = CurricularUnitModel.objects.create(
                  name=unit_data['name'],
                  abbreviation=unit_data['abbreviation'],
                  year=year
                )
                unit.course.add(course)
                self.stdout.write(self.style.SUCCESS(
                  f'Created new Curricular Unit {unit}'))
          else:
            existing_unit = CurricularUnitModel.objects.filter(
              abbreviation=unit_data['abbreviation'],
              course=course
            )
            if not existing_unit.exists():
              unit = CurricularUnitModel.objects.create(
                name=unit_data['name'],
                abbreviation=unit_data['abbreviation'],
                year=year
              )
              unit.course.add(course)
              self.stdout.write(self.style.SUCCESS(
                f'Created new Curricular Unit {unit}'))

  def update_material_tags(self, material_tags_data):
      for tag_name in material_tags_data:
          tag, created = MaterialTagModel.objects.get_or_create(
              name=tag_name)

  def update_blog_topics(self, blog_topics_data):
      for topic_name in blog_topics_data:
          topic, created = BlogTopicModel.objects.get_or_create(
              name=topic_name)

  def update_faqs(self, faqs_data):
      for category_faqs in faqs_data:
          for category_name, faqs_list in category_faqs.items():
              category, created = FAQCategoryModel.objects.get_or_create(
                  name=category_name)
              self.stdout.write(self.style.SUCCESS(
                  f'Created new FAQ category: {category}'))

              for faq_data in faqs_list:
                  faq, created = FAQModel.objects.get_or_create(
                      question=faq_data['question'],
                      answer=faq_data['answer'],
                      category=category
                  )
                  self.stdout.write(self.style.SUCCESS(
                      f'Created new FAQ: {faq}'))
