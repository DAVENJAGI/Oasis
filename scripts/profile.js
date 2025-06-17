document.addEventListener('DOMContentLoaded', () => {
    const monthlyUserStats = {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        spending:       [100, 120, 95, 130, 110, 125, 108, 96, 120, 115, 100, 90],
        favoritesAdded:  [10, 12, 14,  8,  11,  9,   10, 13, 12, 15,  11,  7],
        housesRented:    [1,  1,   0,  2,   1,   1,   2,   1,  1,   2,   0,  1],
        messagesSent:    [5, 10,  6,  8,   7,   9,   8,  12, 10, 11,  9,   6]
    };
  
    const ctx = document.getElementById('userStatsChart').getContext('2d');
  
    const userStatsChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: monthlyUserStats.months,
        datasets: [
          {
            label: 'Spending (KES)',
            data: monthlyUserStats.spending,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Favorites Added',
            data: monthlyUserStats.favoritesAdded,
            borderColor: 'rgba(255, 206, 86, 1)',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Houses Rented',
            data: monthlyUserStats.housesRented,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
            tension: 0.4,
            pointStyle: 'circle',  
            pointRadius: 3,
            pointHoverRadius: 5, 
          },
          {
            label: 'Messages Sent',
            data: monthlyUserStats.messagesSent,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'My Monthly Activity Overview'
          },
          tooltip: {
            mode: 'index',
            intersect: false
          },
          legend: {
            labels: {
              usePointStyle: true
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Value'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Month'
            }
          }
        }
      }
    });

    //SHOW AND HIDE OVERLAY
    function showOverlay() {
      const overlayDiv = document.getElementById('overlay');
      const computedStyle = window.getComputedStyle(overlayDiv);
    
      if (computedStyle.display === 'none') {
        overlayDiv.style.display = 'block';
      }
    }
    function hideOverlay() {
        const overlayDiv = document.getElementById('overlay');
        const computedStyle = window.getComputedStyle(overlayDiv);
      
        if (computedStyle.display === 'block') {
          overlayDiv.style.display = 'none';
        }
    }



    //SHOW AND HIDE PROFLE EDIT DIV
    function showProfileEditDiv() {
      const reviewDiv = document.getElementById('whole_profile_div_edit');
      const computedStyle = window.getComputedStyle(reviewDiv);
  
      if (computedStyle.display === 'none') {
          reviewDiv.style.display = 'block';
      }
    }
    function hideProfileEditDiv() {
        const reviewDiv = document.getElementById('whole_profile_div_edit');
        const computedStyle = window.getComputedStyle(reviewDiv);
    
        if (computedStyle.display === 'block') {
            reviewDiv.style.display = 'none';
        }
    }

    const editProfileButton = document.getElementById('edit_button');
    editProfileButton.addEventListener('click', () =>{
        showProfileEditDiv();
        showOverlay();
    })

    const hideEditProfileButton = document.getElementById('exit_edit_button');
    hideEditProfileButton.addEventListener('click', () =>{
        hideProfileEditDiv();
        hideOverlay();
    })

    //headers
    const userProfileImage = document.getElementById("user_profile_icon");
    const imageUrl = localStorage.getItem('profile_image');
    const userId = localStorage.getItem('user_id');
    const customToken = localStorage.getItem('X-Custom-Token');

    function getAuthHeaders() {
        return {
            'X-Custom-Token': customToken
        };
    }

    //FETCH USER DETAILS AND LOAD THEM TO USER PROFILE
    function fetchUserDetails() {
      fetch (`http://0.0.0.0:5000/api/v1/user/${userId}`, {
          headers: {
              ...getAuthHeaders(),
          },
      })
      .then(response => response.json())
      .then(data => {
          const LeftProfileImage = document.getElementById('profile_image_icon');
          if(LeftProfileImage && imageUrl) {
            LeftProfileImage.style.backgroundImage = `url('${imageUrl}')`;
            LeftProfileImage.style.backgroundSize = "cover";
            LeftProfileImage.style.backgroundPosition = "center";     
            LeftProfileImage.style.borderRadius = "50%";   
            console.log('This is image path', imageUrl);
          } else {
              const defaultProfileIconHTML = `
              <div id="profile_image_icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-6 profile-icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
              </div>
              `;
              LeftProfileImage.outerHTML = defaultProfileIconHTML;
          }

          console.log('User fetched:', data);
          const firstName = document.getElementById('user_first_name');
          const lastName = document.getElementById('user_last_name');
          const userEmail = document.getElementById('user_email');
          const telNo = document.getElementById('user_primary_tel_no');
          const priAddress = document.getElementById('user_primary_address');
          const userGender = document.getElementById('user_gender');

          const wholeName = document.getElementById('user_name_txt');
          const verificationDiv = document.getElementById('verification_div');
          const userTelNo = document.getElementById('user_tel_no');          

          firstName.textContent = data.first_name || "-----";
          lastName.textContent = data.last_name || "-----";
          userEmail.textContent = data.email || "-----";
          telNo.textContent = data.telephone_no || "-----";
          priAddress.textContent = data.address || "-----";
          userGender.textContent = data.sex || "-----";

          wholeName.textContent = `${data.first_name}` + " " + `${data.last_name}`;
          userTelNo.textContent = data.telephone_no;
          if(data.is_verified == true) {
            verificationDiv.style.visibility = "visible";
          }

          fetch(`http://0.0.0.0:5000/api/v1/user/${userId}/ratings`, {
            headers: {
              ...getAuthHeaders(),
            },
          })
          .then(response => response.json())
          .then(ratingData => {
            console.log("Rating data:", ratingData);
            const ratingDiv = document.getElementById('total_score');
            ratingDiv.textContent = parseFloat(ratingData.average_rating).toFixed(1);
          })
          .catch(err => {
            console.error("Error fetching user rating:", err);
          });
        })
        .catch(error => console.error("Error fetching doctors:", error));
    }
    fetchUserDetails();
});