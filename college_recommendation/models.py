from django.db import models

class College(models.Model):
    college_code = models.CharField(max_length=10)
    college_name = models.CharField(max_length=200)
    course_code = models.CharField(max_length=20)
    course_name = models.CharField(max_length=100)
    category = models.CharField(max_length=20)
    merit_rank = models.IntegerField()
    percentile = models.DecimalField(max_digits=10, decimal_places=7)
    city = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.college_name} - {self.course_name}"