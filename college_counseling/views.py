from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

def HomePage(request):
    return render(request,'index.html')

def RegisterPage(request):
    return render(request,'register.html')

def LoginPage(request):
    return render(request,'login.html')

@login_required
def college_search(request):
    return render(request,'search.html')