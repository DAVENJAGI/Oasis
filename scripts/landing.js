document.addEventListener('DOMContentLoaded', () => {
    const userProfileAvatar = document.getElementById('route-to-user-profile');
    userProfileAvatar.addEventListener('click', () => {
        window.location.href = 'profile.html';
    })

    function isLoggedIn() {
        return sessionStorage.getItem('X-Custom-Token');
    }
    const header1 = document.getElementById('header-1');
    const header2 = document.getElementById('header-2')

    if (!isLoggedIn()) {
        header1.style.visibility = "hidden";
        header2.style.visibility = "visible";
    }
    

    const routeToLogin = document.getElementById('usr-login-button');
    if(routeToLogin) {
        routeToLogin.addEventListener('click', () => {
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

document.addEventListener('DOMContentLoaded', () => {
    const userId = sessionStorage.getItem('user_id');
    const customToken = sessionStorage.getItem('X-Custom-Token');
    console.log('custom', customToken);
    let favoritedListings = [];
    let nearbyLatestListings = [];


    function getAuthHeaders() {
        return {
            'X-Custom-Token': customToken
        };
    }

    const CONFIG = {
        API_BASE_URL: 'https://oasis-mjmw.onrender.com/api/v1',
        ENDPOINTS: {
            USER_DATA: `/user/${userId}`,
            USER_FAVORITED_LISTINGS: `/user/${userId}/favorites/`,
            LATEST_AND_NEARBY_LISTINGS: `/listings/latest`,
            LISTINGS_SEARCH: `/listings_search`
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
    

    //FETCH LISTING topReviews DETAILS
    async function fetchUserFavorites() {
        try {
            const favoriteUserData = await makeRequest(CONFIG.ENDPOINTS.USER_FAVORITED_LISTINGS, {
            headers: getAuthHeaders()
        });
        favoritedListings = favoriteUserData;
        console.log("this here; ", favoritedListings);
        } catch (error) {
            console.error("Error fetching favorite listings:", error);
        }
    }

    //FETCH USER
    async function fetchUser() {
        try {
            const userData = await makeRequest(CONFIG.ENDPOINTS.USER_DATA, {
            headers: getAuthHeaders()
        });
        document.querySelector(".profile-name-header").textContent = `${userData.first_name} ${userData.last_name}`;
        const nameChar = `${userData.first_name.charAt(0)}${userData.last_name.charAt(0)}`.toUpperCase()
        document.getElementById('usr-profile-avatar').textContent = nameChar;
        return userData;
        } catch (error) {
            console.error("Error fetching favorite listings:", error);
        }
    }fetchUser();

    // GET NEARBY OR LATEST LISTINGS
    async function fetchLatestOrNearbyListing(lat = null, lng = null) {
        const loader = document.querySelector(".loader-container");
        loader.style.visibility = "visible";

        try {
            let endpoint = CONFIG.ENDPOINTS.LATEST_AND_NEARBY_LISTINGS
            if (lat !== null && lng !== null) {
                endpoint += `?lat=${lat}&lng=${lng}`;
            }
            const nearbyListings = await makeRequest(endpoint, {
            headers: getAuthHeaders()
            });
            nearbyLatestListings = nearbyListings;
            appendListingCards(nearbyLatestListings);
            loader.style.visibility = "hidden";
        } catch (error) {
            console.error('Error fetching neabry and latest listings:', error);
        }
    }
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const usr_latitude = position.coords.latitude;
            const usr_longitude = position.coords.longitude;
            fetchLatestOrNearbyListing(usr_latitude, usr_longitude);
        },
        function(error) {
            console.warn("Geolocation error:", error.message);
            fetchLatestOrNearbyListing();
        }
    );
    
    //FUNCTION TO CREATE LISTING CARD
    function createListingCard(listing) {
        const listingCard = document.createElement('div');
        listingCard.className = 'listing-card fade-in';
        listingCard.setAttribute("data-id", listing.id);
        const formattedPrice = listing.price_by_night.toLocaleString();
        const badgeText = listing.listing_tag || 'Verified';

        
        function createListingImage(listing) {
            if (!listing.cover_image || listing.cover_image === "NULL" || listing.cover_image === null || listing.cover_image === "") {
                return `
                    <div class="image-placeholder">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke-width="1.5" stroke="currentColor" class="placeholder-icon">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5
                                      1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18
                                      3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0
                                      0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5
                                      0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375
                                      0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        <div class="placeholder-txt">No images added for this listing</div>
                    </div>
                `;
            } else {
                return `<img src="${listing.cover_image}" class="listing-img">`;
            }
        }
        
        listingCard.innerHTML = `
            <div class="listing-image">
                ${createListingImage(listing)}
                <div class="listing-badge">${badgeText}</div>
                <div class="listing-favorite">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                </div>
            </div>
            <div class="listing-content">
                <div class="listing-header">
                    <div>
                        <h3 class="listing-title">${listing.property_name}</h3>
                        <div class="listing-type">${listing.property_type}</div>
                    </div>
                    <div class="listing-price">
                        <div class="price-amount">Ksh ${formattedPrice}</div>
                        <div class="price-period">per night</div>
                    </div>
                </div>
                <div class="listing-location">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span>${listing.address}</span>
                </div>
                <div class="listing-amenities">
                    <div class="amenity">
                        <svg class="amenity-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4"/>
                        </svg>
                        <span>${listing.number_rooms} Bed${listing.number_rooms > 1 ? 's' : ''}</span>
                    </div>
                    <div class="amenity">
                        <svg class="amenity-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>
                        </svg>
                        <span>${listing.number_bathrooms} Bath${listing.number_bathrooms > 1 ? 's' : ''}</span>
                    </div>
                    <div class="amenity">
                        <svg class="amenity-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                        <span>${listing.max_guest} Guest${listing.max_guest > 1 ? 's' : ''}</span>
                    </div>
                </div>
                <div class="listing-actions">
                    <button id="view-listing-details" class="action-button" data-id="${listing.id}">View Details</button>
                    <button id="go-to-booking-button" class="action-button primary" onclick="bookNow('${listing.id}')">Book Now</button>
                </div>
            </div>
        `;

        const viewDetailsButton = listingCard.querySelector('#view-listing-details');
        viewDetailsButton.addEventListener('click', function() {
            const listingId = this.getAttribute('data-id');
            sessionStorage.setItem('listingId', listingId);
            
            viewDetails(listingId);
        });


        return listingCard;
    }

    //APPEND LISTINGS TO CARD
    function appendListingCards(nearbyLatestListings) {
        const container = document.querySelector('.listings-grid');
        if (!container) {
            console.error('Container not found:', container);
            return;
        }
        
        container.innerHTML = "";

        console.log(nearbyLatestListings);
        nearbyLatestListings.forEach(listing => {
            const listingCard = createListingCard(listing);
            container.appendChild(listingCard);
        });
        const sectionHeader = document.querySelector('.listings');
        if (sectionHeader) {
            sectionHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.target.getAttribute('data-id');
          viewDetails(id);
        });
    });

    function viewDetails(id) {
        const loader = document.getElementById('pageLoader');
        loader.style.display = 'flex';
      
        sessionStorage.setItem('listingId', id);
        setTimeout(() => {
          window.location.href = 'item.html';
        }, 300);
    }
      
    function bookNow(listingId) {
        console.log('Book now for listing:', listingId);
    }

    document.getElementById("logoClick").addEventListener("click", () => {
        location.reload();
    })

    //SEARCH LISTINGS
    async function searchListing() {
        const searchButton = document.getElementById("search-listings-button");
        searchButton.disabled = true;
        searchButton.textContent = "Searching..."; 
    
        const formData = {
            property_type: document.getElementById('property-type-div').value,
            country: document.getElementById('country-search-div').value,
            location: document.getElementById('location-search-div').value,
        };
    
        try {
            const searchData = await makeRequest(CONFIG.ENDPOINTS.LISTINGS_SEARCH, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeaders()
                },
                body: JSON.stringify(formData)
            });
            
            if(searchData.length === 0) {
                document.querySelector(".no-listings-found").style.display = 'block';
            }
            appendListingCards(searchData);
            return searchData;
        } catch (error) {
            console.error("Error fetching favorite listings:", error);
        } finally {
            searchButton.disabled = false;
            searchButton.textContent = "Search Listings";
        }
    }
    
    document.getElementById("search-listings-button").addEventListener("click", (e) => {
        e.preventDefault();
        searchListing();
    });

})
