document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('logoClick').addEventListener('click', () => {
        location.reload();
    })

    window.addEventListener('scroll', function () {
        const heroBlur = document.querySelector('.hero');
        
        if (window.scrollY > 50) {
          heroBlur.style.backdropFilter = "blur(80px)";
          heroBlur.style.webkitBackdropFilter = "blur(80px)";
          heroBlur.style.background = "var(--current-glass-bg)";
        } else {
          heroBlur.style.backdropFilter = "blur(0px)";
          heroBlur.style.webkitBackdropFilter = "blur(0px)";
          heroBlur.style.background = "";
        }
    })

    // Add some interactive floating elements
    document.addEventListener('mousemove', (e) => {
        const elements = document.querySelectorAll('.floating-element');
        elements.forEach((element, index) => {
            const speed = (index + 1) * 0.0001;
            const x = e.clientX * speed;
            const y = e.clientY * speed;
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });


    const searchContainer = document.getElementById('search-container');

    const theme = localStorage.getItem('theme');
    console.log('Theme:', theme);
    if (theme === 'light') {
      searchContainer.style.backgroundColor = 'white';
      searchContainer.style.border = "none";
      searchContainer.style.boxShadow = "none";
      searchContainer.style.backdropFilter = "none";
      
    }
      

    //SHOW AND HIDE PASSWORD
    const showHidePassword = document.getElementById('passwordToggle');
    showHidePassword.addEventListener('click', () => {
        togglePassword();
    })
    function togglePassword() {
        const passwordInput = document.getElementById('password');
        const eyeIcon = document.getElementById('passwordToggle');
        const path = eyeIcon.querySelector('path');
  
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          path.setAttribute(
            'd',
            'M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24'
          );
        } else {
          passwordInput.type = 'password';
          path.setAttribute(
            'd',
            'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'
          );
        }
    }

    const loginGoogleButton = document.getElementById('google-social-div');
    loginGoogleButton.addEventListener('click', () => {
        handleSocialLogin('google');
    })

    const loginFacebookButton = document.getElementById('facebook-social-div');
    loginFacebookButton.addEventListener('click', () => {
        handleSocialLogin('faceboook');
    })


    function handleSocialLogin(provider) {
        alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login clicked`);
    } 


    //HIDE AND SHOW LOGIN
    const seeLoginsBtn = document.getElementById('usr-login-button');
    const loginsPopup = document.getElementById('login-container');
    const closeLoginsBtn = document.getElementById('close-logins-popup');
    const overlay = createOverlay();
    
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'logins-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(8px);
            z-index: 1001;
            display: none;
            justify-content: center;
            align-items: center;
            padding: 20px;
            box-sizing: border-box;
            overflow-y: auto;
        `;
        document.body.appendChild(overlay);
        return overlay;
    }
    
    function showLoginsPopup() {
        overlay.style.display = 'flex';
        overlay.appendChild(loginsPopup);
        loginsPopup.style.display = 'block';
        document.body.style.overflow = 'hidden';
        loginsPopup.classList.add('popup-visible');
    }
    
    function hideLoginsPopup() {
        overlay.style.display = 'none';
        loginsPopup.style.display = 'none';
        document.body.style.overflow = '';
        loginsPopup.classList.remove('popup-visible');
    }
    
    if (seeLoginsBtn) {
        seeLoginsBtn.addEventListener('click', showLoginsPopup);
    }
    
    if (closeLoginsBtn) {
        closeLoginsBtn.addEventListener('click', hideLoginsPopup);
    }
    
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            hideLoginsPopup();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.style.display === 'flex') {
            hideLoginsPopup();
        }
    });
    loginsPopup.style.display = 'none';
    loginsPopup.style.transition = 'all 0.3s ease-out';


    //SCROLL TO TOP ON MOUSE CLICKING 
    document.querySelector('.scroll-indicator').addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
    });

    const scrollDiv = document.querySelector('.payment-scroll-div');
    if (!scrollDiv) return;

    const originalContent = scrollDiv.innerHTML;

    function handleResize() {
        const isSmallScreen = window.innerWidth < 768;
    
        if (isSmallScreen && !scrollDiv.dataset.duplicated) {
            scrollDiv.innerHTML += originalContent;
            scrollDiv.dataset.duplicated = "true";
        } else if (!isSmallScreen && scrollDiv.dataset.duplicated) {
            scrollDiv.innerHTML = originalContent;
            delete scrollDiv.dataset.duplicated;
        }
    }
    
    
    function handleSmallScreens() {
        const subText2 = "Finding your dream getaway house?";
            
        const titleElement = document.getElementById("typewriter-title");
        const subElement = document.getElementById("typewriter-subtext");
    
        if (window.typewriterTimeouts) {
            window.typewriterTimeouts.forEach(clearTimeout);
        }
        window.typewriterTimeouts = [];
    
        titleElement.innerHTML = "";
        subElement.innerHTML = "";
    
        function typeWriter(text, element, speed = 60, callback = null) {
            let index = 0;
            function type() {
                if (text.charAt(index) === "<") {
                    const tagEnd = text.indexOf(">", index);
                    if (tagEnd !== -1) {
                        element.innerHTML += text.substring(index, tagEnd + 1);
                        index = tagEnd + 1;
                    }
                } else {
                    element.innerHTML += text.charAt(index);
                    index++;
                }
        
                if (index < text.length) {
                    const t = setTimeout(type, speed);
                    window.typewriterTimeouts.push(t);
                } else if (callback) {
                    callback();
                }
            } type();
        }

        const greetingText = greetingsFunction() + "..."; 
        typeWriter(greetingText, titleElement, 60, () => {
            const t = setTimeout(() => {
                typeWriter(subText2, subElement, 30);
            }, 500);
        
            window.typewriterTimeouts.push(t);
        });
        
    }

    function handleLargeScreens() {
        const subText1 = "Discover properties around the globe's most desirable locations with our platform.";
       
        const titleElement = document.getElementById("typewriter-title");
        const subElement = document.getElementById("typewriter-subtext");
    
        if (window.typewriterTimeouts) {
            window.typewriterTimeouts.forEach(clearTimeout);
        }
        window.typewriterTimeouts = [];
    
        titleElement.innerHTML = "";
        subElement.innerHTML = "";
    
        function typeWriter(text, element, speed = 60, callback = null) {
            let index = 0;
            function type() {
                if (text.charAt(index) === "<") {
                    const tagEnd = text.indexOf(">", index);
                    if (tagEnd !== -1) {
                        element.innerHTML += text.substring(index, tagEnd + 1);
                        index = tagEnd + 1;
                    }
                } else {
                    element.innerHTML += text.charAt(index);
                    index++;
                }
        
                if (index < text.length) {
                    const t = setTimeout(type, speed);
                    window.typewriterTimeouts.push(t);
                } else if (callback) {
                    callback();
                }
            } type();
        }
        
        const titleText1 = greetingsFunction() + "...<br>Finding Your Dream Getaway Home? Look no more";
        typeWriter(titleText1, titleElement, 60, () => {
            const t = setTimeout(() => {
                typeWriter(subText1, subElement, 30);
            }, 500);
            window.typewriterTimeouts.push(t);
        });
        
    }

    let isLargeScreen = window.innerWidth > 760;
    
    if (!isLargeScreen) {
        handleSmallScreens();
    } else {
        handleLargeScreens();
    }

    window.addEventListener("resize", () => {
        const nowLarge = window.innerWidth > 760;
        const nowSmall = !nowLarge;

        if (nowSmall && isLargeScreen) {
            handleSmallScreens();
        }

        if (nowLarge && !isLargeScreen) {
            handleLargeScreens();
        }

        isLargeScreen = nowLarge;
    });

    function greetingsFunction () {
        const now = new Date();
        const hour = now.getHours();
    
        if (hour >= 5 && hour < 12) {
            return "Good morning";
        } else if (hour >= 12 && hour < 17) {
            return "Good afternoon ";
        } else if (hour >= 17 && hour < 21) {
            return "Good evening ";
        } else {
            return "Good evening ";
        }
    }

    window.addEventListener('resize', () => {
        handleResize();
    })

})


