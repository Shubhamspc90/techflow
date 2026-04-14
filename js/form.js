// Form Handling and Validation

class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    // Validate email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validate phone number
    isValidPhone(phone) {
        const phoneRegex = /^[0-9\-\+\(\)\s]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }

    // Validate text input
    isValidText(text, minLength = 2) {
        return text.trim().length >= minLength;
    }

    // Validate form fields
    validateForm() {
        const fields = this.form.querySelectorAll('input, textarea');
        let isValid = true;

        fields.forEach(field => {
            const errorMsg = field.parentElement.querySelector('.error-message');
            let fieldValid = true;
            let errorMessage = '';

            // Remove previous error styling
            field.classList.remove('input-error');
            if (errorMsg) errorMsg.remove();

            // Validate based on field type
            if (field.type === 'email') {
                if (!this.isValidEmail(field.value)) {
                    fieldValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
            } else if (field.type === 'tel') {
                if (field.value && !this.isValidPhone(field.value)) {
                    fieldValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
            } else if (field.tagName === 'TEXTAREA') {
                if (!this.isValidText(field.value, 10)) {
                    fieldValid = false;
                    errorMessage = 'Message must be at least 10 characters';
                }
            } else if (field.type === 'text') {
                if (!this.isValidText(field.value)) {
                    fieldValid = false;
                    errorMessage = `${field.name} is required`;
                }
            }

            // Show error if field is invalid
            if (!fieldValid) {
                isValid = false;
                field.classList.add('input-error');
                
                const errorElement = document.createElement('span');
                errorElement.className = 'error-message';
                errorElement.style.cssText = `
                    color: #e74c3c;
                    font-size: 0.85rem;
                    margin-top: 0.3rem;
                    display: block;
                `;
                errorElement.textContent = errorMessage;
                field.parentElement.appendChild(errorElement);
            }
        });

        return isValid;
    }

    // Handle form submission
    handleSubmit(e) {
        e.preventDefault();

        if (this.validateForm()) {
            // Form is valid - you can submit here
            const formData = new FormData(this.form);
            
            // Simulate form submission
            this.submitForm(formData);
        } else {
            showNotification('Please fix the errors in the form', 'error');
        }
    }

    // Submit form data
    submitForm(formData) {
        // Here you would typically send data to a server
        // For now, we'll just show a success message
        
        console.log('Form submitted with data:');
        for (let [key, value] of formData) {
            console.log(`${key}: ${value}`);
        }

        showNotification('Thank you! We will get back to you soon.', 'success');
        this.form.reset();
    }
}

// Add CSS for error styling
function addErrorStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .input-error {
            border-color: #e74c3c !important;
            background-color: #fadbd8 !important;
        }

        .input-error:focus {
            box-shadow: 0 0 8px rgba(231, 76, 60, 0.4) !important;
        }

        .error-message {
            animation: slideInLeft 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Initialize forms when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    addErrorStyles();
    
    // Initialize contact form if it exists
    if (document.getElementById('contactForm')) {
        new FormValidator('contactForm');
    }

    // Initialize any other forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        if (form.id && form.id !== 'contactForm') {
            new FormValidator(form.id);
        }
    });
});

// Real-time validation
document.addEventListener('input', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        const field = e.target;
        const errorMsg = field.parentElement.querySelector('.error-message');
        
        // Remove error styling while user is typing
        field.classList.remove('input-error');
        if (errorMsg) errorMsg.remove();
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormValidator;
}
