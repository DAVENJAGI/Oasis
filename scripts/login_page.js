document.addEventListener('DOMContentLoaded', () => {

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

})