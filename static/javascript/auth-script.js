// ===== AUTHENTICATION SCRIPTS =====

class AuthManager {
    constructor() {
        this.init();
        this.setupPasswordStrength();
        this.setupFormValidation();
        this.setupSocialAuth();
        this.setupPasswordToggle();
        this.setupFormAnimations();
    }

    init() {
        // Initialize auth-specific features
        this.currentForm = document.querySelector('.auth-form');
        this.isLogin = window.location.pathname.includes('login');
        this.isRegister = window.location.pathname.includes('register');
        
        // Setup form-specific features
        if (this.isRegister) {
            this.setupRegistrationFeatures();
        }
        
        if (this.isLogin) {
            this.setupLoginFeatures();
        }

        console.log('🔐 Auth Manager Initialized!');
    }

    // ===== PASSWORD STRENGTH CHECKER =====
    setupPasswordStrength() {
        const passwordInput = document.getElementById('password');
        const strengthIndicator = document.getElementById('passwordStrength');
        
        if (!passwordInput || !strengthIndicator) return;

        passwordInput.addEventListener('input', (e) => {
            this.checkPasswordStrength(e.target.value, strengthIndicator);
        });
    }

    checkPasswordStrength(password, indicator) {
        const strength = this.calculatePasswordStrength(password);
        const strengthFill = indicator.querySelector('.strength-fill');
        const strengthText = indicator.querySelector('.strength-text');
        
        // Remove previous classes
        indicator.className = 'password-strength';
        
        if (password.length === 0) {
            strengthFill.style.width = '0%';
            strengthText.textContent = 'Password strength';
            return;
        }

        // Apply strength class and update UI
        switch (strength.level) {
            case 'weak':
                indicator.classList.add('weak');
                strengthText.textContent = 'Weak password';
                strengthText.style.color = '#ef4444';
                break;
            case 'medium':
                indicator.classList.add('medium');
                strengthText.textContent = 'Medium password';
                strengthText.style.color = '#f59e0b';
                break;
            case 'good':
                indicator.classList.add('good');
                strengthText.textContent = 'Good password';
                strengthText.style.color = '#10b981';
                break;
            case 'strong':
                indicator.classList.add('strong');
                strengthText.textContent = 'Strong password';
                strengthText.style.color = '#22c55e';
                break;
        }

        // Show strength tips
        this.showPasswordTips(strength.feedback, indicator);
    }

    calculatePasswordStrength(password) {
        let score = 0;
        const feedback = [];

        // Length check
        if (password.length >= 8) score += 25;
        else feedback.push('Use at least 8 characters');

        // Uppercase check
        if (/[A-Z]/.test(password)) score += 25;
        else feedback.push('Include uppercase letters');

        // Lowercase check
        if (/[a-z]/.test(password)) score += 25;
        else feedback.push('Include lowercase letters');

        // Number check
        if (/\d/.test(password)) score += 15;
        else feedback.push('Include numbers');

        // Special character check
        if (/[^A-Za-z0-9]/.test(password)) score += 10;
        else feedback.push('Include special characters');

        // Determine strength level
        let level;
        if (score < 30) level = 'weak';
        else if (score < 60) level = 'medium';
        else if (score < 90) level = 'good';
        else level = 'strong';

        return { score, level, feedback };
    }

