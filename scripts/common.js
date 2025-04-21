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
})
