from django.contrib import admin
from .models import College

@admin.register(College)
class CollegeAdmin(admin.ModelAdmin):
    list_display = ('college_name', 'course_name', 'category', 'percentile', 'city')
    list_filter = ('category', 'city')
    search_fields = ('college_name', 'course_name', 'college_code')