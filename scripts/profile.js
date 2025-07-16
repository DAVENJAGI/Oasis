
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

  //HIDE AND SHOW EDIT USER PROFILE
  const editUserProfileBtn = document.getElementById('edit-usr-profile-btn');
  editUserProfileBtn.addEventListener('click', () => {
    toggleEdit();
  })

  const closeEditUserProfileBtn = document.getElementById('close-edit-usr-profile-btn');
  closeEditUserProfileBtn.addEventListener('click', () => {
    toggleEdit();
  })

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

  //SAVE USER INFO UPDATE TO DATABASE
  const saveUserProfileInfoBtn = document.getElementById('save-usr-profile-info-btn');
  saveUserProfileInfoBtn.addEventListener('click', () => {
      saveProfile();
  })

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
})

document.addEventListener('DOMContentLoaded', () => {
  const userId = sessionStorage.getItem('user_id');
  const customToken = sessionStorage.getItem('X-Custom-Token');

  // console.log(userId);
  

  function getAuthHeaders() {
    return {
      'X-Custom-Token': customToken
    };
  }

  const CONFIG = {
    API_BASE_URL: 'https://oasis-mjmw.onrender.com/api/v1',
    ENDPOINTS: {
      USER_DATA: (userId) => `/user/${userId}`
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

  //DEFAULT MAKE RESPONSE FUNC THAT CAN BE USED BY ALL FUNCTIONS
  /**
  * Takes a default API_BASE_URL and apends an endpoint to it
  * Adds a default option dict, with method GET as default, content type, and getAuthHeaders
  * finalOption is anything else that overwrites the default option
  * handles errors such as timeout, and non 2xx status headers
  */
  const makeRequest = async (endpoint, options = {}) => {
    const url = CONFIG.API_BASE_URL + endpoint;
    const defaultOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(), 
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
    
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorBody}`);
      }
      return await response.json();
    
      } catch (error) {
        if (error.name === 'AbortError') {
          console.error(`Request to ${url} timed out`);
          throw new Error('Request timed out');
        }
        console.error(`Request to ${url} failed:`, error.message);
        throw error;
      }
    };

    //FETCH USER
    async function fetchUser() {
      try {
          const userData = await makeRequest(CONFIG.ENDPOINTS.USER_DATA(userId), {
          headers: getAuthHeaders()
      });
      appendDataToUserDiv (userData);
      console.log("Me: ", userData);
      return userData;
      } catch (error) {
          console.error("Error fetching favorite listings:", error);
      }
    } fetchUser(userId);

    function appendDataToUserDiv (userData) {
      document.getElementById('user-first-name').textContent = userData.first_name;
      document.getElementById('user-last-name').textContent = userData.last_name;
      document.getElementById('user-email').textContent = userData.email;
      document.getElementById('user-pri-tel-no').textContent = userData.telephone_no;
      document.getElementById('user-sec-tel-no').textContent = userData.secondary_telephone_no;
      document.getElementById('user-gender').textContent = userData.sex;
      document.getElementById('user-address').textContent = userData.addres;
      document.querySelector(".side-pri-tel-no").textContent = userData.telephone_no;

      document.querySelector(".profile-name-div h2").textContent = `${userData.first_name} ${userData.last_name}`
      if(userData.is_verified === true) {
        document.querySelector(".verified-badge").style.display = "flex";
      }
    }
})