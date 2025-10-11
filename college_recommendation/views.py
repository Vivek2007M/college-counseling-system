from django.shortcuts import render
from django.http import JsonResponse
import csv
import os
from django.conf import settings
from django.contrib.auth.decorators import login_required

# Create your views here.

@login_required
def search_colleges(request):
    """
    Handle college search requests.
    Filters colleges based on percentile, category, courses, and cities.
    Returns JSON response with matching colleges.
    """
    if request.method == 'POST':
        try:
            # Get form data
            percentile = float(request.POST.get('percentile', 0))
            category = request.POST.get('category', '')
            courses = request.POST.getlist('course')
            cities = request.POST.getlist('cities')
            
            # Handle "All Courses" selection
            if '' in courses or not courses:
                courses = []  # Empty list means all courses
            
            # Handle "All Cities" selection
            if '' in cities or not cities:
                cities = []  # Empty list means all cities
            
            # Define percentile range (±5)
            min_percentile = percentile - 5
            max_percentile = percentile + 5
            
            # Map user-friendly category names to CSV category codes
            category_mapping = {
                'General': ['GOPENS', 'GOPENH', 'GOPENO'],
                'OBC': ['GOBCS', 'GOBCH', 'GOBCO', 'GSEBCS', 'GSEBCH', 'GSEBCO'],
                'SC': ['GSCS', 'GSCH', 'SCS', 'SCH'],
                'ST': ['GSTS', 'GSTH', 'STS', 'STH']
            }
            
            # Get the list of category codes to match
            category_codes = category_mapping.get(category, [])
            
            # Path to the CSV file (using the correct colleges.csv file)
            csv_path = os.path.join(settings.BASE_DIR, 'static', 'data', 'colleges.csv')
            
            # Check if CSV file exists
            if not os.path.exists(csv_path):
                return JsonResponse({
                    'success': False,
                    'error': 'College data not found'
                })
            
            # Read and filter CSV data
            matching_colleges = []
            
            with open(csv_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                
                for row in reader:
                    # Filter by category - match any of the category codes
                    if category and row['category'] not in category_codes:
                        continue
                    
                    # Filter by percentile range
                    try:
                        college_percentile = float(row['percentile'])
                        if college_percentile < min_percentile or college_percentile > max_percentile:
                            continue
                    except ValueError:
                        # Skip rows with invalid percentile values
                        continue
                    
                    # Filter by courses if specific courses are selected
                    if courses and row['course_name'] not in courses:
                        continue
                    
                    # Filter by cities if specific cities are selected
                    if cities and row['city'] not in cities:
                        continue
                    
                    # Add matching college to results
                    matching_colleges.append({
                        'college_code': row['college_code'],
                        'college_name': row['college_name'],
                        'course_code': row['course_code'],
                        'course_name': row['course_name'],
                        'category': row['category'],
                        'merit_rank': row['merit_rank'],
                        'percentile': row['percentile'],
                        'city': row['city']
                    })
            
            # Sort colleges by percentile (descending) and then by merit rank (ascending)
            matching_colleges.sort(key=lambda x: (-float(x['percentile']), int(x['merit_rank'])))
            
            # Return JSON response
            return JsonResponse({
                'success': True,
                'colleges': matching_colleges
            })
            
        except Exception as e:
            # Handle any errors
            return JsonResponse({
                'success': False,
                'error': str(e)
            })
    
    # If not POST request, return error
    return JsonResponse({
        'success': False,
        'error': 'Invalid request method'
    })