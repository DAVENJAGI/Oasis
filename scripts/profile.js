
document.addEventListener('DOMContentLoaded', function() {
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
      item.addEventListener('click', function() {
          menuItems.forEach(i => i.classList.remove('active'));
          this.classList.add('active');
      });
  });

  const routeToLogin = document.getElementById('usr-login-button');
  if(routeToLogin) {
    routeToLogin.addEventListener('click', () => {
      sessionStorage.clear();
      window.location.href = 'index.html';
    })
  }

  const logoutBtn = document.getElementById('logoutItem');
  if(logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.clear();
      window.location.href = 'index.html';
    })
  }
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
      USER_DATA: (userId) => `/user/${userId}`,
      USER_RATING: (userId) => `/user/${userId}/ratings`,
      USER_BOOKINGS: (userId) => `/user/${userId}/bookings`,
      USER_REVIEWS: (userId) => `/user/${userId}/reviews`,
      USER_FAVORITES: (userId) => `/user/${userId}/favorites`
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

    async function initPage() {
      const loader = document.getElementById('pageLoader');
      loader.style.display = 'flex';

      let prog = 0;
        const interval = setInterval(() => {
          prog = Math.min(prog + 10, 90);
      }, 100);
      
      try {
        await fetchUser(userId); 
        clearInterval(interval);
  
        setTimeout(() => {
          loader.style.display = 'none';
        }, 300);
      } catch (err) {
        clearInterval(interval);
        loader.style.display = 'none';
        console.error('Failed to load item data:', err);
        alert('Failed to load item data.');
      }
  }
    
  initPage();
  
  //FETCH USER
    async function fetchUser() {
      try {
          const userData = await makeRequest(CONFIG.ENDPOINTS.USER_DATA(userId), {
          headers: getAuthHeaders()
      });
      appendDataToUserDiv (userData);
      fetchUserRating(userId);
      fetchUserBooking(userId);
      fetchUserReviews(userId);
      fetchUserFavorites(userId);
      console.log("Me ", userData);
      return userData;
      } catch (error) {
          console.error("Error fetching favorite listings:", error);
      }
    } 

    function appendDataToUserDiv (userData) {
      document.getElementById('user-first-name').textContent = userData.first_name;
      document.getElementById('user-last-name').textContent = userData.last_name;
      document.getElementById('user-email').textContent = userData.email;
      document.getElementById('user-pri-tel-no').textContent = userData.telephone_no;
      document.getElementById('user-sec-tel-no').textContent = userData.secondary_telephone_no;
      document.getElementById('user-gender').textContent = userData.sex || 'NULL';
      document.getElementById('user-address').textContent = userData.address;
      document.querySelector(".side-pri-tel-no").textContent = userData.telephone_no;

      document.querySelector(".profile-name-header").textContent = `${userData.first_name} ${userData.last_name}`;
      const nameChar = `${userData.first_name.charAt(0)}${userData.last_name.charAt(0)}`.toUpperCase()
      document.querySelector('.profile-avatar-header').textContent = nameChar;

      document.querySelector(".profile-name-div h2").textContent = `${userData.first_name} ${userData.last_name}`
      if(userData.is_verified === true) {
        document.querySelector(".verified-badge").style.display = "flex";
      }

      document.getElementById("firstName").value = userData.first_name;
      document.getElementById("lastName").value = userData.last_name;
      document.getElementById("email").textContent = userData.email;
      document.getElementById("primaryPhone").value = userData.telephone_no;
      document.getElementById("secondaryPhone").value = userData.secondary_telephone_no;
      document.getElementById("address").value = userData.address;
      document.getElementById("gender").value = userData.sex;
      if (userData.sex === "Female") {
        document.getElementById("female-select").style.display = "none";
      } else if (userData.sex === "Male") {
        document.getElementById('male-select').style.display = "none";
      } else {
        document.getElementById("gender").value = "Select Gender";
        document.getElementById('male-select').style.display = "";
        document.getElementById("female-select").style.display = "";
      }
    }

    //FETCH USER RATINGS
    async function fetchUserRating() {
      try {
          const userRatingData = await makeRequest(CONFIG.ENDPOINTS.USER_RATING(userId), {
          headers: getAuthHeaders()
      });
      console.log('Based of ', userRatingData);
      const scores = userRatingData.map(rating => rating.score);
      const average = parseFloat((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1));
      colorStars(average, scores);
      } catch (error) {
          console.error("Error fetching favorite listings:", error);
      }
    }

    //COLORING THE RATING STARS BASED ON RATING
    function colorStars(average, scores) {
      const stars = document.querySelectorAll(".fa-star");
      document.querySelector('.rating-score').textContent = average.toFixed(1);
      document.querySelector('.rating-text').textContent = `Based of ${scores.length} reviews`
      
      stars.forEach((star, index) => {
          const starNumber = index + 1;
  
          if (average >= starNumber) {
              star.style.color = "#FFD700";
          } else if (average >= starNumber - 0.5) {
              star.style.color = "#FFD70080";
          } else {
              star.style.color = "#ccc";
          }
      });
  }

  //FETCH USER BOOKINGS
  async function fetchUserBooking() {
    try {
        const userRatingData = await makeRequest(CONFIG.ENDPOINTS.USER_BOOKINGS(userId), {
        headers: getAuthHeaders()
    });
    document.getElementById("bookings-made").textContent = userRatingData.length;
    } catch (error) {
        console.error("Error fetching favorite listings:", error);
    }
  }

  //FETCH USER REVIEWS
  async function fetchUserReviews() {
    try {
        const userReviewData = await makeRequest(CONFIG.ENDPOINTS.USER_REVIEWS(userId), {
        headers: getAuthHeaders()
    });
    document.getElementById("reviews-made").textContent = userReviewData.length;
    } catch (error) {
        console.error("Error fetching favorite listings:", error);
    }
  }

  //FETCH USER REVIEWS
  async function fetchUserFavorites() {
    try {
        const userFavoritesData = await makeRequest(CONFIG.ENDPOINTS.USER_FAVORITES(userId), {
        headers: getAuthHeaders()
    });
    document.getElementById("user-favs").textContent = userFavoritesData.length;
    } catch (error) {
        console.error("Error fetching favorite listings:", error);
    }
  }

  //HIDE AND SHOW EDIT USER PROFILE && UPDATE USER DATA
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

  async function saveProfile() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const primaryPhone = document.getElementById('primaryPhone').value;
    const secondaryPhone = document.getElementById('secondaryPhone').value;
    const gender = document.getElementById('gender').value;


    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('telephone_no', primaryPhone);
    formData.append('secondary_telephone_no', secondaryPhone || '');
    formData.append('sex', gender);
  
    try {
      makeRequest(CONFIG.ENDPOINTS.USER_DATA(userId), {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: formData
      });

      document.getElementById("basic-overlay").style.display = "block";
      document.getElementById('notification').style.display = "block";
      document.querySelector(".notification-icon").style.display = 'flex';
      document.querySelector(".notification-title").textContent = "Success";
      document.querySelector(".notification-message").textContent = "Profile updated successfully!!!";
      document.getElementById("dismiss-btn").addEventListener('click', () =>{
        location.reload();
      });
      toggleEdit();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    }
  }

  document.getElementById('save-usr-profile-info-btn').addEventListener('click', () => {
    saveProfile();
  });
  
})