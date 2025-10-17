from django.urls import path
from . import views

app_name = 'college_recommendation'

urlpatterns = [
    path('search/', views.search_colleges, name='search_colleges'),
    path('download/', views.download_colleges, name='download_colleges'),
    path('download/pdf/', views.download_colleges_pdf, name='download_colleges_pdf'),
]