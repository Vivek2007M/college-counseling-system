from django.http import HttpResponse
from django.shortcuts import render


def HomePage(request):
    return render(request,'index.html')


def RegisterPage(request):
    return render(request,'register.html')


def LoginPage(request):
    return render(request,'login.html')

