// ===================================
// Contact Form Validation & Submission
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
   
    if (!contactForm) return;
   
    // Form validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            messages: {
                required: 'Name is required',
                minLength: 'Name must be at least 2 characters',
                pattern: 'Name can only contain letters and spaces'
            }
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            messages: {
                required: 'Email is required',
                pattern: 'Please enter a valid email address'
            }
        },
        subject: {
            required: true,
            minLength: 3,
            messages: {
                required: 'Subject is required',
                minLength: 'Subject must be at least 3 characters'
            }
        },
        message: {
            required: true,
            minLength: 10,
            messages: {
                required: 'Message is required',
                minLength: 'Message must be at least 10 characters'
            }
        }
    };
   
    // Get all form fields
    const fields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };
   
    const formStatus = document.getElementById('form-status');
   
    // Validate single field
    const validateField = (fieldName, value) => {
        const rules = validationRules[fieldName];
       
        // Check required
        if (rules.required && !value.trim()) {
            return { valid: false, message: rules.messages.required };
        }
       
        // Check minimum length
        if (rules.minLength && value.trim().length < rules.minLength) {
            return { valid: false, message: rules.messages.minLength };
        }
       
        // Check pattern
        if (rules.pattern && !rules.pattern.test(value.trim())) {
            return { valid: false, message: rules.messages.pattern };
        }
       
        return { valid: true, message: '' };
    };
   
    // Show error for a field
    const showError = (fieldName, message) => {
        const field = fields[fieldName];
        const formGroup = field.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
       
        formGroup.classList.add('error');
        errorMessage.textContent = message;
        field.setAttribute('aria-invalid', 'true');
    };
   
    // Clear error for a field
    const clearError = (fieldName) => {
        const field = fields[fieldName];
        const formGroup = field.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
       
        formGroup.classList.remove('error');
        errorMessage.textContent = '';
        field.removeAttribute('aria-invalid');
    };
   
    // Validate all fields
    const validateForm = () => {
        let isValid = true;
       
        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            const result = validateField(fieldName, field.value);
           
            if (!result.valid) {
                showError(fieldName, result.message);
                isValid = false;
            } else {
                clearError(fieldName);
            }
        });
       
        return isValid;
    };
   
    // Real-time validation on blur
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
       
        field.addEventListener('blur', () => {
            const result = validateField(fieldName, field.value);
           
            if (!result.valid) {
                showError(fieldName, result.message);
            } else {
                clearError(fieldName);
            }
        });
       
        // Clear error on input
        field.addEventListener('input', () => {
            const formGroup = field.parentElement;
            if (formGroup.classList.contains('error')) {
                const result = validateField(fieldName, field.value);
                if (result.valid) {
                    clearError(fieldName);
                }
            }
        });
    });
   
    // Show form status message
    const showFormStatus = (type, message) => {
        formStatus.className = `form-status ${type}`;
        formStatus.textContent = message;
        formStatus.style.display = 'block';
       
        // Auto-hide after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    };
   
    // Handle form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
       
        // Validate form
        if (!validateForm()) {
            showFormStatus('error', 'Please fix the errors above before submitting.');
            return;
        }
       
        // Get form data
        const formData = {
            name: fields.name.value.trim(),
            email: fields.email.value.trim(),
            subject: fields.subject.value.trim(),
            message: fields.message.value.trim()
        };
       
        // Disable submit button
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
       
        try {
            // Simulate API call (replace with actual API endpoint)
            await simulateFormSubmission(formData);
           
            // Success
            showFormStatus('success', 'Thank you! Your message has been sent successfully.');
            contactForm.reset();
           
            // Log to console (for demo purposes)
            console.log('Form submitted with data:', formData);
           
        } catch (error) {
            // Error
            showFormStatus('error', 'Oops! Something went wrong. Please try again later.');
            console.error('Form submission error:', error);
           
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
   
    // Simulate form submission (replace with actual API call)
    const simulateFormSubmission = (data) => {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve({ success: true, message: 'Message sent successfully' });
                } else {
                    reject(new Error('Network error'));
                }
            }, 1500);
        });
    };
   
    // ===================================
    // Example: Actual form submission using Formspree or similar service
    // ===================================
    /*
    const submitToFormspree = async (data) => {
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
       
        if (!response.ok) {
            throw new Error('Form submission failed');
        }
       
        return await response.json();
    };
    */
   
    // ===================================
    // Character counter for message field (optional enhancement)
    // ===================================
    const messageField = fields.message;
    const maxLength = 1000;
   
    const createCharCounter = () => {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.875rem;
            color: var(--text-light);
            margin-top: 0.25rem;
        `;
        messageField.parentElement.appendChild(counter);
       
        const updateCounter = () => {
            const length = messageField.value.length;
            counter.textContent = `${length} / ${maxLength} characters`;
           
            if (length > maxLength * 0.9) {
                counter.style.color = '#ef4444';
            } else {
                counter.style.color = 'var(--text-light)';
            }
        };
       
        messageField.addEventListener('input', updateCounter);
        messageField.setAttribute('maxlength', maxLength);
        updateCounter();
    };
   
    createCharCounter();
});

// ===================================
// Prevent spam with simple rate limiting
// ===================================
const RateLimiter = {
    submissions: [],
    maxSubmissions: 3,
    timeWindow: 60000, // 1 minute
   
    canSubmit() {
        const now = Date.now();
        // Remove old submissions outside time window
        this.submissions = this.submissions.filter(time => now - time < this.timeWindow);
       
        if (this.submissions.length >= this.maxSubmissions) {
            return false;
        }
       
        this.submissions.push(now);
        return true;
    },
   
    getRemainingTime() {
        if (this.submissions.length === 0) return 0;
        const oldestSubmission = Math.min(...this.submissions);
        const timePassed = Date.now() - oldestSubmission;
        return Math.max(0, this.timeWindow - timePassed);
    }
};

// Export for use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RateLimiter };
}
