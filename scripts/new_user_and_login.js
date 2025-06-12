document.addEventListener('DOMContentLoaded', () => {

    //HEADER COLOR ON SCROLLING
    const scrollableDiv = document.getElementById("whole_body");
    if (scrollableDiv) {
        scrollableDiv.addEventListener("scroll", function() {
            if (scrollableDiv.scrollTop > 10) {
                header.classList.add("scrolled");
                console.log("I am Scrolled (from div)");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

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

document.addEventListener('DOMContentLoaded', () => {
    
    function fetchLatestOrNearbyListing(lat = null, lng = null) {
        let requestUrl = 'http://0.0.0.0:5000/api/v1/listings/latest/';
        if (lat !== null && lng !== null) {
            requestUrl += `?lat=${lat}&lng=${lng}`;
        }

        fetch(requestUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                listingsData = data;
                console.log("This is the data for all latest listing: ", data);
                const container = document.getElementById("login_body_div");
                const verification_div_div = document.getElementsByClassName('verification_div');

                listingsData.forEach(listing => {
                    const listingDiv = document.createElement("div");
                    listingDiv.className = "listing_overview_container";
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
                        <div class="distance_div" style="position: absolute; top: 10px; background-color: #00C700; color: white; left: 10px;">Latest</div>
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
                        <div class="like_button_div">
                        <div class="like_button" id="saved_icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg> 
                        </div>
                        </div>
                    </div>
                    <div class="listing_properties_div"></div>
                    `;
                    container.appendChild(listingDiv);
                })
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const usr_latitude = position.coords.latitude;
            const usr_longitude = position.coords.longitude;
            console.log("User location:", usr_latitude, usr_longitude);
            fetchLatestOrNearbyListing(usr_latitude, usr_longitude);
        },
        function(error) {
            console.warn("Geolocation error:", error.message);
            fetchLatestOrNearbyListing();
        }
    );

    const container = document.getElementById("listings_container");

    
})