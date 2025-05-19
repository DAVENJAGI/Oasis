document.addEventListener('DOMContentLoaded', () => {

    window.addEventListener('scroll', function () {
        console.log('Hello hello, I am being called');
        const header = document.getElementById('header');
        if (window.scrollY > 0) {
          header.style.backgroundColor = '#87d0e999';
        } else {
          header.style.backgroundColor = 'transparent';
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

    // CHANGE BACKGROUND OF VIDEOS
    function changeBackgroundVideo(videoFileName) {
        const video = document.getElementById('bg_video');
        const source = document.getElementById('video_source');
        source.src = `../images/videos/${videoFileName}`;
        video.load();
        video.play();
    }

    const videoList = [
        "3773486-hd_1920_1080_30fps.mp4",
        "3785192-hd_1920_1080_25fps.mp4",
        "3769951-hd_1920_1080_25fps.mp4",
        "4477613-hd_1920_1080_30fps.mp4",
        "7578541-uhd_3840_2160_30fps.mp4",
    ];

    function changeRandomVideo() {
        const randomIndex = Math.floor(Math.random() * videoList.length);
        changeBackgroundVideo(videoList[randomIndex]);
    }
    const video = document.getElementById('bg_video');
    video.addEventListener('ended', changeRandomVideo);
    setInterval(changeRandomVideo, 30000);


    
    const customSelect = document.getElementById("apartment_select");
    const selected = customSelect.querySelector(".selected");
    const options = customSelect.querySelector(".options");
    const optionItems = customSelect.querySelectorAll(".option");

    customSelect.addEventListener("click", () => {
        options.style.display = options.style.display === "block" ? "none" : "block";
    });

    optionItems.forEach(option => {
        option.addEventListener("click", () => {
        selected.textContent = option.textContent;
        options.style.display = "none";
        });
    });

    document.addEventListener("click", (e) => {
        if (!customSelect.contains(e.target)) {
        options.style.display = "none";
        }
    });

    customSelect.addEventListener("click", () => {
        customSelect.classList.toggle("open");
    });

    
})
