document.addEventListener('DOMContentLoaded', () => {
  /*
    const monthlyagentStats = {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        spending:       [100, 120, 95, 130, 110, 125, 108, 96, 120, 115, 100, 90],
        favoritesAdded:  [10, 12, 14,  8,  11,  9,   10, 13, 12, 15,  11,  7],
        housesRented:    [1,  1,   0,  2,   1,   1,   2,   1,  1,   2,   0,  1],
        messagesSent:    [5, 10,  6,  8,   7,   9,   8,  12, 10, 11,  9,   6]
    };
  
    const ctx = document.getElementById('agentStatsChart').getContext('2d');
  
    const agentStatsChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: monthlyagentStats.months,
        datasets: [
          {
            label: 'Spending (KES)',
            data: monthlyagentStats.spending,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Favorites Added',
            data: monthlyagentStats.favoritesAdded,
            borderColor: 'rgba(255, 206, 86, 1)',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Houses Rented',
            data: monthlyagentStats.housesRented,
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
            data: monthlyagentStats.messagesSent,
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
*/
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



    

    
    //headers
    const userProfileImage = document.getElementById("user_profile_icon");
    const agentId = localStorage.getItem('agent_id');
    const customToken = localStorage.getItem('X-Custom-Token');
    const userImageUrl = localStorage.getItem('profile_image');

    function getAuthHeaders() {
        return {
            'X-Custom-Token': customToken
        };
    }

    if(userProfileImage && userImageUrl) {
      userProfileImage.style.backgroundImage = `url('${userImageUrl}')`;
      userProfileImage.style.backgroundSize = "cover";
      userProfileImage.style.backgroundPosition = "center";     
      userProfileImage.style.borderRadius = "50%";   
      console.log('This is image path', userImageUrl);
    } else {
        const defaultProfileIconHTML = `
        <div class="third_header_div_components tooltip-container" id="my_messages_icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor"  class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
        </div
        `;
        userProfileImage.outerHTML = defaultProfileIconHTML;
    }

    //FETCH agent DETAILS AND LOAD THEM TO AGENT PROFILE
    function fetchAgentDetails() {
      fetch (`http://0.0.0.0:5000/api/v1/agent/${agentId}`, {
          headers: {
              ...getAuthHeaders(),
          },
      })
      .then(response => response.json())
      .then(data => {

          fetchAgentListings();
  
          const LeftProfileImage = document.getElementById('agent_profile_image_icon');
          if(LeftProfileImage && data.profile_image) {
            const imageUrl = `url('${data.profile_image}')`;
            LeftProfileImage.style.backgroundImage = imageUrl;
            LeftProfileImage.style.backgroundSize = "cover";
            LeftProfileImage.style.backgroundPosition = "center";
            LeftProfileImage.style.borderRadius = "50%";
            console.log('This is image path', imageUrl);
          } else {
              const defaultProfileIconHTML = `
              <div id="agent_profile_image_icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-6 profile-icon">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
              </div>
              `;
              LeftProfileImage.outerHTML = defaultProfileIconHTML;
          }

          //convert to readable date format
          const activeSince = formatCreatedAt(data.created_at);
          function formatCreatedAt(activeSince) {
            const date = new Date(activeSince);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const year = date.getFullYear();
            return `${month}/${day}/${year}`;
          }

          console.log('Agent fetched:', data);
          const agentEmail = document.getElementById('agent_email');
          const firstActive = document.getElementById('agent_activity_since');
          const agentProfile = document.getElementById('agent_bio');

         const wholeName = document.getElementById('agent_name_txt');
          const verificationDiv = document.getElementById('verification_div');
          const agentTelNo = document.getElementById('agent_tel_no');          

          agentProfile.textContent = data.bio;
          agentEmail.textContent = data.email || "-----";
          firstActive.textContent = `${"Agent active since"}  ${activeSince}` || '-----'

          wholeName.textContent = `${data.first_name}` + " " + `${data.last_name}`;
          agentTelNo.textContent = data.telephone_no;
          if(data.is_verified == true) {
            verificationDiv.style.visibility = "visible";
            verificationDiv.style.display = "flex";
          }

          fetch(`http://0.0.0.0:5000/api/v1/agent/${agentId}/ratings`, {
            headers: {
              ...getAuthHeaders(),
            },
          })
          .then(response => response.json())
          .then(ratingData => {
            let ratingList = [];
            const ratingAmountClass = document.getElementById('rating_number');

            if(ratingData.length !== 0){
              console.log("Rating data:", ratingData);
              // const ratingDiv = document.getElementById('total_score');
              // ratingDiv.textContent = parseFloat(ratingData.average_rating).toFixed(1);

              ratingList = ratingData.map(rating => rating.score)
              console.log("This is the listing rating: ", ratingList);
              const total = ratingList.reduce((acc, score) => acc + score, 0);
              const average = ratingList.length > 0 ? (total / ratingList.length).toFixed(1) : "0.0";

              const agentRating = document.getElementById('total_score');
              const numberOfRaters = document.getElementById('rate_total');

              agentRating.textContent = average;
              numberOfRaters.textContent = `${ratingList.length}`;

              const starLabels = document.querySelectorAll("#rating_stars label svg");

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
              
              if (!isNaN(avgRating)) {
                starLabels.forEach((svg, index) => {
                  if (index < Math.floor(avgRating)) {
                    svg.style.fill = "gold";
                    svg.style.color = "gold";
                    }  else if (avgRating >= starIndex - 0.5) {
                      svg.style.fill = "url(#half-gold)";
                    } else {
                      svg.style.fill = "none";
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
            console.error("Error fetching agent rating:", err);
          });
        })
        .catch(error => console.error("Error fetching agent rating:", error));
    }
    fetchAgentDetails();

    // GET AGENT's LISTINGS
    function fetchAgentListings() {
      fetch (`http://0.0.0.0:5000/api/v1/agent/${agentId}/listings/`, {
        headers: {
            ...getAuthHeaders(),
        },
      })
      .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
        })
        .then(data => {
          listingsData = data;
          console.log("This is the data for all latest listing: ", data);
          const container = document.getElementById("landing_body_div");
          const verification_div_div = document.getElementsByClassName('verification_div');
          const agentListingAmount = document.getElementById('ad_amounts');

          agentListingAmount.textContent = listingsData.length + " " + "listings";

          listingsData.forEach(listing => {
              const listingDiv = document.createElement("div");
              listingDiv.className = "listing_overview_container";
              listingDiv.setAttribute("data-id", listing.id);
              const hasImage = listing.cover_image && listing.cover_image.trim() !== "";
              let html = '';
              const distanceHTML = (listing.distance_km !== undefined && listing.distance_km !== null)
                  ? `<div class="distance_div" id="distance_item" style="position: absolute; top: 10px; background-color: #87d0e9cc; color: white; left: 25%;">${listing.distance_km} Kms</div>
                     <div class="distance_div" style="position: absolute; top: 10px; color: white; left: 10px;">Latest</div>`
                  : ''
              ;

              const listingVerification = (listing.is_verified !== false)
                  ? `<div class="verification_div">
                          <svg xmlns="http://www.w3.org/2000/svg" height="17px" viewBox="0 -960 960 960" width="17px" fill="#28A745">
                              <path d="m347-72-75-124-141-32 13-144-96-108 96-108-13-144 141-32 75-124 133 57 133-57 75 124 141 32-13 144 96 108-96 108 13 144-141 32-75 124-133-57-133 57Zm29-91 104-44 104 44 58-97 110-25-10-111 74-84-74-84 10-111-110-25-58-97-104 44-104-44-58 97-110 24 10 112-74 84 75 84-11 112 110 25 58 96Zm104-317Zm-51 144 238-237-51-51-187 186-85-84-51 51 136 135Z"/>
                          </svg>
                  </div>`
                  : ''
              ;


              listingDiv.innerHTML = `
              
              <div class="listing_image_div" style="background: ${hasImage ? `url('${listing.cover_image}') center/cover` : `#f0f0f0`}; height: 40%; background-color: white; color: #838383; border-radius: 20px 20px 0 0; display: flex; align-items: center; justify-content: center; position: relative;">
                  ${distanceHTML}
                  ${!hasImage ? `
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="40" height="40">
                      <path stroke-linecap="round" stroke-linejoin="round"
                          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 
                          1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 
                          0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 
                          6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 
                          0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
                  </svg>
                  ` : ""}
              </div>
              <div class="listing_name">
                  <div class="listing_name_div">${listing.property_name}</div>
                  <div class="listing_type">${listing.property_type}</div>
                  ${listingVerification}
              </div>
              <div class="listing_location_div">
                  <div class="location_icon"><i class='bx bx-current-location'></i></div>
                  <div class="county_location_name">Nairobi,</div>
                  <div class="location_location_name">${listing.address}</div>
              </div>
              <div class="amenities_div">
                  <div class="location_icon">
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#9b9b9b"><path d="M287.75-588q-34.75 0-59.25-24.75t-24.5-59.5q0-34.75 24.75-59.25t59.5-24.5q34.75 0 59.25 24.75t24.5 59.5q0 34.75-24.75 59.25t-59.5 24.5ZM240-96q-20.4 0-34.2-13.8Q192-123.6 192-144h-24q-29.7 0-50.85-21.15Q96-186.3 96-216v-216h120v-24q0-35.47 25.5-59.73Q267-540 303-540q16 0 31 5.5t26 16.5l56 50q11 9 20.5 18t19.5 18h264v-320q0-17-11-28.5T681-792q-13 0-23 7.5T639-768l-30 30q5 19.04.5 37.52Q605-682 591-669L489-771q13-14 31-18.5t37 .5l42-41q15.8-16 36.04-25 20.25-9 42.96-9 48 0 81 34t33 82v316h72v216q0 29.7-21.15 50.85Q821.7-144 792-144h-24q0 20.4-13.8 34.2Q740.4-96 720-96H240Zm-72-120h624v-144H168v144Zm0 0h624-624Z"/></svg>
                  </div>
                  <div class="baths_div">Baths</div>
                  <div class="comma">:</div>
                  <div class="baths_amt">${listing.number_bathrooms}</div>
              </div>
              <div class="room_div">
                  <div class="location_icon">
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#9b9b9b"><path d="M48-192v-576h72v384h312v-336h336q60 0 102 42t42 102v384h-72v-120H120v120H48Zm228-240q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm228 48h336v-192q0-29.7-21.15-50.85Q797.7-648 768-648H504v264ZM276-504q20.4 0 34.2-13.8Q324-531.6 324-552q0-20.4-13.8-34.2Q296.4-600 276-600q-20.4 0-34.2 13.8Q228-572.4 228-552q0 20.4 13.8 34.2Q255.6-504 276-504Zm0-51Zm228-93v264-264Z"/></svg>
                  </div>
                  <div class="room_div_txt">Beds</div>
                  <div class="comma">:</div>
                  <div class="room_amt">${listing.number_rooms}</div>
              </div>
              <div class="price_per_night">
                  <div class="from_text">from</div>
                  <div class="amount_text">Ksh ${listing.price_by_night.toLocaleString()}</div>
                  <div class="per_night_txt">per night</div>
              </div>
              <div class="listing_properties_div"></div>
              `;
              container.appendChild(listingDiv);

              listingDiv.addEventListener("click", () => {
                const listingId = listingDiv.getAttribute("data-id");
                localStorage.setItem('listing_id', listingId);
                window.location.href = "item.html";
              });
          })
      })
        .catch(error => {
              console.error("Error fetching data:", error);
        });
    }
});