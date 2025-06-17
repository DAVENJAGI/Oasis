document.addEventListener('DOMContentLoaded', () => {
    const listingId = localStorage.getItem('listing_id');
    const customToken = localStorage.getItem('X-Custom-Token');
    const userProfileImage = document.getElementById("user_profile_icon");
    const imageUrl = localStorage.getItem('profile_image');

    function getAuthHeaders() {
        return {
            'X-Custom-Token': customToken
        };
    }

    //PROFILE IMAGE
    if(userProfileImage && imageUrl) {
        userProfileImage.style.backgroundImage = `url('${imageUrl}')`;
        userProfileImage.style.backgroundSize = "cover";
        userProfileImage.style.backgroundPosition = "center";     
        userProfileImage.style.borderRadius = "50%";   
        console.log('This is image path', imageUrl);
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

    //SHOW NO SIMILAR LISTINGS DIV
    function showNoSimilarListing() {
        const noSimilarListingsDiv = document.getElementById('no_similar_listings');
        const computedStyle = window.getComputedStyle(noSimilarListingsDiv);
      
        if (computedStyle.display === 'none') {
            noSimilarListingsDiv.style.display = 'block';
        }
    }


    //FETCH USER DETAILS
    function fetchAgentDetails(agentId) {
        return fetch(`http://0.0.0.0:5000/api/v1/agent/${agentId}`, {
            headers: {
                ...getAuthHeaders(),
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log("This is the agent data: ", data);
            const agentName = document.getElementById('agent_name');
            const agentLastSeen = document.getElementById('agent_last_seen');

            agentLastSeen.textContent = "Last seen January 2025 10:12Am"
            agentName.textContent = `${data.first_name} ${data.last_name}` || "-----";
        })
        .catch(error => {
            console.error("Error fetching user name:", error);
            return "Unknown User";
        });
    }

    // FETCH LISTING DETAILS
    function fetchListingDetails() {
        fetch (`http://0.0.0.0:5000/api/v1/listings/${listingId}/`, {
            headers: {
                ...getAuthHeaders(),
            },
        })
        .then(response => response.json())
        .then(data => {
            fetchAgentDetails(data.agent_id);
            console.log("This is the listing details: ", data);
            const defaultListingImage = document.getElementById('listing_image');
            if (data.cover_image === null){
                defaultListingImage.style.background = 'white';
                defaultListingImage.style.color = "#838383";
                defaultListingImage.style.alignItems = "center";
                defaultListingImage.style.justifyContent = "center";
                defaultListingImage.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="100" color="#838383" height="100">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 
                                    1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 
                                    0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 
                                    6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 
                                    0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
                            </svg>
                            `;
            } else {
                defaultListingImage.style.backgroundImage = `url('${data.cover_image}')`;
                defaultListingImage.style.backgroundSize = "cover";
                defaultListingImage.style.backgroundRepeat = "no-repeat";
                defaultListingImage.style.backgroundPositionY = "50%";
            }

            const listingPrice = document.getElementById('amount_data');
            listingPrice.textContent = `${data.price_by_night}` + " " + "per night";

            if(data.longitude && data.latitude !== null){
                let locationApiKey = null;
                function fetchLatestOrNearbyListing(lat = null, lng = null) {
                    let requestUrl = 'http://0.0.0.0:5000/api/v1/api_keys/api_k_966b7684-4c31-48bb-b7a0-0791c458dc8a/';
                    fetch(requestUrl)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => {
                            locationApiKey = data.api_key;
                            displayListingLocation(locationApiKey);
                        }).catch(error => {
                            console.error("Error fetching data:", error);
                        });
                }fetchLatestOrNearbyListing();

                //DISPLAY LISTING LOCATIONS
                function displayListingLocation (locationApiKey) {
                    const apiKey = locationApiKey;
                    const latitude = data.latitude;
                    const longitude = data.longitude;
                    const query = `${latitude},${longitude}`;
                    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${encodeURIComponent(query)}&pretty=1&no_annotations=1`;

                    fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                    const location = data.results[0]?.formatted || 'Location not found';

                    const map = L.map('location_div').setView([latitude, longitude], 13);

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(map);

                    L.marker([latitude, longitude])
                        .addTo(map)
                        .bindPopup(location)
                        .openPopup();
                    })
                    .catch(error => {
                    console.error('Error fetching location:', error);
                    document.getElementById('location_div').textContent = 'Failed to load map.';
                    });
                }
            }
        })
        .catch(error => console.error("Error fetching listings:", error));
    }fetchListingDetails();


    // GET SIMILAR LISTINGS
    function fetchSimilarListings() {
        let requestUrl = `http://0.0.0.0:5000/api/v1/listing/${listingId}/similar`;
        
        fetch(requestUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                listingsData = data;
                console.log("This is the data for all related listings: ", data);
                const container = document.getElementById("more_similar_properties");
                const verification_div_div = document.getElementsByClassName('verification_div');
                if(data.length === 0) {
                    showNoSimilarListing();
                } else {
                    listingsData.forEach(listing => {
                        const listingDiv = document.createElement("div");
                        listingDiv.className = "listing_overview_container";
                        listingDiv.setAttribute("data-id", listing.id);
                        const hasImage = listing.cover_image && listing.cover_image.trim() !== "";
                        let html = '';
                        const availabilityStatus = (() => {
                            let status = listing.rental_status;
                            let badgeColor = "";
                            let textColor = "#ffffff";

                            switch (status) {
                                case 'Available':
                                    badgeColor = '#2ecc71';
                                    break;
                                case 'Occupied':
                                    badgeColor = '#e74c3c';
                                    break;
                                case 'Pending':
                                    badgeColor = '#7f8c8d';
                                    break;
                                default:
                                    return '';
                            }
                            return `
                            <div class="distance_div" style="position: absolute; top: 10px; background-color: ${badgeColor}; color: ${textColor}; left: 10px;">${status}</div>`;
                        })();

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
                            ${availabilityStatus}
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

                        listingDiv.addEventListener("click", () => {
                            const listingId = listingDiv.getAttribute("data-id");
                            localStorage.setItem('listing_id', listingId);
                            window.location.href = "item.html";
                        });
                    })
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    } fetchSimilarListings();

    


    /** SHOWING AND HIDING DIFFERENT DIVS IN THE PAGE*/

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

    //SHOW AND HIDE REPORT DIV
    function showReportDiv() {
        const reportDiv = document.getElementById('listing_report_div');
        const computedStyle = window.getComputedStyle(reportDiv);
      
        if (computedStyle.display === 'none') {
            reportDiv.style.display = 'block';
        }
    }
    function hideReportDiv() {
        const reportDiv = document.getElementById('listing_report_div');
        const computedStyle = window.getComputedStyle(reportDiv);
      
        if (computedStyle.display === 'block') {
            reportDiv.style.display = 'none';
        }
    }

    const reportButton = document.getElementById('report_misuse');
    reportButton.addEventListener('click', () =>{
        showReportDiv();
        showOverlay();
    })

    const hideReportButton = document.getElementById('exit_report_button');
    hideReportButton.addEventListener('click', () =>{
        hideReportDiv();
        hideOverlay();
    })

    
    //SHOW AND HIDE REVIEWS DIV
    function showReviewDiv() {
        const reviewDiv = document.getElementById('listing_reviews');
        const computedStyle = window.getComputedStyle(reviewDiv);
    
        if (computedStyle.display === 'none') {
            reviewDiv.style.display = 'block';
        }
    }
    function hideReviewDiv() {
        const reviewDiv = document.getElementById('listing_reviews');
        const computedStyle = window.getComputedStyle(reviewDiv);
    
        if (computedStyle.display === 'block') {
            reviewDiv.style.display = 'none';
        }
    }

    const reviewButton = document.getElementById('see_all_reviews');
    reviewButton.addEventListener('click', () =>{
        showReviewDiv();
        showOverlay();
    })

    const hideReviewButton = document.getElementById('exit_reviews_button');
    hideReviewButton.addEventListener('click', () =>{
        hideReviewDiv();
        hideOverlay();
    })



    //HANDLES TOP AND BOTTOM
    const menuButton = document.getElementById('top_menu_icon');
    menuButton.addEventListener('click', () => {
        showOverlay();
        showMenuDropdown();
        hideMenuIcon();
        showCloseIcon();
    })

    const closeMenuButton = document.getElementById('top_close_menu_icon');
    closeMenuButton.addEventListener('click', () => {
        showMenuIcon();
        hideOverlay();
        hideMenuDropdown();
        hideCloseIcon();
    })


    //SHOW AND HIDE PRICE FLUCTUATION GRAPH DIV
    function showPriceChangeDiv() {
        const priceChangeDiv = document.getElementById('price_statistics_div');
        const computedStyle = window.getComputedStyle(priceChangeDiv);
      
        if (computedStyle.display === 'none') {
            priceChangeDiv.style.display = 'block';
        }
    }
    function hidePriceChangeDiv() {
        const priceChangeDiv = document.getElementById('price_statistics_div');
        const computedStyle = window.getComputedStyle(priceChangeDiv);
      
        if (computedStyle.display === 'block') {
            priceChangeDiv.style.display = 'none';
        }
    }

    const showPriceStatisticsButton = document.getElementById('listing_price_statistics');
    showPriceStatisticsButton.addEventListener('click', () => {
        showOverlay1();
        showPriceChangeDiv();
    })

    const hidePriceStatisticsButton = document.getElementById('exit_price_button');
    hidePriceStatisticsButton.addEventListener('click', () => {
        hideOverlay1();
        hidePriceChangeDiv();
    })

    //SHOW AND HIDE LISTING LOCATION
    function showListingLocationDiv() {
        const listingLocationDiv = document.getElementById('listing_location_div');
        const computedStyle = window.getComputedStyle(listingLocationDiv);
      
        if (computedStyle.display === 'none') {
            listingLocationDiv.style.display = 'block';
        }
    }
    function hideListingLocationDiv() {
        const listingLocationDiv = document.getElementById('listing_location_div');
        const computedStyle = window.getComputedStyle(listingLocationDiv);
      
        if (computedStyle.display === 'block') {
            listingLocationDiv.style.display = 'none';
        }
    }

    const showListingLocatinButton = document.getElementById('location_map');
    showListingLocatinButton.addEventListener('click', () => {
        showOverlay1();
        showListingLocationDiv();
    })

    const hideListingLocatinButton = document.getElementById('exit_location_button');
    hideListingLocatinButton.addEventListener('click', () => {
        hideOverlay1();
        hideListingLocationDiv();
    })
})