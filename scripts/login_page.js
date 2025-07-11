document.addEventListener('DOMContentLoaded', () => {

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

    //HANDLE LOGIN FUNCTION
    const loginButton = document.getElementById('user-login-button');
    loginButton.addEventListener('click', () => {
        handleLogin();
    })
    
    function handleLogin(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const button = document.querySelector('.login-button');
        button.textContent = 'Signing in...';
        button.disabled = true;
        
        setTimeout(() => {
            alert(`Login attempted with email: ${email}`);
            button.textContent = 'Sign in';
            button.disabled = false;
        }, 1500);
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
    
    const userName = "<span style='font-size: 1.5rem; color:#888;'>John...</span>";

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
                        element.innerHTML += text.substring(index, tagEnd + 1); // Add the full tag at once
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

        const greetingText = greetingsFunction(); 
        typeWriter(greetingText, titleElement, 60, () => {
            titleElement.innerHTML += userName;
        
            const t = setTimeout(() => {
                typeWriter(subText, subElement, 30);
            }, 500);
        
            window.typewriterTimeouts.push(t);
        });
        
    }

    function handleLargeScreens() {
        const subText1 = "Look no more. Discover properties around the globe's most desirable locations with our platform.";
       
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
        
        const titleText1 = greetingsFunction() + " John...<br>Finding Your Dream Getaway Home?";
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