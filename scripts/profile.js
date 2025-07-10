function toggleEdit() {
  const viewMode = document.getElementById('viewMode');
  const editMode = document.getElementById('editMode');
  const editBtn = document.querySelector('.edit-btn');
  
  if (editMode.classList.contains('active')) {
      editMode.classList.remove('active');
      viewMode.classList.remove('editing');
      editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
  } else {
      editMode.classList.add('active');
      viewMode.classList.add('editing');
      editBtn.innerHTML = '<i class="fas fa-times"></i> Cancel';
  }
}

function saveProfile() {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const primaryPhone = document.getElementById('primaryPhone').value;
  const secondaryPhone = document.getElementById('secondaryPhone').value;
  const gender = document.getElementById('gender').value;
  const address = document.getElementById('address').value;

  
  const profileDataElements = document.querySelectorAll('.profile-data');
  profileDataElements[0].textContent = firstName;
  profileDataElements[1].textContent = lastName;
  profileDataElements[2].textContent = email;
  profileDataElements[3].textContent = primaryPhone;
  profileDataElements[4].textContent = secondaryPhone;
  profileDataElements[5].textContent = gender;
  profileDataElements[6].textContent = address;

  document.querySelector('.profile-name h2').innerHTML = `
      ${firstName} ${lastName}
      <span class="verified-badge">
          <i class="fas fa-check"></i>
          Verified
      </span>
  `;

  alert('Profile updated successfully!');
  
  toggleEdit();
}

document.addEventListener('DOMContentLoaded', function() {
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
      item.addEventListener('click', function() {
          menuItems.forEach(i => i.classList.remove('active'));
          this.classList.add('active');
      });
  });
});

// Add loading animation
window.addEventListener('load', function() {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach((element, index) => {
      setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
      }, index * 100);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Get the specific dark mode toggle button
  const themeIcon = document.getElementById('theme-icon');
  const changeColorButton = document.getElementById('change-color-theme-button');
  const themeButton = document.querySelector('.theme-toggle');
  const body = document.body;

  // Moon icon SVG (for light theme)
  const moonIconSVG = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
  
  const sunIconSVG = `<circle cx="12" cy="12" r="5"></circle>
                      <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>`;

  // Initialize theme
  function initializeTheme() {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme) {
          if (savedTheme === 'light') {
              setLightTheme();
          } else {
              setDarkTheme();
          }
      } else if (prefersDark) {
          setDarkTheme();
      } else {
          setLightTheme();
      }
  }

  // Set light theme
  function setLightTheme() {
      body.classList.add('light-theme');
      themeIcon.innerHTML = moonIconSVG;
      themeButton.setAttribute('data-tooltip', 'Dark Mode');
      localStorage.setItem('theme', 'light');
  }

  // Set dark theme
  function setDarkTheme() {
      body.classList.remove('light-theme');
      themeIcon.innerHTML = sunIconSVG;
      themeButton.setAttribute('data-tooltip', 'Light Mode');
      localStorage.setItem('theme', 'dark');
  }

  function toggleTheme() {
      const isLightTheme = body.classList.contains('light-theme');
     
      themeButton.style.transform = 'scale(0.95)';
      setTimeout(() => {
          themeButton.style.transform = 'scale(1)';
      }, 150);
      
      if (isLightTheme) {
          setDarkTheme();
      } else {
          setLightTheme();
      }
  }

  if(changeColorButton){
      changeColorButton.addEventListener('click', () => {
          console.log("I am changing the color");
          toggleTheme();
      });
  }
  

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
          if (e.matches) {
              setDarkTheme();
          } else {
              setLightTheme();
          }
      }
  });

  initializeTheme();

  document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
          e.preventDefault();
          toggleTheme();
      }
  }); 
})