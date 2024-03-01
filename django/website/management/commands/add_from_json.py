from django.core.management.base import BaseCommand
from website.models import CourseModel, CurricularUnitModel, FAQCategoryModel, FAQModel, MaterialTagModel, BlogTopicModel
import json
from django.db import transaction


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
    #! Create Courses
    for course_data in courses_data:
      course, created = CourseModel.objects.get_or_create(
        abbreviation=course_data['abbreviation'],
        name=course_data['name']
      )
      
      if created:
        self.stdout.write(self.style.SUCCESS(
          f'Created new course: {course}'))
      else:
        self.stdout.write(self.style.WARNING(
          f'Course: {course}'))
    
    #! For Each Course
    for course_data in courses_data:
      course = CourseModel.objects.get(
        abbreviation=course_data['abbreviation'],
        name=course_data['name']
      )
      curricular_units_data = course_data.get('curricularUnits', {})
      
      #! For Each Year
      for year, curricular_units in curricular_units_data.items():
          
        #! For Each Curricular Unit
        for unit_data in curricular_units:
            
          #! Check if the curricular unit already exists
          curricular_unit = CurricularUnitModel.objects.filter(
            abbreviation = unit_data['abbreviation'],
            name=unit_data['name'],
            course=course,
            year=year
          )
          
          #! If it doesn't exist, create it
          if not curricular_unit:
            curricular_unit = CurricularUnitModel(
              abbreviation = unit_data['abbreviation'],
              name=unit_data['name'],
              year=year
            )
            curricular_unit.save()
            curricular_unit.course.add(course)
            curricular_unit.save()
            self.stdout.write(self.style.SUCCESS(
              f'Curricular unit: {curricular_unit}'))
            
            #! Add together courses
            if 'together' in unit_data:
              for together_course_json in unit_data['together']:
                together_course = CourseModel.objects.get(
                  abbreviation=together_course_json,
                )
                curricular_unit.course.add(together_course)
                curricular_unit.save()
                self.stdout.write(self.style.SUCCESS(
                  f'Together Course: {together_course} to {curricular_unit}'))
          else:
              #! If it exists, get the first one since there should be only one
              curricular_unit = curricular_unit[0]
              if 'together' in unit_data:
                for together_course_json in unit_data['together']:
                  together_course = CourseModel.objects.get(
                    abbreviation=together_course_json,
                  )
                  
                  #! Check if the together course is already added to the curricular unit
                  if not curricular_unit.course.filter(abbreviation=together_course_json).exists():
                    curricular_unit.course.add(together_course)
                    curricular_unit.save()
                    self.stdout.write(self.style.SUCCESS(
                      f'Together Course: {together_course} to {curricular_unit}'))
                  else:
                    self.stdout.write(self.style.WARNING(
                      f'Together Course: {together_course} already added to {curricular_unit}'))

  def update_material_tags(self, material_tags_data):
    for tag_name in material_tags_data:
      tag, created = MaterialTagModel.objects.get_or_create(
        name=tag_name)
      
      if created:
        self.stdout.write(self.style.SUCCESS(
          f'Created new material tag: {tag}'))
      else:
        self.stdout.write(self.style.WARNING(
          f'Material Tag: {tag}'))

  def update_blog_topics(self, blog_topics_data):
    for topic_name in blog_topics_data:
      topic, created = BlogTopicModel.objects.get_or_create(
        name=topic_name)
      
      if created:
        self.stdout.write(self.style.SUCCESS(
          f'Created new blog topic: {topic}'))
      else:
        self.stdout.write(self.style.WARNING(
          f'Blog Topic: {topic}'))

  def update_faqs(self, faqs_data):
    for category_faqs in faqs_data:
      for category_name, faqs_list in category_faqs.items():
        category, created = FAQCategoryModel.objects.get_or_create(
          name=category_name)

        if created:
          self.stdout.write(self.style.SUCCESS(
            f'Created new FAQ category: {category}'))
        else:
          self.stdout.write(self.style.WARNING(
            f'FAQ Category: {category}'))
        
        for faq_data in faqs_list:
          faq, created = FAQModel.objects.get_or_create(
            question=faq_data['question'],
            answer=faq_data['answer'],
            category=category
          )
          
          if created:
            self.stdout.write(self.style.SUCCESS(
              f'Created new FAQ: {faq}'))
          else:
            self.stdout.write(self.style.WARNING(
              f'FAQ: {faq}'))
