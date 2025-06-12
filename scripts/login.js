document.addEventListener('DOMContentLoaded', () => {
    //SHOW AND HIDE LOADING DIV
    function showLoadingDiv() {
        const loadingDiv = document.getElementById('loading_div');
        const computedStyle = window.getComputedStyle(loadingDiv);
      
        if (computedStyle.display === 'none') {
            loadingDiv.style.display = 'flex';
        }
    }
    function hideLoadingDiv() {
        const loadingDiv = document.getElementById('loading_div');
        const computedStyle = window.getComputedStyle(loadingDiv);
      
        if (computedStyle.display === 'flex') {
            loadingDiv.style.display = 'none';
        }
    }
  
    /*
    const loginButtonButton = document.getElementById('enter_login_button');
    loginButtonButton.addEventListener('click', () => {
        showLoadingDiv();
    })
    */

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const loginButton = document.getElementById("enter_login_button");
    
    loginButton.addEventListener('click', (event) => {
        event.preventDefault();

        const emailValue = email.value;
        const passwordValue = password.value;

        if (!emailValue || !passwordValue) {
            alert("Please fill out all required fields!");
            return;
        }

        showLoadingDiv();

        setTimeout(() => {

            const loginData = {
                email: emailValue,
                password: passwordValue,
            };
            
            const jsonData = JSON.stringify(loginData);

            fetch("http://0.0.0.0:5000/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: jsonData,
            })
            .then(response => {
                console.log('Response headers:', [...response.headers.entries()]);
                const customToken = response.headers.get('X-Custom-Token');
                if (customToken) {
                    localStorage.setItem('X-Custom-Token', customToken);
                    console.log('X-Custom-Token stored:', customToken);
                } else {
                    console.log('X-Custom-Token not found in response');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data:', data);
                
                if (data.Message === 'Login sucessful') {
                    localStorage.setItem('id', data.user.id)
                    localStorage.setItem('profile_image', data.user.profile_image)
                    window.location.href = 'landing.html'; 
                } else if(data.Message === 'Login failed: User not found') {
                    email.style.border = '2px solid red';
                } else if(data.Message === 'Login failed: Incorrect password') {
                    password.style.border = '2px solid red';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred during login. Please try again.');
            });
        }, 5000);
    })
});