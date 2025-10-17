import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'college_counseling.settings')
django.setup()

from college_recommendation.models import College

def test_database_query():
    """Test database query functionality"""
    # Test a simple query
    count = College.objects.count()
    print(f"Total colleges in database: {count}")
    
    # Test filtering
    category_codes = ['GOPENS', 'GOPENH', 'GOPENO']
    percentile = 90.0
    min_percentile = percentile - 10
    max_percentile = percentile + 10
    
    colleges_query = College.objects.all()
    colleges_query = colleges_query.filter(category__in=category_codes)
    colleges_query = colleges_query.filter(percentile__gte=min_percentile, percentile__lte=max_percentile)
    
    print(f"Colleges matching criteria: {colleges_query.count()}")
    
    # Show first few results
    for college in colleges_query[:5]:
        print(f"  {college.college_name} - {college.course_name} ({college.category}): {college.percentile}")

if __name__ == "__main__":
    test_database_query()