    showPasswordTips(feedback, indicator) {
        // Remove existing tips
        const existingTips = indicator.querySelector('.password-tips');
        if (existingTips) existingTips.remove();

        if (feedback.length === 0) return;

        const tips = document.createElement('div');
        tips.className = 'password-tips';
        tips.style.cssText = `
            margin-top: 0.5rem;
            padding: 0.75rem;
            background: var(--bg-glass);
            border: 1px solid var(--border-secondary);
            border-radius: var(--radius-sm);
            font-size: 0.75rem;
        `;

        const tipsList = document.createElement('ul');
        tipsList.style.cssText = `
            margin: 0;
            padding-left: 1rem;
            color: var(--text-muted);
        `;

        feedback.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            li.style.marginBottom = '0.25rem';
            tipsList.appendChild(li);
        });

        tips.appendChild(tipsList);
        indicator.appendChild(tips);
    }

    // ===== FORM VALIDATION =====
    setupFormValidation() {
        if (!this.currentForm) return;

        const inputs = this.currentForm.querySelectorAll('input, select');
        
        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
                
                // Special handling for password confirmation
                if (input.name === 'confirm_password') {
                    this.validatePasswordConfirmation(input);
                }
            });
        });

        // REMOVE ALL FORM SUBMISSION HANDLING TO LET DJANGO HANDLE IT
        // this.currentForm.addEventListener('submit', (e) => { ... });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const fieldType = field.type;
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(field)} is required`;
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
        else if (fieldName === 'phone' && value) {
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid 10-digit mobile number';
            }
        }
        // Password validation
        else if (fieldName === 'password' && value) {
            if (value.length < 8) {
                isValid = false;
                errorMessage = 'Password must be at least 8 characters long';
            }
        }
        // Name validation
        else if ((fieldName === 'first_name' || fieldName === 'last_name') && value) {
            const nameRegex = /^[a-zA-Z\s]{2,30}$/;
            if (!nameRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid name (2-30 characters, letters only)';
            }
        }

        if (isValid) {
            this.showFieldSuccess(field);
        } else {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    validatePasswordConfirmation(field) {
        const password = document.getElementById('password');
        const confirmPassword = field;
        
        if (password && confirmPassword.value) {
            if (password.value !== confirmPassword.value) {
                this.showFieldError(confirmPassword, 'Passwords do not match');
                return false;
            } else {
                this.showFieldSuccess(confirmPassword);
                return true;
            }
        }
        return true;
    }

    getFieldLabel(field) {
        const label = field.parentNode.querySelector('.form-label');
        return label ? label.textContent.replace(/\s*\*/g, '').trim() : field.name;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('error');
        field.classList.remove('success');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }

    showFieldSuccess(field) {
        this.clearFieldError(field);
        field.classList.add('success');
        field.classList.remove('error');
    }

    clearFieldError(field) {
        field.classList.remove('error', 'success');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    // ===== PASSWORD TOGGLE =====
    setupPasswordToggle() {
        // Global function for template usage
        window.togglePassword = (inputId) => {
            const input = document.getElementById(inputId);
            const toggle = input.parentNode.querySelector('.password-toggle');
            const eyeIcon = toggle.querySelector('.eye-icon');
            
            if (input.type === 'password') {
                input.type = 'text';
                eyeIcon.innerHTML = `
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" stroke-width="2"/>
                    <path d="M1 1l22 22" stroke="currentColor" stroke-width="2"/>
                `;
            } else {
                input.type = 'password';
                eyeIcon.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                `;
            }
            
            // Add animation
            toggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                toggle.style.transform = 'scale(1)';
            }, 100);
        };
    }

    // ===== SOCIAL AUTHENTICATION =====
    setupSocialAuth() {
        const googleBtn = document.querySelector('.google-btn');
        const facebookBtn = document.querySelector('.facebook-btn');
        
        if (googleBtn) {
            googleBtn.addEventListener('click', () => this.handleSocialAuth('google'));
        }
        
        if (facebookBtn) {
            facebookBtn.addEventListener('click', () => this.handleSocialAuth('facebook'));
        }
    }

    handleSocialAuth(provider) {
        // Show loading state
        const button = document.querySelector(`.${provider}-btn`);
        const originalText = button.innerHTML;
        
        button.innerHTML = `
            <div class="loading-spinner" style="width: 20px; height: 20px; border: 2px solid currentColor; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            Connecting...
        `;
        button.disabled = true;

        // Redirect to Django social auth endpoint
        setTimeout(() => {
            window.location.href = `/auth/${provider}/`;
        }, 1000);
    }

    // ===== REGISTRATION FEATURES =====
    setupRegistrationFeatures() {
        this.setupExamCategoryDependency();
        this.setupFormSections();
        this.setupProgressIndicator();
    }

    setupExamCategoryDependency() {
        const examSelect = document.getElementById('exam_type');
        const categorySelect = document.getElementById('category');
        
        if (!examSelect || !categorySelect) return;

        examSelect.addEventListener('change', (e) => {
            this.updateCategoryOptions(e.target.value, categorySelect);
        });
    }

    updateCategoryOptions(examType, categorySelect) {
        // Different exams may have different category availability
        const categoryOptions = {
            'JEE_MAIN': ['GENERAL', 'OBC', 'SC', 'ST', 'EWS'],
            'JEE_ADVANCED': ['GENERAL', 'OBC', 'SC', 'ST'],
            'NEET': ['GENERAL', 'OBC', 'SC', 'ST', 'EWS'],
            'BITSAT': ['GENERAL'],
            'MHT_CET': ['GENERAL', 'OBC', 'SC', 'ST', 'EWS'],
            'KCET': ['GENERAL', 'OBC', 'SC', 'ST'],
            'EAMCET': ['GENERAL', 'OBC', 'SC', 'ST'],
            'OTHER': ['GENERAL', 'OBC', 'SC', 'ST', 'EWS']
        };

        const availableCategories = categoryOptions[examType] || categoryOptions['OTHER'];
        const currentOptions = Array.from(categorySelect.options).slice(1); // Skip first empty option
        
        // Show/hide options based on exam type
        currentOptions.forEach(option => {
            if (availableCategories.includes(option.value)) {
                option.style.display = 'block';
                option.disabled = false;
            } else {
                option.style.display = 'none';
                option.disabled = true;
                if (option.selected) {
                    categorySelect.selectedIndex = 0;
                }
            }
        });
    }

    setupFormSections() {
        const sections = document.querySelectorAll('.form-section');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                section.style.transition = 'all 0.6s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, (index + 2) * 200);
        });
    }

    setupProgressIndicator() {
        // Create progress indicator
        const progressContainer = document.createElement('div');
        progressContainer.className = 'form-progress';
        progressContainer.style.cssText = `
            display: flex;
            justify-content: center;
            margin-bottom: 2rem;
            gap: 1rem;
        `;

        const steps = ['Personal', 'Academic', 'Complete'];
        steps.forEach((step, index) => {
            const stepEl = document.createElement('div');
            stepEl.className = `progress-step ${index === 0 ? 'active' : ''}`;
            stepEl.style.cssText = `
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                color: var(--text-muted);
                font-size: 0.75rem;
            `;
            
            stepEl.innerHTML = `
                <div style="
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: var(--bg-tertiary);
                    border: 2px solid var(--border-primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    transition: all 0.3s ease;
                ">${index + 1}</div>
                <span>${step}</span>
            `;
            
            progressContainer.appendChild(stepEl);
        });

        const authHeader = document.querySelector('.auth-header');
        if (authHeader) {
            authHeader.appendChild(progressContainer);
        }

        // Update progress based on form completion
        this.updateFormProgress();
    }

    updateFormProgress() {
        const personalFields = ['first_name', 'last_name', 'email', 'phone'];
        const academicFields = ['exam_type', 'category'];
        
        const checkProgress = () => {
            const personalComplete = personalFields.every(field => {
                const input = document.querySelector(`[name="${field}"]`);
                return input && input.value.trim() !== '';
            });
            
            const academicComplete = academicFields.every(field => {
                const input = document.querySelector(`[name="${field}"]`);
                return input && input.value.trim() !== '';
            });
            
            const progressSteps = document.querySelectorAll('.progress-step');
            
            // Update step states
            progressSteps[0].classList.toggle('active', true);
            progressSteps[0].classList.toggle('complete', personalComplete);
            
            progressSteps[1].classList.toggle('active', personalComplete);
            progressSteps[1].classList.toggle('complete', academicComplete);
            
            progressSteps[2].classList.toggle('active', personalComplete && academicComplete);
        };

        // Listen for field changes
        [...personalFields, ...academicFields].forEach(fieldName => {
            const field = document.querySelector(`[name="${fieldName}"]`);
            if (field) {
                field.addEventListener('input', checkProgress);
                field.addEventListener('change', checkProgress);
            }
        });
    }

    // ===== LOGIN FEATURES =====
    setupLoginFeatures() {
        this.setupRememberMe();
        this.setupForgotPassword();
        this.setupLoginAnimations();
    }

    setupRememberMe() {
        const rememberCheckbox = document.getElementById('remember_me');
        if (rememberCheckbox) {
            // Load saved email if remember me was checked
            const savedEmail = localStorage.getItem('collegematch_saved_email');
            if (savedEmail) {
                const emailInput = document.getElementById('email');
                if (emailInput) {
                    emailInput.value = savedEmail;
                    rememberCheckbox.checked = true;
                }
            }
            
            // Save/remove email based on checkbox
            this.currentForm.addEventListener('submit', () => {
                const emailInput = document.getElementById('email');
                if (rememberCheckbox.checked && emailInput) {
                    localStorage.setItem('collegematch_saved_email', emailInput.value);
                } else {
                    localStorage.removeItem('collegematch_saved_email');
                }
            });
        }
    }

    setupForgotPassword() {
        const forgotForm = document.getElementById('forgotPasswordForm');
        if (!forgotForm) return;

        forgotForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('forgot_email');
            const email = emailInput.value.trim();
            
            if (!email) {
                this.showNotification('Please enter your email address', 'error');
                return;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                this.showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = forgotForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = `
                <div class="loading-spinner" style="width: 16px; height: 16px; border: 2px solid currentColor; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 0.5rem;"></div>
                Sending...
            `;
            submitBtn.disabled = true;
            
            try {
                const response = await fetch('/auth/password-reset/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRFToken': this.getCSRFToken()
                    },
                    body: JSON.stringify({ email })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    this.showNotification('Password reset link sent to your email!', 'success');
                    setTimeout(() => {
                        window.hideForgotPassword();
                    }, 2000);
                } else {
                    this.showNotification(data.error || 'Failed to send reset link', 'error');
                }
            } catch (error) {
                this.showNotification('Network error occurred. Please try again.', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    setupLoginAnimations() {
        // Stagger form field animations
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach((group, index) => {
            group.style.opacity = '0';
            group.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                group.style.transition = 'all 0.6s ease';
                group.style.opacity = '1';
                group.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    // ===== FORM ANIMATIONS =====
    setupFormAnimations() {
        this.animateFormElements();
        this.setupHoverEffects();
    }

    animateFormElements() {
        const elements = document.querySelectorAll('.form-input, .form-select, .btn');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 50 + 300);
        });
    }

    setupHoverEffects() {
        // Enhanced hover effects for form elements
        const inputs = document.querySelectorAll('.form-input, .form-select');
        
        inputs.forEach(input => {
            input.addEventListener('mouseenter', () => {
                if (!input.disabled && !input.classList.contains('error')) {
                    input.style.transform = 'translateY(-2px)';
                    input.style.boxShadow = '0 4px 20px rgba(14, 165, 233, 0.2)';
                }
            });
            
            input.addEventListener('mouseleave', () => {
                if (!input.matches(':focus')) {
                    input.style.transform = 'translateY(0)';
                    input.style.boxShadow = 'none';
                }
            });
        });

        // Social buttons hover effects
        const socialBtns = document.querySelectorAll('.btn-social');
        socialBtns.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // ===== UTILITY FUNCTIONS =====
    showNotification(message, type = 'info') {
        // Remove existing notification
        const existing = document.querySelector('.auth-notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `auth-notification ${type}`;
        
        const icons = {
            success: '<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2"/>',
            error: '<path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2"/>',
            warning: '<path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke="currentColor" stroke-width="2"/>',
            info: '<path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2"/>'
        };

        notification.innerHTML = `
            <div class="notification-content">
                <svg class="notification-icon" viewBox="0 0 24 24" fill="none">
                    ${icons[type]}
                </svg>
                <div class="notification-text">
                    <div class="notification-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
                    <div class="notification-message">${message}</div>
                </div>
            </div>
        `;

        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto remove
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 400);
        }, 5000);
    }

    getCSRFToken() {
        const token = document.querySelector('[name=csrfmiddlewaretoken]');
        return token ? token.value : '';
    }

    // ===== ACCESSIBILITY FEATURES =====
    setupAccessibility() {
        // Keyboard navigation for custom elements
        const checkboxes = document.querySelectorAll('.checkbox-label');
        checkboxes.forEach(label => {
            label.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const checkbox = label.querySelector('input[type="checkbox"]');
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change'));
                }
            });
        });

        // ARIA labels for password toggles
        const passwordToggles = document.querySelectorAll('.password-toggle');
        passwordToggles.forEach(toggle => {
            toggle.setAttribute('aria-label', 'Toggle password visibility');
            toggle.setAttribute('role', 'button');
        });

        // Form validation announcements for screen readers
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.cssText = 'position: absolute; left: -9999px; width: 1px; height: 1px;';
        document.body.appendChild(liveRegion);

        // Announce validation errors
        this.liveRegion = liveRegion;
    }

    announceToScreenReader(message) {
        if (this.liveRegion) {
            this.liveRegion.textContent = message;
            setTimeout(() => {
                this.liveRegion.textContent = '';
            }, 1000);
        }
    }
}

