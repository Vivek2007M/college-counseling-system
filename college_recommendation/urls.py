from django.urls import path
from . import views

app_name = 'college_recommendation'

urlpatterns = [
    path('search/', views.search_colleges, name='search_colleges'),
]