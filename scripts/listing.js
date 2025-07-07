document.addEventListener('DOMContentLoaded', () => {
    const showLocationBtn = document.getElementById('show-location');
    const locationOverlay = document.getElementById('location-overlay');
    const locationPopup = document.getElementById('location-popup');
    const closeLocationPopup = document.getElementById('close-location-popup');
    const getDirectionsBtn = document.getElementById('get-directions');
    const shareLocationBtn = document.getElementById('share-location');

    let map;
    let marker;

    function showLocationPopup() {
        locationOverlay.style.display = 'block';
        locationPopup.style.display = 'block';
        
        if (!map) {
            setTimeout(() => {
                initializeMap();
            }, 100);
        }
    }

    function hideLocationPopup() {
        locationOverlay.style.display = 'none';
        locationPopup.style.display = 'none';
    }

    function initializeMap() {
        const latitude = -1.071981;
        const longitude = 37.094347;
        
        map = L.map('location-map').setView([latitude, longitude], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        marker = L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup('Luxury Oceanview Villa<br>Mombasa, Diani Beach')
            .openPopup();
    }

    showLocationBtn.addEventListener('click', showLocationPopup);
    closeLocationPopup.addEventListener('click', hideLocationPopup);
    locationOverlay.addEventListener('click', hideLocationPopup);

    locationPopup.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    getDirectionsBtn.addEventListener('click', () => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=-1.071981,37.094347`;
        window.open(url, '_blank');
    });

    
    shareLocationBtn.addEventListener('click', () => {
        const shareData = {
            title: 'Luxury Oceanview Villa Location',
            text: 'Check out this amazing property location in Diani Beach, Mombasa',
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData);
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(`${shareData.title} - ${shareData.text} - ${shareData.url}`);
            alert('Location details copied to clipboard!');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && locationPopup.style.display === 'block') {
            hideLocationPopup();
        }
    });
});