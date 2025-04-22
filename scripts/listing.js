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
});