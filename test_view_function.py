import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'college_counseling.settings')
django.setup()

from college_recommendation.models import College

def test_view_logic():
    """Test the logic that will be used in the view function"""
    # Simulate form data
    percentile = 90.0
    category = 'General'
    courses = []  # Empty means all courses
    cities = []   # Empty means all cities
    
    # Define percentile range (±5)
    min_percentile = percentile - 10
    max_percentile = percentile + 10
    
    # Map user-friendly category names to database category codes
    category_mapping = {
        'General': ['GOPENS', 'GOPENH', 'GOPENO'],
        'OBC': ['GOBCS', 'GOBCH', 'GOBCO', 'GSEBCS', 'GSEBCH', 'GSEBCO'],
        'SC': ['GSCS', 'GSCH', 'SCS', 'SCH'],
        'ST': ['GSTS', 'GSTH', 'STS', 'STH']
    }
    
    # Get the list of category codes to match
    category_codes = category_mapping.get(category, [])
    
    # Build the database query
    colleges_query = College.objects.all()
    
    # Filter by category if specified
    if category and category_codes:
        colleges_query = colleges_query.filter(category__in=category_codes)
    
    # Filter by percentile range
    colleges_query = colleges_query.filter(percentile__gte=min_percentile, percentile__lte=max_percentile)
    
    # Filter by courses if specific courses are selected
    if courses:
        colleges_query = colleges_query.filter(course_name__in=courses)
    
    # Filter by cities if specific cities are selected
    if cities:
        colleges_query = colleges_query.filter(city__in=cities)
    
    # Execute the query and convert to list of dictionaries
    matching_colleges = []
    for college in colleges_query:
        matching_colleges.append({
            'college_code': college.college_code,
            'college_name': college.college_name,
            'course_code': college.course_code,
            'course_name': college.course_name,
            'category': college.category,
            'merit_rank': college.merit_rank,
            'percentile': str(college.percentile),
            'city': college.city
        })
    
    # Sort colleges by percentile (descending) and then by merit rank (ascending)
    matching_colleges.sort(key=lambda x: (-float(x['percentile']), int(x['merit_rank'])))
    
    print(f"Found {len(matching_colleges)} matching colleges")
    print("First 5 results:")
    for i, college in enumerate(matching_colleges[:5]):
        print(f"  {i+1}. {college['college_name']} - {college['course_name']} ({college['category']}): {college['percentile']}")

if __name__ == "__main__":
    test_view_logic()