document.addEventListener('DOMContentLoaded', () => {
    //CONFIG VARIABE DECLARATION
    const CONFIG = {
        API_BASE_URL: 'https://oasis-mjmw.onrender.com/api/v1',
        ENDPOINTS: {
            LOGIN: '/user/login/'
        },
        MESSAGES: {
            LOGIN_SUCCESS: 'Login sucessful',
            USER_NOT_FOUND: 'Login failed: User not found',
            INCORRECT_PASSWORD: 'Login failed: Incorrect password'
        },
        TIMEOUTS: {
            REDIRECT_DELAY: 1000,
            NOTIFICATION_DURATION: 5000,
            API_TIMEOUT: 30000
        }
    };

    //UTILS TO CHECK THE PASSWORD LENGTH AND VALIDITY OF EMAIL AND IF USER IS ONLINE
    const Utils = {
        validateEmail: (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },

        validatePassword: (password) => {
            return password.length >= 6;
        },

        sanitizeInput: (input) => {
            return input.trim();
        },

        isOnline: () => {
            return navigator.onLine;
        },

        debounce: (func, wait) => {
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
    };

    //VARIABLE TO SHOW AND HANDLE THE NOTIFICATION IN THE LOGIN DIV, ie, ERROR LOGGING, INVALID PASS etc
    const UI = {
        showNotification: (message, type = 'info') => {
            const existingNotifications = document.querySelectorAll('.notification');
            existingNotifications.forEach(notif => notif.remove());

            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => notification.classList.add('show'), 100);

            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, CONFIG.TIMEOUTS.NOTIFICATION_DURATION);
        },

        showFieldError: (fieldId, message) => {
            const field = document.getElementById(fieldId);
            const errorDiv = document.getElementById(fieldId + 'Error');
            
            field.classList.add('error');
            field.classList.remove('success');
            errorDiv.textContent = message;
            errorDiv.classList.add('show');
        },

        clearFieldError: (fieldId) => {
            const field = document.getElementById(fieldId);
            const errorDiv = document.getElementById(fieldId + 'Error');
            
            field.classList.remove('error');
            errorDiv.classList.remove('show');
        },

        showFieldSuccess: (fieldId) => {
            const field = document.getElementById(fieldId);
            field.classList.add('success');
            field.classList.remove('error');
        },

        setLoadingState: (isLoading) => {
            const button = document.getElementById('user-login-button');
            const buttonText = button.querySelector('.button-text');
            const spinner = document.getElementById('loadingSpinner');
            
            if (isLoading) {
                button.disabled = true;
                buttonText.style.opacity = '0';
                spinner.style.display = 'block';
            } else {
                button.disabled = false;
                buttonText.style.opacity = '1';
                spinner.style.display = 'none';
            }
        },

        updateConnectionStatus: () => {
            const statusDiv = document.getElementById('connectionStatus');
            if (Utils.isOnline()) {
                statusDiv.classList.remove('offline');
            } else {
                statusDiv.classList.add('offline');
            }
        }
    };

    //API CALL TO THE /usr/login ENDPOINT
    const API = {
        makeRequest: async (endpoint, options = {}) => {
            const url = CONFIG.API_BASE_URL + endpoint;
            const defaultOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: CONFIG.TIMEOUTS.API_TIMEOUT
            };

            const finalOptions = { ...defaultOptions, ...options };

            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), finalOptions.timeout);

                const response = await fetch(url, {
                    ...finalOptions,
                    signal: controller.signal
                });

                clearTimeout(timeoutId);
                return response;
            } catch (error) {
                if (error.name === 'AbortError') {
                    throw new Error('Request timed out');
                }
                throw error;
            }
        },

        login: async (credentials) => {
            const response = await API.makeRequest(CONFIG.ENDPOINTS.LOGIN, {
                method: 'POST',
                body: JSON.stringify(credentials)
            });

            const customToken = response.headers.get('x-custom-token');
            if (customToken) {
                sessionStorage.setItem('X-Custom-Token', customToken);
            }

            const data = await response.json();
            return { response, data };
        }
    };

    const FormValidator = {
        validateField: (fieldId, value) => {
            UI.clearFieldError(fieldId);
            
            switch (fieldId) {
                case 'email':
                    if (!value) {
                        UI.showFieldError(fieldId, 'Email is required');
                        return false;
                    }
                    if (!Utils.validateEmail(value)) {
                        UI.showFieldError(fieldId, 'Please enter a valid email address');
                        return false;
                    }
                    UI.showFieldSuccess(fieldId);
                    return true;
                
                case 'password':
                    if (!value) {
                        UI.showFieldError(fieldId, 'Password is required');
                        return false;
                    }
                    if (!Utils.validatePassword(value)) {
                        UI.showFieldError(fieldId, 'Password must be at least 6 characters long');
                        return false;
                    }
                    UI.showFieldSuccess(fieldId);
                    return true;
                
                default:
                    return true;
            }
        },

        validateForm: (formData) => {
            const emailValid = FormValidator.validateField('email', formData.email);
            const passwordValid = FormValidator.validateField('password', formData.password);
            
            return emailValid && passwordValid;
        }
    };

    //HANDLES THE LOGIN, STORES THE DATA I WANT IN THE SESSION STORAGE, AND HANDLES ERROR MESSAGE
    const LoginHandler = {
        handleLogin: async (formData) => {
            try {
                if (!Utils.isOnline()) {
                    UI.showNotification('No internet connection. Please check your connection and try again.', 'error');
                    return;
                }

                UI.setLoadingState(true);

                const { response, data } = await API.login(formData);

                if (data.Message === CONFIG.MESSAGES.LOGIN_SUCCESS) {
                    // Store user data securely
                    sessionStorage.setItem('user_id', data.user.id);
                    sessionStorage.setItem('profile_image', data.user.profile_image);
                    
                    UI.showNotification('Login successful! Redirecting...', 'success');
                    
                    setTimeout(() => {
                        window.location.href = 'landing.html';
                    }, CONFIG.TIMEOUTS.REDIRECT_DELAY);
                } else {
                    LoginHandler.handleLoginError(data.Message);
                }
            } catch (error) {
                console.error('Login error:', error);
                
                if (error.message === 'Request timed out') {
                    UI.showNotification('Login request timed out. Please try again.', 'error');
                } else if (error.message.includes('Failed to fetch')) {
                    UI.showNotification('Network error. Please check your connection and try again.', 'error');
                } else {
                    UI.showNotification('An unexpected error occurred. Please try again.', 'error');
                }
            } finally {
                UI.setLoadingState(false);
            }
        },

        handleLoginError: (message) => {
            const passwordField = document.getElementById('password');
            
            switch (message) {
                case CONFIG.MESSAGES.USER_NOT_FOUND:
                    UI.showFieldError('email', 'No account found with this email address');
                    break;
                case CONFIG.MESSAGES.INCORRECT_PASSWORD:
                    UI.showFieldError('password', 'Incorrect password');
                    passwordField.value = '';
                    passwordField.focus();
                    break;
                default:
                    UI.showNotification('Login failed. Please try again.', 'error');
            }
        }
    };

    const form = document.getElementById('loginForm');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = {
            email: Utils.sanitizeInput(emailField.value),
            password: passwordField.value
        };
        if (FormValidator.validateForm(formData)) {
            await LoginHandler.handleLogin(formData);
        }
    });

    const debouncedValidation = Utils.debounce((fieldId, value) => {
        if (value) {
            FormValidator.validateField(fieldId, value);
        }
    }, 500);

    emailField.addEventListener('input', (e) => {
        UI.clearFieldError('email');
        debouncedValidation('email', Utils.sanitizeInput(e.target.value));
    });

    passwordField.addEventListener('input', (e) => {
        UI.clearFieldError('password');
        debouncedValidation('password', e.target.value);
    });

    window.addEventListener('online', UI.updateConnectionStatus);
    window.addEventListener('offline', UI.updateConnectionStatus);
    UI.updateConnectionStatus();

    emailField.focus();
})