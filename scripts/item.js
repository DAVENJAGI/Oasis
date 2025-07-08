document.addEventListener('DOMContentLoaded', () => {

    const tags = [
        'Furnished',
        'Pet Friendly',
        'Wi-Fi Included',
        'Near School',
        'Parking Available',
        'Balcony',
        '24/7 Security'
    ];
    

    const tagsDiv = document.querySelector('.tags_div');
    
    tags.forEach(tagText => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = tagText;
        tagsDiv.appendChild(tag);
    });


    const showLocationBtn = document.getElementById('show-location');
    const locationOverlay = document.getElementById('location-overlay');
    const locationPopup = document.getElementById('location-popup');
    const closeLocationPopup = document.getElementById('close-location-popup');
    const getDirectionsBtn = document.getElementById('get-directions');
    const shareLocationBtn = document.getElementById('share-location');

    let map;
    let marker;

    // Show location popup
    function showLocationPopup() {
        locationOverlay.style.display = 'block';
        locationPopup.style.display = 'block';
        
        // Initialize map if not already done
        if (!map) {
            setTimeout(() => {
                initializeMap();
            }, 100);
        }
    }

    // Hide location popup
    function hideLocationPopup() {
        locationOverlay.style.display = 'none';
        locationPopup.style.display = 'none';
    }

    // Initialize Leaflet map
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

    // Event listeners
    showLocationBtn.addEventListener('click', showLocationPopup);
    closeLocationPopup.addEventListener('click', hideLocationPopup);
    locationOverlay.addEventListener('click', hideLocationPopup);

    // Prevent popup from closing when clicking inside it
    locationPopup.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Get directions button
    getDirectionsBtn.addEventListener('click', () => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=-1.071981,37.094347`;
        window.open(url, '_blank');
    });

    // Share location button
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

    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && locationPopup.style.display === 'block') {
            hideLocationPopup();
        }
    });


    //SHOW PRICES OF LISING 
    const pricingData = [
        { month: 'Jan', price: 120, season: 'Low Season' },
        { month: 'Feb', price: 120, season: 'Low Season' },
        { month: 'Mar', price: 130, season: 'Low Season' },
        { month: 'Apr', price: 130, season: 'Low Season' },
        { month: 'May', price: 140, season: 'Low Season' },
        { month: 'Jun', price: 180, season: 'High Season' },
        { month: 'Jul', price: 180, season: 'High Season' },
        { month: 'Aug', price: 180, season: 'High Season' },
        { month: 'Sep', price: 170, season: 'High Season' },
        { month: 'Oct', price: 170, season: 'High Season' },
        { month: 'Nov', price: 200, season: 'Peak Season' },
        { month: 'Dec', price: 220, season: 'Peak Season' }
    ];

    // Function to show pricing popup
    function showPricingPopup() {
        const popup = document.getElementById('pricing-popup');
        if (popup) {
            popup.classList.add('active');
            document.body.style.overflow = 'hidden'; 
            addChartContainer();
            
            setTimeout(() => {
                initializePriceChart();
            }, 300);
        }
    }

    // HIDE PRICING POPUP
    function hidePricingPopup() {
        const popup = document.getElementById('pricing-popup');
        if (popup) {
            popup.classList.remove('active');
            document.body.style.overflow = '';
            destroyExistingChart();
        }
    }

    function addChartContainer() {
        const pricingInfo = document.querySelector('.pricing-info');
        if (pricingInfo && !document.getElementById('price-chart-container')) {
            const chartContainer = document.createElement('div');
            chartContainer.id = 'price-chart-container';
            chartContainer.innerHTML = `
                <div class="chart-header">
                    <h4><i class="fas fa-chart-line"></i> Price Trends Throughout the Year</h4>
                </div>
                <div class="chart-wrapper">
                    <canvas id="priceChart" width="400" height="200"></canvas>
                </div>
            `;
            
            pricingInfo.insertAdjacentElement('afterend', chartContainer);
            chartContainer.style.backgroundColor = "var(--current-glass-bg)"
        }
    }

    
    let priceChart = null;
    function initializePriceChart() {
        const ctx = document.getElementById('priceChart');
        if (!ctx) return;
        
        // Destroy existing chart if it exists
        destroyExistingChart();
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-text-color').trim();
        
        const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(134, 213, 238, 0.8)');
        gradient.addColorStop(1, 'rgba(134, 213, 238, 0.1)')
        
        const config = {
            type: 'line',
            data: {
                labels: pricingData.map(item => item.month),
                datasets: [{
                    label: 'Price per Night ($)',
                    data: pricingData.map(item => item.price),
                    borderColor: '#86D5EE',
                    backgroundColor: gradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#86D5EE',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointHoverBackgroundColor: '#86D5EE',
                    pointHoverBorderColor: '#ffffff',
                    pointHoverBorderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: primaryColor,
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: primaryColor,
                        bodyColor: '#fff',
                        borderColor: '#86D5EE',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                const dataPoint = pricingData[context.dataIndex];
                                return [
                                    `Price: $${context.parsed.y}/night`,
                                    `Season: ${dataPoint.season}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 100,
                        max: 240,
                        ticks: {
                            color: primaryColor,
                            font: {
                                size: 11
                            },
                            callback: function(value) {
                                return '$' + value;
                            }
                        },
                        grid: {
                            color: '#e9ecef',
                            lineWidth: 1
                        }
                    },
                    x: {
                        ticks: {
                            color: primaryColor,
                            font: {
                                size: 11
                            }
                        },
                        grid: {
                            color: '#e9ecef',
                            lineWidth: 1
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        };
        
        priceChart = new Chart(ctx, config);
    }

    //DESCTROY PRE EXISTING CHART TO ADD DATA TO IT
    function destroyExistingChart() {
        if (priceChart) {
            priceChart.destroy();
            priceChart = null;
        }
    }

    
    addChartStyles();
        
    //SHOW PRICE CHART DIV
    const showPricingBtn = document.getElementById('show-pricing-btn');
        
    if (showPricingBtn) {
        showPricingBtn.addEventListener('click', showPricingPopup);
    }
        
    //CLOSE PRICE CHART DIV
    const closePricingBtn = document.getElementById('close-pricing-popup');
    if (closePricingBtn) {
        closePricingBtn.addEventListener('click', hidePricingPopup);
    }
        
    const pricingPopup = document.getElementById('pricing-popup');
    if (pricingPopup) {
        pricingPopup.addEventListener('click', function(e) {
            if (e.target === pricingPopup) {
                hidePricingPopup();
            }
        });
    }
        
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hidePricingPopup();
        }
    });
        
    const viewCalendarBtn = document.getElementById('view-calendar');
    if (viewCalendarBtn) {
        viewCalendarBtn.addEventListener('click', function() {
            alert('Opening calendar view...');
        });
    }
        
    const bookNowBtn = document.getElementById('book-now');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function() {
            alert('Redirecting to booking page...');
        });
    }
    

    
    function addChartStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #price-chart-container {
                margin: 25px 0;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 12px;
                border-left: 4px solid #86D5EE;
            }
            
            .chart-header {
                margin-bottom: 20px;
            }
            
            .chart-header h4 {
                margin: 0;
                font-size: 1.2rem;
                font-weight: 600;
                color: #333;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .chart-header i {
                color: "var(--primary-color)";
                font-size: 1.1rem;
            }
            
            .chart-wrapper {
                position: relative;
                height: 250px;
                background: white;
                border-radius: 8px;
                padding: 15px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            
            @media (max-width: 768px) {
                .chart-wrapper {
                    height: 200px;
                    padding: 10px;
                }
                
                #price-chart-container {
                    padding: 15px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function updatePricingData(newData) {
        pricingData.length = 0;
        pricingData.push(...newData);
        
        if (priceChart) {
            priceChart.data.labels = pricingData.map(item => item.month);
            priceChart.data.datasets[0].data = pricingData.map(item => item.price);
            priceChart.update();
        }
    }

    window.PricingPopup = {
        show: showPricingPopup,
        hide: hidePricingPopup,
        updateData: updatePricingData
    };



    //SHOWING AND HIDING THE REVIEWS DIV 
    const seeReviewsBtn = document.getElementById('see-reviews-btn'); // You'll need to add this ID to your button
    const reviewsPopup = document.getElementById('reviews-popup');
    const closeReviewsBtn = document.getElementById('close-reviews-popup');
    const overlay = createOverlay();
    
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'reviews-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(8px);
            z-index: 1001;
            display: none;
            justify-content: center;
            align-items: center;
            padding: 20px;
            box-sizing: border-box;
            overflow-y: auto;
        `;
        document.body.appendChild(overlay);
        return overlay;
    }
    
    function showReviewsPopup() {
        overlay.style.display = 'flex';
        overlay.appendChild(reviewsPopup);
        reviewsPopup.style.display = 'block';
        document.body.style.overflow = 'hidden';
        reviewsPopup.classList.add('popup-visible');
    }
    
    function hideReviewsPopup() {
        overlay.style.display = 'none';
        reviewsPopup.style.display = 'none';
        document.body.style.overflow = '';
        reviewsPopup.classList.remove('popup-visible');
    }
    
    if (seeReviewsBtn) {
        seeReviewsBtn.addEventListener('click', showReviewsPopup);
    }
    
    if (closeReviewsBtn) {
        closeReviewsBtn.addEventListener('click', hideReviewsPopup);
    }
    
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            hideReviewsPopup();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.style.display === 'flex') {
            hideReviewsPopup();
        }
    });
    reviewsPopup.style.display = 'none';
    reviewsPopup.style.transition = 'all 0.3s ease-out';


    // SHOWING AND HIDING THE WRITE A REVIEW DIV
    
    const writeReviewBtn1 = document.getElementById('write-reviews-btn');
    const writeReviewBtn2 = document.getElementById('write-review-btn-2');
    const writeReviewPopup = document.getElementById('write-review-popup');
    const closeWriteReviewBtn = document.getElementById('close-write-review-popup');
    const writeReviewOverlay = createWriteReviewOverlay();
    
    function createWriteReviewOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'write-review-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(8px);
            z-index: 1001;
            display: none;
            justify-content: center;
            align-items: center;
            padding: 20px;
            box-sizing: border-box;
            overflow-y: auto;
        `;
        document.body.appendChild(overlay);
        return overlay;
    }
    
    function showWriteReviewPopup() {
        writeReviewOverlay.style.display = 'flex';
        writeReviewOverlay.appendChild(writeReviewPopup);
        writeReviewPopup.style.display = 'block';
        document.body.style.overflow = 'hidden';
        writeReviewPopup.classList.add('popup-visible');
        
        setTimeout(() => {
            const firstInput = document.getElementById('reviewer-name');
            if (firstInput) firstInput.focus();
        }, 300);
    }
    
    function hideWriteReviewPopup() {
        writeReviewOverlay.style.display = 'none';
        writeReviewPopup.style.display = 'none';
        document.body.style.overflow = '';
        writeReviewPopup.classList.remove('popup-visible');
    }
    
    function resetReviewForm() {
        const form = document.getElementById('review-form');
        if (form) {
            form.reset();
            
            document.querySelectorAll('.star-rating').forEach(rating => {
                rating.dataset.selectedValue = '0';
                rating.querySelectorAll('.star').forEach(star => {
                    star.classList.remove('active');
                    star.style.color = '#ddd';
                });
            });
            
            const charCount = document.getElementById('char-count');
            if (charCount) {
                charCount.textContent = '0';
                charCount.style.color = '#666';
            }
        }
    }
    

    function handleReviewSubmission(formData) {
        const submitBtn = document.getElementById('submit-review');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            showSuccessNotification('Thank you for your review! It will be published after moderation.');
            
            localStorage.removeItem('reviewDraft');
            resetReviewForm();
            hideWriteReviewPopup();
        }, 2000);
    }
    
    function showSuccessNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 1002;
            font-size: 14px;
            max-width: 300px;
            animation: slideInRight 0.3s ease-out;
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    

    function confirmClose() {
        const form = document.getElementById('review-form');
        const formData = new FormData(form);
        let hasData = false;
        
        // Check if form has any data
        for (let [key, value] of formData.entries()) {
            if (value && value.trim() !== '') {
                hasData = true;
                break;
            }
        }
        
        // Check if any ratings are selected
        const hasRatings = Array.from(document.querySelectorAll('.star-rating')).some(rating => {
            return parseInt(rating.dataset.selectedValue || '0') > 0;
        });
        
        if (hasData || hasRatings) {
            return confirm('You have unsaved changes. Are you sure you want to close without saving?');
        }
        
        return true;
    }
    
    if (writeReviewBtn1) {
        writeReviewBtn1.addEventListener('click', function(e) {
            e.preventDefault();
            showWriteReviewPopup();
        });
    }
    if (writeReviewBtn2) {
        writeReviewBtn2.addEventListener('click', function(e) {
            e.preventDefault();
            showWriteReviewPopup();
        });
    }
    
    if (closeWriteReviewBtn) {
        closeWriteReviewBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirmClose()) {
                hideWriteReviewPopup();
            }
        });
    }
    
    writeReviewOverlay.addEventListener('click', function(e) {
        if (e.target === writeReviewOverlay) {
            if (confirmClose()) {
                hideWriteReviewPopup();
            }
        }
    });
    
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && writeReviewOverlay.style.display === 'flex') {
            if (confirmClose()) {
                hideWriteReviewPopup();
            }
        }
    });
    
    
    document.getElementById('submit-review').addEventListener('click', function(e) {
        e.preventDefault();
        
        const ratings = {};
        document.querySelectorAll('.star-rating').forEach(rating => {
            const type = rating.dataset.rating;
            const value = parseInt(rating.dataset.selectedValue) || 0;
            ratings[type] = value;
        });
        
        
        if (ratings.overall === 0) {
            alert('Please provide an overall rating');
            return;
        }
        
        const formData = {
            name: document.getElementById('reviewer-name').value,
            email: document.getElementById('reviewer-email').value,
            title: document.getElementById('review-title').value,
            text: document.getElementById('review-text').value,
            ratings: ratings,
            timestamp: new Date().toISOString()
        };
        
        if (!formData.name || !formData.email || !formData.title || !formData.text) {
            alert('Please fill in all required fields');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        handleReviewSubmission(formData);
    });
    
    document.getElementById('save-draft').addEventListener('click', function(e) {
        e.preventDefault();
        
        const ratings = {};
        document.querySelectorAll('.star-rating').forEach(rating => {
            const type = rating.dataset.rating;
            const value = parseInt(rating.dataset.selectedValue) || 0;
            ratings[type] = value;
        });
        
        const formData = {
            name: document.getElementById('reviewer-name').value,
            email: document.getElementById('reviewer-email').value,
            title: document.getElementById('review-title').value,
            text: document.getElementById('review-text').value,
            ratings: ratings,
            savedAt: new Date().toISOString()
        };
        
        localStorage.setItem('reviewDraft', JSON.stringify(formData));
        
        showSuccessNotification('Draft saved successfully!');
        
        const btn = this;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Saved';
        btn.style.background = '#4CAF50';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
    });
    

    function loadDraft() {
        const draft = localStorage.getItem('reviewDraft');
        if (draft) {
            try {
                const formData = JSON.parse(draft);
                
                document.getElementById('reviewer-name').value = formData.name || '';
                document.getElementById('reviewer-email').value = formData.email || '';
                document.getElementById('review-title').value = formData.title || '';
                document.getElementById('review-text').value = formData.text || '';
                
                if (formData.ratings) {
                    Object.entries(formData.ratings).forEach(([type, value]) => {
                        const rating = document.querySelector(`[data-rating="${type}"]`);
                        if (rating && value > 0) {
                            rating.dataset.selectedValue = value;
                            const stars = rating.querySelectorAll('.star');
                            stars.forEach((star, index) => {
                                if (index < value) {
                                    star.classList.add('active');
                                    star.style.color = '#ffd700';
                                } else {
                                    star.classList.remove('active');
                                    star.style.color = '#ddd';
                                }
                            });
                        }
                    });
                }
                

                const reviewText = document.getElementById('review-text');
                const charCount = document.getElementById('char-count');
                const count = reviewText.value.length;
                charCount.textContent = count;
                
                setTimeout(() => {
                    showSuccessNotification('Draft loaded from previous session');
                }, 500);
                
            } catch (error) {
                console.error('Error loading draft:', error);
                localStorage.removeItem('reviewDraft');
            }
        }
    }

    //REPORT DIV HANDLING OF DATA
    
        const reportPopup = document.getElementById('report-listing-popup');
        const showReportBtn = document.getElementById('report-listing-btn');
        const closeReportBtn = document.getElementById('close-report-popup');
        const cancelReportBtn = document.getElementById('cancel-report');
        const submitReportBtn = document.getElementById('submit-report');
        const reportForm = document.getElementById('report-form');
        const reportDescription = document.getElementById('report-description');
        const charCount = document.getElementById('char-count');

        if (showReportBtn && reportPopup) {
            showReportBtn.addEventListener('click', function () {
                reportPopup.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        function hideReportPopup() {
            console.log('Hiding poup....');
            reportPopup.classList.remove('active');
            document.body.style.overflow = '';
        }

        closeReportBtn.addEventListener('click', hideReportPopup);
        cancelReportBtn.addEventListener('click', hideReportPopup);

        reportPopup.addEventListener('click', function(e) {
            if (e.target === reportPopup) {
                hideReportPopup();
            }
        });

        const reasonOptions = document.querySelectorAll('.reason-option');
        reasonOptions.forEach(option => {
            option.addEventListener('click', function() {
                reasonOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                const radio = this.querySelector('input[type="radio"]');
                radio.checked = true;
            });
        });

        const urgencyOptions = document.querySelectorAll('.urgency-option');
        urgencyOptions.forEach(option => {
            option.addEventListener('click', function() {
                urgencyOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                const radio = this.querySelector('input[type="radio"]');
                radio.checked = true;
            });
        });

        
        reportDescription.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            if (count > 1400) {
                charCount.style.color = '#ff6b6b';
            } else if (count > 1200) {
                charCount.style.color = '#ffa500';
            } else {
                charCount.style.color = '#666';
            }
        });

        reportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const reportData = {
                name: formData.get('reporter-name') || document.getElementById('reporter-name').value,
                email: formData.get('reporter-email') || document.getElementById('reporter-email').value,
                reason: formData.get('report-reason'),
                urgency: formData.get('urgency'),
                title: document.getElementById('report-title').value,
                description: document.getElementById('report-description').value,
                timestamp: new Date().toISOString()
            };

            if (!reportData.name || !reportData.email || !reportData.reason || !reportData.title || !reportData.description) {
                alert('Please fill in all required fields.');
                return;
            }

            submitReportBtn.disabled = true;
            submitReportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

            setTimeout(() => {
                console.log('Report submitted:', reportData);
                alert('Thank you for your report. We will review it within 24-48 hours and take appropriate action.');
                
                reportForm.reset();
                reasonOptions.forEach(opt => opt.classList.remove('selected'));
                urgencyOptions.forEach(opt => opt.classList.remove('selected'));
                charCount.textContent = '0';
                
                submitReportBtn.disabled = false;
                submitReportBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Report';
                
                hidePopup();
            }, 1500);
        });

        
        const evidenceInput = document.getElementById('evidence-input');
        evidenceInput.addEventListener('change', function() {
            const files = this.files;
            if (files.length > 0) {
                const uploadText = document.querySelector('.upload-text');
                uploadText.textContent = `${files.length} file(s) selected`;
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && reportPopup.classList.contains('active')) {
                hidePopup();
            }
        });

    //CREATING A LISTING BOOKING
    
        const bookingPopup = document.getElementById('booking-popup');
        const showBookingBtn1 = document.getElementById('book-listing-btn-1');
        const showBookingBtn2 = document.getElementById('book-listing-btn-2');
        const closeBookingBtn = document.getElementById('close-booking-popup');
        const cancelBookingBtn = document.getElementById('cancel-booking');
        const confirmBookingBtn = document.getElementById('confirm-booking');
        const bookingForm = document.getElementById('booking-form');

        // Calendar elements
        const calendarGrid = document.getElementById('calendar-grid');
        const currentMonthSpan = document.getElementById('current-month');
        const prevMonthBtn = document.getElementById('prev-month');
        const nextMonthBtn = document.getElementById('next-month');

        // Form elements
        const startDateInput = document.getElementById('start-date');
        const endDateInput = document.getElementById('end-date');
        const checkinDisplay = document.getElementById('checkin-display');
        const checkoutDisplay = document.getElementById('checkout-display');
        const nightsDisplay = document.getElementById('nights-display');
        const totalDisplay = document.getElementById('total-display');

        let currentDate = new Date();
        let selectedStartDate = null;
        let selectedEndDate = null;
        const pricePerNight = 120;

        
        const unavailableDates = [
            '2025-07-15', '2025-07-16', '2025-07-25', '2025-07-26',
            '2025-08-05', '2025-08-06', '2025-08-12', '2025-08-13'
        ];

        showBookingBtn1.addEventListener('click', function() {
            bookingPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
            generateCalendar();
        });

        showBookingBtn2.addEventListener('click', function() {
            bookingPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
            generateCalendar();
        });

        function hidePopup() {
            bookingPopup.classList.remove('active');
            document.body.style.overflow = '';
        }

        closeBookingBtn.addEventListener('click', hidePopup);
        cancelBookingBtn.addEventListener('click', hidePopup);

        bookingPopup.addEventListener('click', function(e) {
            if (e.target === bookingPopup) {
                hidePopup();
            }
        });

        prevMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            generateCalendar();
        });

        nextMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            generateCalendar();
        });

        function generateCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const today = new Date();
            
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
            currentMonthSpan.textContent = `${monthNames[month]} ${year}`;

            calendarGrid.innerHTML = '';
            
            const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            dayHeaders.forEach(day => {
                const dayHeader = document.createElement('div');
                dayHeader.className = 'calendar-day-header';
                dayHeader.textContent = day;
                calendarGrid.appendChild(dayHeader);
            });

            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const startingDayOfWeek = firstDay.getDay();
            const daysInMonth = lastDay.getDate();

            
            for (let i = 0; i < startingDayOfWeek; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day other-month';
                calendarGrid.appendChild(emptyDay);
            }

            
            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = day;
                
                const dayDate = new Date(year, month, day);
                const dayString = dayDate.toISOString().split('T')[0];
                
                if (dayDate < today) {
                    dayElement.classList.add('disabled');
                } else if (unavailableDates.includes(dayString)) {
                    dayElement.classList.add('unavailable');
                } else {
                    dayElement.addEventListener('click', () => selectDate(dayDate));
                }
                
                if (dayDate.toDateString() === today.toDateString()) {
                    dayElement.classList.add('today');
                }
                
                if (selectedStartDate && dayDate.toDateString() === selectedStartDate.toDateString()) {
                    dayElement.classList.add('range-start');
                }
                if (selectedEndDate && dayDate.toDateString() === selectedEndDate.toDateString()) {
                    dayElement.classList.add('range-end');
                }
                
                if (selectedStartDate && selectedEndDate) {
                    if (dayDate > selectedStartDate && dayDate < selectedEndDate) {
                        dayElement.classList.add('range-middle');
                    }
                }
                
                calendarGrid.appendChild(dayElement);
            }
        }

        function selectDate(date) {
            if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
                selectedStartDate = date;
                selectedEndDate = null;
            } else if (date > selectedStartDate) {
                selectedEndDate = date;
            } else {
                selectedStartDate = date;
                selectedEndDate = null;
            }
            
            updateDateInputs();
            updateBookingSummary();
            generateCalendar();
        }

        function updateDateInputs() {
            if (selectedStartDate) {
                startDateInput.value = selectedStartDate.toISOString().split('T')[0];
                checkinDisplay.textContent = selectedStartDate.toLocaleDateString();
            }
            
            if (selectedEndDate) {
                endDateInput.value = selectedEndDate.toISOString().split('T')[0];
                checkoutDisplay.textContent = selectedEndDate.toLocaleDateString();
            }
            
            if (!selectedStartDate) {
                startDateInput.value = '';
                checkinDisplay.textContent = 'Select dates';
            }
            
            if (!selectedEndDate) {
                endDateInput.value = '';
                checkoutDisplay.textContent = 'Select dates';
            }
        }
        
        function updateBookingSummary() {
            if (selectedStartDate && selectedEndDate) {
                const timeDiff = selectedEndDate.getTime() - selectedStartDate.getTime();
                const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
                const totalPrice = nights * pricePerNight;
                
                nightsDisplay.textContent = nights;
                totalDisplay.textContent = `$${totalPrice.toFixed(2)}`;
            } else {
                nightsDisplay.textContent = '0';
                totalDisplay.textContent = '$0.00';
            }
        }

        
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!selectedStartDate || !selectedEndDate) {
                alert('Please select your check-in and check-out dates.');
                return;
            }
            
            const formData = new FormData(this);
            const nights = Math.ceil((selectedEndDate.getTime() - selectedStartDate.getTime()) / (1000 * 3600 * 24));
            const totalPrice = nights * pricePerNight;
            
            const bookingData = {
                user_id: 'current_user_id',
                listing_id: 'current_listing_id',
                start_date: selectedStartDate.toISOString().split('T')[0],
                end_date: selectedEndDate.toISOString().split('T')[0],
                guest_name: document.getElementById('guest-name').value,
                guest_email: document.getElementById('guest-email').value,
                guest_phone: document.getElementById('guest-phone').value,
                guest_count: document.getElementById('guest-count').value,
                special_requests: document.getElementById('special-requests').value,
                total_price: totalPrice,
                status: 'Pending'
            };
            
            confirmBookingBtn.disabled = true;
            confirmBookingBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            setTimeout(() => {
                console.log('Booking submitted:', bookingData);
                alert(`Booking confirmed! Total: $${totalPrice.toFixed(2)} for ${nights} nights.`);
                
                bookingForm.reset();
                selectedStartDate = null;
                selectedEndDate = null;
                updateDateInputs();
                updateBookingSummary();
                generateCalendar();
                
                confirmBookingBtn.disabled = false;
                confirmBookingBtn.innerHTML = '<i class="fas fa-check"></i> Confirm Booking';
                
                hidePopup();
            }, 2000);
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && bookingPopup.classList.contains('active')) {
                hidePopup();
            }
        });

        generateCalendar();


        //TOGGLE AND ACTIVATE DARK MODE AND LIGHT MODE
        
            // Get the specific dark mode toggle button
            const themeIcon = document.getElementById('theme-icon');
            const changeColorButton = document.getElementById('change-color-theme-button');
            const themeButton = document.querySelector('.theme-toggle');
            const body = document.body;
    
            // Moon icon SVG (for light theme)
            const moonIconSVG = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
            
            const sunIconSVG = `<circle cx="12" cy="12" r="5"></circle>
                                <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>`;
    
            // Initialize theme
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
    
            // Set light theme
            function setLightTheme() {
                body.classList.add('light-theme');
                themeIcon.innerHTML = moonIconSVG;
                themeButton.setAttribute('data-tooltip', 'Dark Mode');
                localStorage.setItem('theme', 'light');
            }
    
            // Set dark theme
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
});