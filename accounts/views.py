# accounts/views.py
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Profile
from django.views.decorators.http import require_POST

def register_view(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name', '').strip()
        last_name  = request.POST.get('last_name', '').strip()
        email      = request.POST.get('email', '').strip().lower()
        phone      = request.POST.get('phone', '').strip()
        exam_type  = request.POST.get('exam_type', '').strip()
        password   = request.POST.get('password', '')
        confirm    = request.POST.get('confirm_password', '')

        if not first_name or not last_name or not email or not password:
            messages.error(request, "Please fill the required fields: first name, last name, email, password.")
            return redirect('register_page')

        if password != confirm:
            messages.error(request, "Passwords do not match.")
            return redirect('register_page')

        if User.objects.filter(email__iexact=email).exists():
            messages.error(request, "An account with this email already exists.")
            return redirect('register_page')


        user = User(username=email, email=email, first_name=first_name, last_name=last_name)
        user.set_password(password)  
        user.save()

        profile, _ = Profile.objects.get_or_create(user=user)
        profile.phone = phone
        profile.exam_type = exam_type
        profile.save()

        login(request, user)
        messages.success(request, "Registration successful. Welcome!")
        return redirect('profile')
    
    return render(request, 'register.html')


def login_view(request):

    if request.method == 'POST':
        email = request.POST.get('email', '').strip().lower()
        password = request.POST.get('password', '')

        if not email or not password:
            messages.error(request, "Please enter both email and password.")
            return redirect('login_page')

        try:
            user_obj = User.objects.get(email__iexact=email)
            user = authenticate(request, username=user_obj.username, password=password)
        except User.DoesNotExist:
            user = None

        if user is not None:
            login(request, user)
            messages.success(request, f"Welcome back, {user.get_short_name() or user.username}!")
            return redirect('profile')
        else:
            messages.error(request, "Invalid email or password.")
            return redirect('login_page')
    return render(request, 'login.html')


@login_required
def profile_view(request):
    profile = getattr(request.user, 'profile', None)
    return render(request, 'profile.html', {'profile': profile, 'user': request.user})

@require_POST
def logout_view(request):

    logout(request)
    messages.info(request, "You have been logged out.")
    return redirect('home')