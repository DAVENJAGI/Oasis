document.addEventListener('DOMContentLoaded', () => {

    const ctx = document.getElementById('price_fluctuations').getContext('2d');

    const priceFluctuationChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ],
            datasets: [{
                label: 'Listing Price (KES)',
                data: [120000, 115000, 118000, 125000, 130000, 128000, 132000, 127000, 129000, 135000, 133000, 140000], // replace with your own data
                borderColor: '#4bc0c0',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#007bff'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Listing Price Fluctuations (Jan - Dec)'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Price in KES'
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


    function displayListingLocation () {
        const apiKey = '';
        const latitude = '-1.071981';
        const longitude = '37.094347';
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
    displayListingLocation();


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

    // SHOW AND HIDE CLOSE ICON AND MENU ICON
    function showCloseIcon() {
        const closeIconDiv = document.getElementById('top_close_menu_icon');
        const computedStyle = window.getComputedStyle(closeIconDiv);
      
        if (computedStyle.display === 'none') {
            closeIconDiv.style.display = 'block';
        }
    }
    function hideCloseIcon() {
        const closeIconDiv = document.getElementById('top_close_menu_icon');
        const computedStyle = window.getComputedStyle(closeIconDiv);
      
        if (computedStyle.display === 'block') {
            closeIconDiv.style.display = 'none';
        }
    }

    function showMenuIcon() {
        const menuIconDiv = document.getElementById('top_menu_icon');
        const computedStyle = window.getComputedStyle(menuIconDiv);
      
        if (computedStyle.display === 'none') {
            menuIconDiv.style.display = 'block';
        }
    }
    function hideMenuIcon() {
        const menuIconDiv = document.getElementById('top_menu_icon');
        const computedStyle = window.getComputedStyle(menuIconDiv);
      
        if (computedStyle.display === 'block') {
            menuIconDiv.style.display = 'none';
        }
    }

    //SHOW AND HIDE MENU DIV
    function showMenuDropdown() {
        const menuDiv = document.getElementById('menu_dropdown');
        const computedStyle = window.getComputedStyle(menuDiv);
      
        if (computedStyle.display === 'none') {
            menuDiv.style.display = 'block';
        }
    }
    function hideMenuDropdown() {
        const menuDiv = document.getElementById('menu_dropdown');
        const computedStyle = window.getComputedStyle(menuDiv);
      
        if (computedStyle.display === 'block') {
            menuDiv.style.display = 'none';
        }
    }

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

    /*
    //SHOW AND HIDE USER PROFILE DIV
    function showUserProfileDiv() {
        const userProfileDiv = document.getElementById('user_profile');
        const computedStyle = window.getComputedStyle(userProfileDiv);
      
        if (computedStyle.display === 'none') {
            userProfileDiv.style.display = 'block';
        }
    }
    function hideUserProfileDiv() {
        const userProfileDiv = document.getElementById('user_profile');
        const computedStyle = window.getComputedStyle(userProfileDiv);
      
        if (computedStyle.display === 'block') {
            userProfileDiv.style.display = 'none';
        }
    }

    const showUserProfileButton = document.getElementById('user_profile_icon');
    showUserProfileButton.addEventListener('click', () => {
        showOverlay1();
        showUserProfileDiv();
    })

    const hideUserProfileButton = document.getElementById('exit_user_profile_button');
    hideUserProfileButton.addEventListener('click', () => {
        hideOverlay1();
        hideUserProfileDiv();
    })

*/

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
});