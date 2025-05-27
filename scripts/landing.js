document.addEventListener('DOMContentLoaded', () => {

    function showOverlay1() {
        const overlayDiv1 = document.getElementById('overlay1');
        const computedStyle = window.getComputedStyle(overlayDiv1);
      
        if (computedStyle.display === 'none') {
          overlayDiv1.style.display = 'block';
        }
    }
    function hideOverlay1() {
        const overlayDiv1 = document.getElementById('overlay1');
        const computedStyle = window.getComputedStyle(overlayDiv1);
      
        if (computedStyle.display === 'block') {
          overlayDiv1.style.display = 'none';
        }
    }

    function showUserProfileDiv() {
        const userProfileDiv = document.getElementById('user_profile');
        const computedStyle = window.getComputedStyle(userProfileDiv);
      
        if (computedStyle.display === 'none') {
            userProfileDiv.style.display = 'block';
        }
    }
    function hideUserProfileDiv() {
        const userProfileDiv = document.getElementById('user_profile');
        const computedStyle = window.getComputedStyle(userProfileDiv);
      
        if (computedStyle.display === 'block') {
            userProfileDiv.style.display = 'none';
        }
    }

    const showUserProfileButton = document.getElementById('user_profile_icon');
    showUserProfileButton.addEventListener('click', () => {
        showOverlay1();
        showUserProfileDiv();
    })

    
})