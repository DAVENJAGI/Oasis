document.addEventListener('DOMContentLoaded', () => {

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