// ===== INITIALIZATION =====
let authManager;

function initAuthManager() {
    authManager = new AuthManager();
    authManager.setupAccessibility();
    
    // Global functions for template usage
    window.authManager = authManager;
    
    console.log('🔐 Authentication system initialized!');
    console.log('🚀 Django integration ready');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthManager);
} else {
    initAuthManager();
}

// ===== ADDITIONAL UTILITY FUNCTIONS =====

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation helper (Indian numbers)
function isValidPhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}

// Name validation helper
function isValidName(name) {
    const nameRegex = /^[a-zA-Z\s]{2,30}$/;
    return nameRegex.test(name.trim());
}

// Password strength checker
function getPasswordStrength(password) {
    if (authManager) {
        return authManager.calculatePasswordStrength(password);
    }
    return { score: 0, level: 'weak', feedback: [] };
}

// Form data extractor for Django
function getFormData(formId) {
    const form = document.getElementById(formId);
    if (!form) return null;
    
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return data;
}

// Show loading overlay
function showLoadingOverlay(message = 'Processing...') {
    const overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(10, 15, 28, 0.9);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    overlay.innerHTML = `
        <div style="text-align: center; color: var(--text-primary);">
            <div class="loading-spinner" style="
                width: 60px;
                height: 60px;
                border: 4px solid var(--border-primary);
                border-top: 4px solid var(--primary-500);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            "></div>
            <p style="font-size: 1.125rem; font-weight: 600;">${message}</p>
        </div>
    `;
    
    document.body.appendChild(overlay);
    setTimeout(() => overlay.style.opacity = '1', 10);
    
    return overlay;
}

// Hide loading overlay
function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 300);
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Auth Script Error:', e.error);
    
    // Show user-friendly error message
    if (authManager) {
        authManager.showNotification('Something went wrong. Please refresh the page and try again.', 'error');
    }
});

// ===== EXPORT FOR MODULE USAGE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthManager;
}
