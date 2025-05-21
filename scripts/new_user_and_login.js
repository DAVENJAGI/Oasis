document.addEventListener('DOMContentLoaded', () => {
    //SHOW AND HIDE login OVERLAY
    function showLoginOverlay() {
        const overlayDiv = document.getElementById('login_overlay');
        const computedStyle = window.getComputedStyle(overlayDiv);
      
        if (computedStyle.display === 'none') {
          overlayDiv.style.display = 'block';
        }
    }
    function hideLoginOverlay() {
        const overlayDiv = document.getElementById('login_overlay');
        const computedStyle = window.getComputedStyle(overlayDiv);
      
        if (computedStyle.display === 'block') {
          overlayDiv.style.display = 'none';
        }
    }

    //SHOW AND HIDE LOGIN DIV
    function showLoginDiv() {
        const loginDiv = document.getElementById('login_div');
        const computedStyle = window.getComputedStyle(loginDiv);
      
        if (computedStyle.display === 'none') {
            loginDiv.style.display = 'flex';
        }
    }
    function hideLoginDiv() {
        const loginDiv = document.getElementById('login_div');
        const computedStyle = window.getComputedStyle(loginDiv);
      
        if (computedStyle.display === 'flex') {
            loginDiv.style.display = 'none';
        }
        hideLoadingDiv();
    }

    const loginButton = document.getElementById('login_button');
    loginButton.addEventListener('click', () => {
        showLoginOverlay();
        showLoginDiv();
    })

    const overlayButton = document.getElementById('login_overlay');
    overlayButton.addEventListener('click', () => {
        hideLoginOverlay();
        hideLoginDiv();
    })

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
    
    const loginButtonButton = document.getElementById('enter_login_button');
    loginButtonButton.addEventListener('click', () => {
        showLoadingDiv();
    })
})