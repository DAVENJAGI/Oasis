document.addEventListener('DOMContentLoaded', () => {
    const userProfileAvatar = document.getElementById('usr-profile-avatar');
    userProfileAvatar.addEventListener('click', () => {
        window.location.href = 'profile.html';
    })
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
            USER_FAVORITED_LISTINGS: `/user/${userId}/favorites/`,
            LATEST_AND_NEARBY_LISTINGS: `/listings/latest`
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
    

    const userProfileImage = document.getElementById("user_profile_icon");
    /*
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
    */

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
    } fetchUserFavorites();

    // GET NEARBY OR LATEST LISTINGS
    async function fetchLatestOrNearbyListing(lat = null, lng = null) {
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
        } catch (error) {
            console.error('Error fetching neabry and latest listings:', error);
        }
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
    
    //FUNCTION TO CREATE LISTING CARD
    function createListingCard(listing) {
        const listingCard = document.createElement('div');
        listingCard.className = 'listing-card fade-in';
        
        const formattedPrice = listing.price_by_night.toLocaleString();
        const badgeText = listing.listing_tag || 'Verified';
        
        listingCard.innerHTML = `
            <div class="listing-image">
                <img src="${listing.cover_image}" alt="${listing.property_name}" class="listing-img">
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
                    <button class="action-button" onclick="viewDetails('${listing.id}')">View Details</button>
                    <button class="action-button primary" onclick="bookNow('${listing.id}')">Book Now</button>
                </div>
            </div>
        `;
        
        return listingCard;
    }

    console.log(nearbyLatestListings);
    //APPEND LISTINGS TO CARD
    function appendListingCards(nearbyLatestListings) {
        const container = document.querySelector('.listings-grid');
        if (!container) {
            console.error('Container not found:', container);
            return;
        }
        
        console.log(nearbyLatestListings);
        nearbyLatestListings.forEach(listing => {
            const listingCard = createListingCard(listing);
            container.appendChild(listingCard);
        });
    }

})