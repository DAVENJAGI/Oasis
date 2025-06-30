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

    let authCheckInterval = null;
    let redirected = false;

    function checkAuthStatus() {
        if (redirected) return;

        fetch(`http://0.0.0.0:5000/api/v1/user/status`, {
            headers: {
                ...getAuthHeaders(),
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Non-200 response");
            }
            return response.json();
        })
        .then(data => {
            console.log("This is the data", data);
            console.log("I am being called");

            if (data.Message === "Sorry, you do not have the valid authorization to perform the operation") {
                console.log("Authorization failed, stopping interval and redirecting.");
                redirected = true;
                clearInterval(authCheckInterval);
                authCheckInterval = null;
                setTimeout(() => {
                    window.location.href = "error_page.html";
                }, 50);
            }
        })
        .catch(error => {
            console.error("Error fetching user name:", error);
        });
    }checkAuthStatus();
    authCheckInterval = setInterval(checkAuthStatus, 20000);

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
            let ratingList = [];
            const ratingAmountClass = document.getElementById('rating_number');

            if (ratingData.length !== 0) {
              const userRatingDiv = document.getElementById('total_score');
              const userStars = document.getElementById('rating_stars');
              const userRating = document.getElementById('total_score');
              const numberOfRaters = document.getElementById('rate_total');
              
              userRatingDiv.style.display = "flex";
              userStars.style.display = "flex";

              console.log("This is the listing rating: ", ratingData);
          
              ratingList = ratingData.map(rating => rating.score);
              numberOfRaters.textContent = ratingList.length;
              
          
              const total = ratingList.reduce((acc, score) => acc + score, 0);
              const average = ratingList.length > 0 ? (total / ratingList.length).toFixed(1) : "0.0";
              const avgRating = parseFloat(average);

              function getRatingColor(avgRating) {
                const rounded = Math.floor(avgRating);
                switch (rounded) {
                  case 5: return '#00c853';
                  case 4.5: return '#26de81';
                  case 4: return '#00b894'; 
                  case 3.5: return '#66bb6a';
                  case 3: return '#81c784';
                  default: return '#a5d6a7';
                }
              }
              ratingAmountClass.style.color = getRatingColor(avgRating);  
          
              userRating.textContent = average;
          
              if (avgRating > 4) {
                userRatingDiv.style.color = 'green';
              } else if (avgRating >= 3.0) {
                userRating.style.color = '#f4c542';
              } else {
                userRating.style.color = "red";
              }
          
              const starLabels = document.querySelectorAll("#rating_stars label svg");
          
              if (!isNaN(avgRating)) {
                starLabels.forEach((svg, index) => {
                  if (index < Math.floor(avgRating)) {
                    svg.style.fill = "gold";
                    svg.style.color = "gold";
                  } else if (avgRating >= index + 0.5) {
                    svg.style.fill = "url(#half-gold)";
                  } else {
                    svg.style.fill = "none";
                    svg.style.color = "#838383";
                  }
                });
              } else {
                starLabels.forEach(svg => svg.style.fill = "none");
              }
          
            } else {
              const ratingAmount = document.getElementById('total_score');
              ratingAmount.textContent = `${"0.0"}`;
              ratingAmountClass.style.color = 'red';
            }
          })
          .catch(err => {
            console.error("Error fetching user rating:", err);
          });
        })
        .catch(error => console.error("Error fetching doctors:", error));
    }
    fetchUserDetails();
});