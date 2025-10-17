from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from college_recommendation.models import College
from django.contrib.auth.models import User
from django.db.models import Count

def HomePage(request):
    # Get real-time statistics
    # Count unique colleges based on college_code
    college_count = College.objects.values('college_code').distinct().count()
    student_count = User.objects.count()
    
    # For now, we'll use a placeholder for success results
    # In a real implementation, this would be based on actual data
    success_results_count = 15000  # Placeholder - would be calculated based on actual data
    
    context = {
        'college_count': college_count,
        'student_count': student_count,
        'success_results_count': success_results_count
    }
    
    return render(request, 'index.html', context)

def RegisterPage(request):
    return render(request,'register.html')

def LoginPage(request):
    return render(request,'login.html')

@login_required
def college_search(request):
    return render(request,'search.html')