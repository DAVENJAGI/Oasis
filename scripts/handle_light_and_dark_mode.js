document.addEventListener('DOMContentLoaded', () => {
    //THEME BUTTON
    const themeIcon = document.getElementById('theme-icon');
    const changeColorButton = document.getElementById('change-color-theme-button');
    const themeButton = document.querySelector('.theme-toggle');
    const body = document.body;

    const moonIconSVG = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
    
    const sunIconSVG = `<circle cx="12" cy="12" r="5"></circle>
                        <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
    `;

    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            if (savedTheme === 'light') {
                setLightTheme();
            } else {
                setDarkTheme();
            }
        } else if (prefersDark) {
            setDarkTheme();
        } else {
            setLightTheme();
        }
    }

    function setLightTheme() {
        body.classList.add('light-theme');
        themeIcon.innerHTML = moonIconSVG;
        themeButton.setAttribute('data-tooltip', 'Dark Mode');
        localStorage.setItem('theme', 'light');
    }

    function setDarkTheme() {
        body.classList.remove('light-theme');
        themeIcon.innerHTML = sunIconSVG;
        themeButton.setAttribute('data-tooltip', 'Light Mode');
        localStorage.setItem('theme', 'dark');
    }

    function toggleTheme() {
        const isLightTheme = body.classList.contains('light-theme');
        
        themeButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeButton.style.transform = 'scale(1)';
        }, 150);
        
        if (isLightTheme) {
            setDarkTheme();
        } else {
            setLightTheme();
        }
    }

    if(changeColorButton){
        changeColorButton.addEventListener('click', () => {
            console.log("I am changing the color");
            toggleTheme();
        });
    }
    

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                setDarkTheme();
            } else {
                setLightTheme();
            }
        }
    });

    initializeTheme();

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            toggleTheme();
        }
    }); 
})