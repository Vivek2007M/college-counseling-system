// ===== ADVANCED COLLEGEMATCH JAVASCRIPT =====

class CollegeMatch {
    constructor() {
        // Loading screen logic removed
        this.setupEventListeners();
        this.setupAnimations();
        this.setupParticles();
        this.setupCursorTrail();
        this.setupCounters();
        this.setupScrollEffects();
        this.optimizePerformance();
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // Navbar scroll effect
        this.setupNavbar();
        
        // Mobile menu
        this.setupMobileMenu();
        
        // Smooth scrolling
        this.setupSmoothScrolling();
        
        // Button effects
        this.setupButtonEffects();
        
        // Form handling (Django ready)
        this.setupFormHandling();
        
        // Keyboard navigation
        this.setupKeyboardNavigation();
        
        // Resize handling
        this.setupResizeHandler();
    }

    setupNavbar() {
        const navbar = document.getElementById('navbar');
        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateNavbar = () => {
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (scrollY > lastScrollY && scrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = scrollY;
            ticking = false;
        };

        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        let isMenuOpen = false;

        if (!mobileMenuBtn || !mobileMenu) return;

        const toggleMenu = () => {
            isMenuOpen = !isMenuOpen;
            mobileMenuBtn.classList.toggle('active', isMenuOpen);
            mobileMenu.classList.toggle('active', isMenuOpen);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
            
            // Animate menu links
            if (isMenuOpen) {
                this.animateMenuLinks();
            }
        };

        mobileMenuBtn.addEventListener('click', toggleMenu);
        
        // Close menu when clicking on links
        const menuLinks = mobileMenu.querySelectorAll('.mobile-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(toggleMenu, 300);
            });
        });
        
        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                toggleMenu();
            }
        });
    }

    animateMenuLinks() {
        const links = document.querySelectorAll('.mobile-link');
        links.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                link.style.transition = 'all 0.3s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        // Only add ripple and hover effects, never loading state or submit overrides
        buttons.forEach(button => {
            // Ripple effect
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });
            // Hover sound effect (optional)
            button.addEventListener('mouseenter', () => {
                this.playHoverSound();
            });
        });
    }

    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    addLoadingState(button) {
        const originalText = button.innerHTML;
        const originalWidth = button.offsetWidth;
        
        button.style.width = originalWidth + 'px';
        button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
                <circle cx="12" cy="12" r="10"/>
                <path d="m12 2l3 6-3 6-3-6z"/>
            </svg>
            Processing...
        `;
        button.disabled = true;
        
        // Add spin animation
        const style = document.createElement('style');
        style.textContent = `
            .animate-spin {
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Restore original state after delay (remove in production)
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            button.style.width = '';
        }, 3000);
    }

    playHoverSound() {
        // Optional: Add subtle hover sound
        // const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBSuN2fPSfzAGKXzH2d+2aTYGHm+y3Z9LEAs+ltryxnUmBiu96e7BdSoFJ3PJ2+2sbjAFEWqz4o1MEQw8k9v31oU7CRhptePHoGUYCkSf2uiuUAwKO5fW3Khb...');
        // audio.volume = 0.1;
        // audio.play().catch(() => {}); // Ignore autoplay restrictions
    }

    // ===== FORM HANDLING (Django Ready) =====
    setupFormHandling() {
    // No JS form handling at all. Let Django handle everything.
    }

    handleFormSubmit(event, form) {
        // event.preventDefault(); // <-- removed to allow form submit
        // Validate form
        const isValid = this.validateForm(form);
        if (!isValid) {
            this.showFormErrors(form);
            return false;
        }
        // ...existing code...
        // (AJAX submission code can be left for other forms, but default submit is now allowed)
    }

    async submitToDjango(formData, form) {
        try {
            // Replace with your Django endpoint
            const response = await fetch('/api/college-match/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                }
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.handleFormSuccess(data, form);
            } else {
                this.handleFormError(data, form);
            }
        } catch (error) {
            this.handleFormError({ error: 'Network error occurred' }, form);
        }
    }

    handleFormSuccess(data, form) {
        // Show success message
        this.showNotification('Success! Your college matches are ready.', 'success');
        
        // Redirect or update UI
        if (data.redirect_url) {
            setTimeout(() => {
                window.location.href = data.redirect_url;
            }, 1500);
        }
    }

    handleFormError(data, form) {
        // Show error messages
        this.showNotification(data.error || 'An error occurred. Please try again.', 'error');
        
        // Show field-specific errors
        if (data.field_errors) {
            Object.keys(data.field_errors).forEach(field => {
                const input = form.querySelector(`[name="${field}"]`);
                if (input) {
                    this.showFieldError(input, data.field_errors[field][0]);
                }
            });
        }
    }

    validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        let isValid = true;
        let errorMessage = '';
        
        // Required validation
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        else if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation (Indian format)
        else if (field.name === 'phone' && value) {
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid 10-digit mobile number';
            }
        }
        
        // Percentile validation
        else if (field.name === 'percentile' && value) {
            const percentile = parseFloat(value);
            if (isNaN(percentile) || percentile < 0 || percentile > 100) {
                isValid = false;
                errorMessage = 'Percentile must be between 0 and 100';
            }
        }
        
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }
        
        return isValid;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.style.borderColor = '#ef4444';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            animation: fadeInUp 0.3s ease;
        `;
        
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        const colors = {
            success: '#22c55e',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: ${colors[type]};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            font-weight: 600;
            z-index: 10001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC key closes mobile menu
            if (e.key === 'Escape') {
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    document.getElementById('mobileMenuBtn').click();
                }
            }
            
            // Arrow key navigation for cards
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                this.navigateCards(e.key);
            }
        });
    }

    navigateCards(direction) {
        const cards = document.querySelectorAll('.feature-card, .testimonial-card');
        const focusedCard = document.activeElement.closest('.feature-card, .testimonial-card');
        
        if (!focusedCard) return;
        
        const currentIndex = Array.from(cards).indexOf(focusedCard);
        let nextIndex;
        
        if (direction === 'ArrowLeft') {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : cards.length - 1;
        } else {
            nextIndex = currentIndex < cards.length - 1 ? currentIndex + 1 : 0;
        }
        
        cards[nextIndex].focus();
    }

    // ===== PARTICLE SYSTEM =====
    setupParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        // Resize canvas
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + 50;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = -Math.random() * 3 - 1;
                this.size = Math.random() * 3 + 1;
                this.life = 1;
                this.decay = Math.random() * 0.02 + 0.005;
                this.color = this.getRandomColor();
            }
            
            getRandomColor() {
                const colors = ['#0ea5e9', '#22c55e', '#f59e0b', '#8b5cf6'];
                return colors[Math.floor(Math.random() * colors.length)];
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life -= this.decay;
                
                // Add some turbulence
                this.vx += (Math.random() - 0.5) * 0.1;
                this.vy += (Math.random() - 0.5) * 0.1;
            }
            
            draw() {
                ctx.save();
                ctx.globalAlpha = this.life;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }
        
        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Add new particles
            if (Math.random() < 0.3) {
                particles.push(new Particle());
            }
            
            // Update and draw particles
            particles = particles.filter(particle => {
                particle.update();
                particle.draw();
                return particle.life > 0 && particle.y > -50;
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    // ===== CURSOR TRAIL =====
    setupCursorTrail() {
        const trail = document.getElementById('cursor-trail');
        if (!trail) return;
        
        let mouseX = 0;
        let mouseY = 0;
        let trailX = 0;
        let trailY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            trail.style.opacity = '1';
            trail.style.transform = 'scale(1)';
        });
        
        document.addEventListener('mouseleave', () => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0)';
        });
        
        // Smooth trail animation
        const animateTrail = () => {
            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;
            
            trail.style.left = trailX - 10 + 'px';
            trail.style.top = trailY - 10 + 'px';
            
            requestAnimationFrame(animateTrail);
        };
        
        animateTrail();
    }

    // ===== COUNTER ANIMATIONS =====
    setupCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseFloat(element.dataset.count);
        const duration = 2000;
        const start = performance.now();
        const startValue = 0;
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = startValue + (target - startValue) * easeOutQuart;
            
            // Format number
            if (target > 1000) {
                element.textContent = this.formatNumber(current);
            } else {
                element.textContent = current.toFixed(1);
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = this.formatNumber(target);
            }
        };
        
        requestAnimationFrame(animate);
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return Math.round(num).toString();
    }

    // ===== SCROLL EFFECTS =====
    setupScrollEffects() {
        // Parallax effect
        this.setupParallax();
        
        // Scroll progress indicator
        this.setupScrollProgress();
        
        // Reveal animations
        this.setupRevealAnimations();
        
        // Background color changes
        this.setupScrollColorChanges();
    }

    setupParallax() {
        const parallaxElements = document.querySelectorAll('.floating-element');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + index * 0.2;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, { passive: true });
    }

    setupScrollProgress() {
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #0ea5e9, #22c55e, #f59e0b);
            z-index: 10001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrollPercent + '%';
        }, { passive: true });
    }

    setupRevealAnimations() {
        const revealElements = document.querySelectorAll('.card-hover');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
            observer.observe(element);
        });
    }

    setupScrollColorChanges() {
        const sections = document.querySelectorAll('section');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY + window.innerHeight / 2;
            
            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    document.body.setAttribute('data-section', index);
                }
            });
        }, { passive: true });
    }

    // ===== ANIMATIONS =====
    setupAnimations() {
        // Initialize all animations
        this.setupHoverEffects();
        this.setupClickEffects();
        this.setupLoadingAnimations();
    }

    setupHoverEffects() {
        // Card tilt effect
        const cards = document.querySelectorAll('.feature-card, .testimonial-card, .stat-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.applyTiltEffect(e.target);
            });
            
            card.addEventListener('mousemove', (e) => {
                this.updateTiltEffect(e, e.currentTarget);
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.removeTiltEffect(e.target);
            });
        });
    }

    applyTiltEffect(element) {
        element.style.transition = 'transform 0.1s ease';
    }

    updateTiltEffect(e, element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);
        
        const rotateX = deltaY * 10;
        const rotateY = deltaX * 10;
        
        element.style.transform = `
            perspective(1000px) 
            rotateX(${-rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateZ(20px)
        `;
    }

    removeTiltEffect(element) {
        element.style.transition = 'transform 0.3s ease';
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    }

    setupClickEffects() {
        // Add click ripple to all interactive elements
        const interactiveElements = document.querySelectorAll('.btn, .feature-card, .nav-link');
        
        interactiveElements.forEach(element => {
            element.addEventListener('click', (e) => {
                if (!element.classList.contains('btn')) {
                    this.createClickEffect(e, element);
                }
            });
        });
    }

    createClickEffect(event, element) {
        const effect = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        effect.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: clickEffect 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(effect);
        
        setTimeout(() => effect.remove(), 600);
    }

    // ===== PERFORMANCE OPTIMIZATION =====
    optimizePerformance() {
        // Lazy load images
        this.setupLazyLoading();
        
        // Throttle resize events
        this.setupThrottledResize();
        
        // Optimize scroll events
        this.setupOptimizedScrolling();
        
        // Preload critical resources
        this.preloadResources();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    setupThrottledResize() {
        let resizeTimer;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

    handleResize() {
        // Recalculate animations and positions
        const canvas = document.getElementById('particles-canvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        // Trigger custom resize event
        window.dispatchEvent(new CustomEvent('optimizedResize'));
    }

    setupOptimizedScrolling() {
        let scrollTimer;
        let isScrolling = false;
        
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                requestAnimationFrame(() => {
                    this.handleOptimizedScroll();
                    isScrolling = false;
                });
                isScrolling = true;
            }
        }, { passive: true });
    }

    handleOptimizedScroll() {
        // Only run essential scroll effects here
        const scrollY = window.scrollY;
        
        // Update progress bar
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            const scrollPercent = (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrollPercent + '%';
        }
    }

    preloadResources() {
        const criticalImages = [
            'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // ===== MAIN ANIMATIONS START =====
    startMainAnimations() {
        // Stagger animation for cards
        const cards = document.querySelectorAll('.feature-card, .testimonial-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
        // Start background animations
        this.startBackgroundAnimations();
    }

    startBackgroundAnimations() {
        const layers = document.querySelectorAll('.bg-layer');
        layers.forEach((layer, index) => {
            layer.style.animationDelay = index * 2 + 's';
        });
    }

    // ===== RESIZE HANDLER =====
    setupResizeHandler() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResponsiveChanges();
            }, 100);
        });
    }

    handleResponsiveChanges() {
        const isMobile = window.innerWidth < 768;
        const navbar = document.getElementById('navbar');
        
        // Adjust navbar for mobile
        if (isMobile) {
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backdropFilter = 'blur(20px)';
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                document.getElementById('mobileMenuBtn').click();
            }
        }
    }

    // ===== UTILITY FUNCTIONS =====
    
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Get random number in range
    random(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // ===== DJANGO INTEGRATION HELPERS =====
    
    // Get CSRF token for Django
    getCSRFToken() {
        const token = document.querySelector('[name=csrfmiddlewaretoken]');
        return token ? token.value : '';
    }

    // Handle Django form errors
    handleDjangoFormErrors(errors, form) {
        Object.keys(errors).forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                this.showFieldError(field, errors[fieldName][0]);
            }
        });
    }

    // Django AJAX helper
    async djangoAjax(url, data, method = 'POST') {
        const formData = new FormData();
        
        // Add CSRF token
        formData.append('csrfmiddlewaretoken', this.getCSRFToken());
        
        // Add data
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        
        try {
            const response = await fetch(url, {
                method: method,
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                }
            });
            
            return await response.json();
        } catch (error) {
            console.error('AJAX Error:', error);
            throw error;
        }
    }

    // ===== PUBLIC API =====
    
    // Method to manually trigger animations
    triggerAnimation(element, animationType = 'fadeInUp') {
        element.style.animation = `${animationType} 0.6s ease forwards`;
    }

    // Method to show custom notifications
    notify(message, type = 'info', duration = 5000) {
        this.showNotification(message, type);
    }

    // Method to validate forms programmatically
    validateFormById(formId) {
        const form = document.getElementById(formId);
        return form ? this.validateForm(form) : false;
    }
}

// ===== GLOBAL FUNCTIONS FOR DJANGO TEMPLATES =====

// Initialize the application
let collegeMatchApp;

function initCollegeMatch() {
    collegeMatchApp = new CollegeMatch();
    console.log('🎓 CollegeMatch Advanced Frontend Initialized!');
    console.log('🚀 Ready for Django backend integration');
}

// Django template helpers
function showNotification(message, type = 'info') {
    if (collegeMatchApp) {
        collegeMatchApp.notify(message, type);
    }
}

function validateForm(formId) {
    if (collegeMatchApp) {
        return collegeMatchApp.validateFormById(formId);
    }
    return false;
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCollegeMatch);
} else {
    initCollegeMatch();
}

// ===== ADDITIONAL CSS ANIMATIONS (Inject into head) =====
const additionalStyles = `
    <style>
        @keyframes clickEffect {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
        
        /* High contrast mode */
        @media (prefers-contrast: high) {
            :root {
                --text-primary: #ffffff;
                --text-secondary: #e5e5e5;
                --border-primary: rgba(255, 255, 255, 0.3);
            }
        }
        
        /* Dark mode preferences */
        @media (prefers-color-scheme: dark) {
            :root {
                --bg-primary: #0a0f1c;
                --bg-secondary: #111827;
            }
        }
    </style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // You can send errors to your Django backend for logging
    // sendErrorToDjango(e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise Rejection:', e.reason);
    // Handle promise rejections
});

// ===== EXPORT FOR MODULE USAGE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CollegeMatch;
}