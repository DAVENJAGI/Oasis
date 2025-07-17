document.addEventListener('DOMContentLoaded', () => {

    const userProfileAvatar = document.getElementById('route-to-user-profile');
    userProfileAvatar.addEventListener('click', () => {
        window.location.href = 'profile.html';
    })

    function isLoggedIn() {
        return !!sessionStorage.getItem('X-Custom-Token');
    }
      

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
            padding: 0.5em;
            box-sizing: border-box;
            overflow-y: hidden;
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
    
    if (writeReviewBtn1 && writeReviewBtn2) {
        writeReviewBtn1.addEventListener('click', function (e) {
          if (!isLoggedIn()) {
            notification.style.display = 'block';
            document.querySelector('.overlay').style.display = "block";
            document.querySelector(".notification-message").textContent = "You must be signed in to review this property.";
            document.querySelector(".notification-title").textContent = "Error";
            return;
            } else {
                e.preventDefault();
                showWriteReviewPopup();
            }
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
        const dismissBtn = document.getElementById('dismiss-btn');
        const closeNotif = document.querySelector('.close-btn');
        const notification = document.getElementById('notification');

        function closeNotification() {
            // notification.style.animation = 'slideOut 0.4s ease-in forwards';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 400);
        }

        function handlePrimary() {
            alert('Primary action clicked!');
            closeNotification();
        }
        if (closeNotif) {
            closeNotif.addEventListener('click', function () {
                notification.style.display = 'none';
                document.querySelector('.overlay').style.display = "none";
            });
        } 
        if (dismissBtn) {
            dismissBtn.addEventListener('click', function () {
                notification.style.display = 'none';
                document.querySelector('.overlay').style.display = "none";
            });
        }
        
        setTimeout(() => {
            const notification = document.getElementById('notification');
            if (notification.style.display !== 'none') {
                closeNotification();
            }
        }, 8000);

        if (showReportBtn && reportPopup) {
            showReportBtn.addEventListener('click', function () {
              if (!isLoggedIn()) {
                notification.style.display = 'block';
                document.querySelector('.overlay').style.display = "block";
                document.querySelector(".notification-message").textContent = "You must be signed in to rate or report this property.";
                document.querySelector(".notification-title").textContent = "Error";
                return;
            }
              
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

        
        if (showBookingBtn2 && showBookingBtn1) {
            (showBookingBtn2 || showBookingBtn1).addEventListener('click', function (e) {
              if (!isLoggedIn()) {
                notification.style.display = 'block';
                document.querySelector('.overlay').style.display = "block";
                document.querySelector(".notification-message").textContent = "You must be signed in to book this property.";
                document.querySelector(".notification-title").textContent = "Error";
                return;
                } else {
                    bookingPopup.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    generateCalendar()
                }
            });
        }

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
});

document.addEventListener('DOMContentLoaded', () => {
    const userId = sessionStorage.getItem('user_id');
    const listingId = sessionStorage.getItem('listingId');
    const customToken = sessionStorage.getItem('X-Custom-Token');
    let agentId;
    

    function getAuthHeaders() {
        return {
            'X-Custom-Token': customToken
        };
    }

    const CONFIG = {
        API_BASE_URL: 'https://oasis-mjmw.onrender.com/api/v1',
        ENDPOINTS: {
            LISTING_DETAILS: (listingId) => `/listings/${listingId}`,
            LISTING_AMENITIES: (listingId) => `/listing/${listingId}/amenities`,
            LISTING_RATING: (listingId) => `/listing/${listingId}/ratings`,
            LISTING_REVIEWS: (listingId) => `/listing/${listingId}/reviews`,
            LISTING_TAGS: (listingId) => `/listing/${listingId}/tags`,
            AGENT_DATA: (agentId) => `/agent/${agentId}`,
            TOWN_DATA: (townId) => `/towns/${townId}`,
            USER_DATA: (userId) => `/user/${userId}`
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

    //FETCH LISTING DETAILS
    async function fetchListing() {
        try {
            const listingData = await makeRequest(CONFIG.ENDPOINTS.LISTING_DETAILS(listingId), {
            headers: getAuthHeaders()
        });
        agentId = listingData.agent_id;
        const agentData = await fetchAgent(agentId); 
        const townData = await fetchTown(listingData.town_id); 
        appendListingDetails(listingData, agentData);
        fetchListingAmenities();
        fetchAgent(agentId);;
        fetchListingRating();
        fetchListingReviews();
        fetchListingTags();
        initializeMap(listingData, townData);
        } catch (error) {
            console.error("Error fetching favorite listings:", error);
        }
    } fetchListing();

    //FETCH LISTING AMENITIES
    async function fetchListingAmenities() {
        let amenityName = [];
        try {
            const listingAmenityData = await makeRequest(CONFIG.ENDPOINTS.LISTING_AMENITIES(listingId), {
            headers: getAuthHeaders()
        });
        amenityName = listingAmenityData.map(amenity => amenity.name);
        appendListingAmenities(amenityName);
        } catch (error) {
            console.error("Error fetching favorite listings:", error);
        }
    }

    //FETCH LISTING AMENITIES
    async function fetchListingTags() {
        try {
            const listingTagsData = await makeRequest(CONFIG.ENDPOINTS.LISTING_TAGS(listingId), {
            headers: getAuthHeaders()
        });
        appendListingTags(listingTagsData);
        } catch (error) {
            console.error("Error fetching favorite listings:", error);
        }
    }
    //APPEND THE TAGS TO THE LISTING TAGS DIV
    function appendListingTags(listingTagsData) {
        const tagContainer = document.querySelector('.tags_div');
        
        if (!tagContainer) {
            console.error('Container not found:', tagContainer);
            return;
        } else {
            tagContainer.innerHTML = '';
            if (listingTagsData > 0) {
                
                listingTagsData.forEach(tagText => {
                    const tag = document.createElement('span');
                    tag.className = 'tag';
                    tag.textContent = tagText;
                    tagContainer.appendChild(tag);
                });
            } else {
                if (tagContainer) {
                    const tag = document.createElement('span');
                    tag.className = 'tag';
                    tag.textContent = "No tags";
                    tagContainer.appendChild(tag);
                }
            }
        
        }
    }

    
    //FETCH USER
    async function fetchUser(userId) {
        try {
            const userData = await makeRequest(CONFIG.ENDPOINTS.USER_DATA(userId), {
            headers: getAuthHeaders()
        });
        return userData;
        } catch (error) {
            console.error("Error fetching favorite listings:", error);
        }
    }

    async function fetchTown (townId) {
        try {
            const townData = await makeRequest(CONFIG.ENDPOINTS.TOWN_DATA(townId), {
            headers: getAuthHeaders()
        });
        return townData;
        } catch (error) {
            console.error("Error fetching favorite listings:", error);
        }
    }

    //FETCH LISTING AGENT
    async function fetchAgent() {
        try {
            const agentData = await makeRequest(CONFIG.ENDPOINTS.AGENT_DATA(agentId), {
            headers: getAuthHeaders()
        });
        return agentData;
        } catch (error) {
            console.error("Error fetching favorite listings:", error);
        }
    }

    //FETCH LISTING RATINGS
    async function fetchListingRating() {
        try {
            const listingRatingData = await makeRequest(CONFIG.ENDPOINTS.LISTING_RATING(listingId), {
            headers: getAuthHeaders()
        });
        const scores = listingRatingData.map(rating => rating.score);
        const average = scores.reduce((a, b) => a + b, 0) / scores.length;
        colorStars(average, scores);
        appendReview(listingRatingData);
        } catch (error) {
            console.error("Error fetching favorite listings:", error);
        }
    }

    //FETCH LISTING REVIEWS
    async function fetchListingReviews() {
        try {
            const listingReviewsData = await makeRequest(CONFIG.ENDPOINTS.LISTING_REVIEWS(listingId), {
            headers: getAuthHeaders()
        });
        } catch (error) {
            console.error("Error fetching favorite listings:", error);
        }
    }


    const amenityIcons = {
        // STORAGE
        'closet': { icon: 'fas fa-tshirt', description: 'Spacious storage for all your belongings' },
        'wardrobe': { icon: 'fas fa-tshirt', description: 'Organized clothing storage space' },
        'storage': { icon: 'fas fa-box', description: 'Convenient storage solutions' },
        
        // KITCHEN
        'kitchen': { icon: 'fas fa-utensils', description: 'Fully equipped for all your culinary needs' },
        'dining': { icon: 'fas fa-utensils', description: 'Comfortable dining experience' },
        'restaurant': { icon: 'fas fa-utensils', description: 'On-site dining facilities' },
        'bar': { icon: 'fas fa-cocktail', description: 'Refreshing drinks and cocktails' },
        'coffee': { icon: 'fas fa-coffee', description: 'Fresh coffee and beverages' },
        'minibar': { icon: 'fas fa-wine-bottle', description: 'In-room refreshment options' },
        'microwave': { icon: 'fas fa-microchip', description: 'Quick and convenient food heating' },
        
        // RECREATION
        'pool': { icon: 'fas fa-swimming-pool', description: 'Refreshing swimming and relaxation area' },
        'swimming pool': { icon: 'fas fa-swimming-pool', description: 'Swimming facilities available' },
        'spa': { icon: 'fas fa-spa', description: 'Professional treatments and relaxation services' },
        'sauna': { icon: 'fas fa-hot-tub', description: 'Relaxing heat therapy for ultimate wellness' },
        'hot tub': { icon: 'fas fa-hot-tub', description: 'Luxurious hot tub experience' },
        'jacuzzi': { icon: 'fas fa-hot-tub', description: 'Relaxing jacuzzi facilities' },
        'gym': { icon: 'fas fa-dumbbell', description: 'Full fitness and exercise facilities' },
        'fitness': { icon: 'fas fa-dumbbell', description: 'Complete fitness center' },
        'yoga': { icon: 'fas fa-praying-hands', description: 'Peaceful yoga and meditation space' },
        'massage': { icon: 'fas fa-hand-holding-heart', description: 'Professional massage services' },
        
        // ENTERTAINMENT
        'cinema': { icon: 'fas fa-film', description: 'Private movie theater experience' },
        'theater': { icon: 'fas fa-film', description: 'Entertainment and movie facilities' },
        'tv': { icon: 'fas fa-tv', description: 'Smart TV entertainment system' },
        'smart tv': { icon: 'fas fa-tv', description: 'Advanced smart TV technology' },
        'music': { icon: 'fas fa-music', description: 'High-quality audio system' },
        'games': { icon: 'fas fa-gamepad', description: 'Gaming and entertainment options' },
        'library': { icon: 'fas fa-book', description: 'Quiet reading and study space' },
        
        // TRANSPORT
        'parking': { icon: 'fas fa-parking', description: 'Convenient vehicle parking spaces' },
        'parking lot': { icon: 'fas fa-parking', description: 'Dedicated parking area' },
        'garage': { icon: 'fas fa-warehouse', description: 'Covered parking garage' },
        'valet': { icon: 'fas fa-concierge-bell', description: 'Professional valet parking service' },
        
        // INTERNET
        'wifi': { icon: 'fas fa-wifi', description: 'High-speed internet connectivity' },
        'internet': { icon: 'fas fa-wifi', description: 'Reliable internet access' },
        'charging': { icon: 'fas fa-charging-station', description: 'Device charging stations' },
        'computer': { icon: 'fas fa-laptop', description: 'Computer and workstation access' },
        
        // SECURITY
        'security': { icon: 'fas fa-shield-alt', description: '24/7 security monitoring' },
        'cameras': { icon: 'fas fa-video', description: '24/7 security monitoring and protection' },
        'safe': { icon: 'fas fa-lock', description: 'Secure storage for valuables' },
        'alarm': { icon: 'fas fa-bell', description: 'Advanced security alarm system' },
        
        // ACCESSIBILITY
        'wheelchair': { icon: 'fas fa-wheelchair', description: 'Full accessibility features' },
        'wheelchair accessible': { icon: 'fas fa-wheelchair', description: 'Full accessibility features and accommodations' },
        'elevator': { icon: 'fas fa-elevator', description: 'Elevator access to all floors' },
        'wide hallways': { icon: 'fas fa-arrows-alt-h', description: 'Comfortable navigation throughout the space' },
        'ramp': { icon: 'fas fa-angle-up', description: 'Wheelchair accessible ramps' },
        
        // CLIMATE
        'air conditioning': { icon: 'fas fa-snowflake', description: 'Climate controlled environment' },
        'heating': { icon: 'fas fa-fire', description: 'Comfortable heating system' },
        'fan': { icon: 'fas fa-fan', description: 'Air circulation and cooling' },
        'balcony': { icon: 'fas fa-building', description: 'Private outdoor balcony space' },
        'outdoor grill': { icon: 'fas fa-hotdog', description: 'BBQ grill for outdoor cooking and fun' },
        'terrace': { icon: 'fas fa-mountain', description: 'Outdoor terrace area' },
        'garden': { icon: 'fas fa-seedling', description: 'Beautiful garden space' },
        
        // SERVICES
        'laundry': { icon: 'fas fa-tshirt', description: 'Laundry and cleaning services' },
        'washer': { icon: 'fas fa-soap', description: 'In-unit laundry washing machine' },
        'housekeeping': { icon: 'fas fa-broom', description: 'Professional housekeeping services' },
        'concierge': { icon: 'fas fa-concierge-bell', description: 'Personal concierge assistance' },
        'room service': { icon: 'fas fa-room-service', description: '24/7 room service available' },
        'water purifier': { icon: 'fas fa-tint', description: 'Clean, purified drinking water' },
        
        // OUTDOOR
        'beach': { icon: 'fas fa-umbrella-beach', description: 'Beach access and activities' },
        'golf': { icon: 'fas fa-golf-ball', description: 'Golf course and facilities' },
        'tennis': { icon: 'fas fa-table-tennis', description: 'Tennis court facilities' },
        'sports': { icon: 'fas fa-running', description: 'Various sports facilities' },
        'playground': { icon: 'fas fa-child', description: 'Children\'s playground area' },
        'rooftop': { icon: 'fas fa-building', description: 'Access to rooftop relaxation or views' },
        
        // BUSINESS
        'conference': { icon: 'fas fa-users', description: 'Professional conference facilities' },
        'meeting': { icon: 'fas fa-handshake', description: 'Meeting room facilities' },
        'office': { icon: 'fas fa-briefcase', description: 'Office space and business facilities' },
        'printing': { icon: 'fas fa-print', description: 'Printing and document services' },
        
        // DEFAULT
        'default': { icon: 'fas fa-star', description: 'Premium amenity available' }
    };

    //APPEND THE DETAILS TO THE LISTING DETAILS DIV
    async function appendListingDetails(listingData, agentData) {
        const container = document.querySelector('.main-content');
        if (!container) {
            console.error('Container not found:', container);
            return;
        } else {
            const townData = await fetchTown(listingData.town_id)
            const formattedPrice = listingData.price_by_night.toLocaleString();

            document.getElementById('property-title-txt').textContent = listingData.property_name;
            document.getElementById('property-type').textContent = listingData.property_type;
            document.getElementById('property-bed-no').textContent = listingData.number_rooms;
            document.getElementById('property-bath-no').textContent = listingData.number_bathrooms;
            document.getElementById('property-max-guest').textContent = listingData.max_guest;
            document.getElementById('property-description').textContent = listingData.description;
            document.getElementById('listing-price-per-night').textContent = formattedPrice;
            document.querySelector(".location-name-div").textContent = `${townData.state}, ${townData.town_name}`;
            document.querySelector(".location-popup-location-div").textContent = `${townData.state}, ${townData.town_name}`;
            document.querySelector(".location-coordinates").textContent = `Coordinates:  ${listingData.latitude}, ${listingData.longitude}`;
            
            document.getElementById('agent-names').textContent = `${agentData.first_name} ${agentData.last_name}`;

            if(agentData.is_verified !== false){
                document.querySelector('.agent-verified').style.display = "flex";
            }

            const propertyAvailabilityStatus = document.querySelector(".property-status");
            document.querySelector(".property-status-txt").textContent = listingData.rental_status;
            if (listingData.rental_status === "Available") {
                propertyAvailabilityStatus.style.color = "#38a169";
            } else if (listingData.rental_status === "Pending") {
                propertyAvailabilityStatus.style.color = "#FFC107"
            } else {
                propertyAvailabilityStatus.style.color = "red";
            }
        }
    }

    //APPEND THE AMENITIES TO THE LISTING AMENITIES DIV
    function appendListingAmenities(amenityName) {
        const amenityContainer = document.querySelector('.amenities-grid');
        const noAmenityContainer = document.querySelector('.no-amenities');
        

        if (!amenityContainer) {
            console.error('Container not found:', amenityContainer);
            return;
        } else {
            amenityContainer.innerHTML = '';
            if (Array.isArray(amenityName) && amenityName.length > 0) {
                amenityName.forEach(name => {
                    const amenityInfo = amenityIcons[name.toLowerCase()] || amenityIcons['default'];
            
                    const amenityItem = document.createElement('div');
                    amenityItem.classList.add('amenity-item');
            
                    amenityItem.innerHTML = `
                        <i class="${amenityInfo.icon} amenity-icon" title="${amenityInfo.description}"></i>
                        <span class="amenity-item-name">${name}</span>
                    `;
            
                    amenityContainer.appendChild(amenityItem);
                });
            
                if (noAmenityContainer) {
                    noAmenityContainer.style.display = "none";
                }
            } else {
                if (noAmenityContainer) {
                    noAmenityContainer.style.display = "block";
                }
            }
        
        }
    }

    //COLORING THE RATING STARS BASED ON RATING
    function colorStars(average, scores) {
        const stars = document.querySelectorAll(".rated_star");
        document.querySelector('.rating-in-reviews').textContent = `${average} ${"average rating"}`;
        document.querySelector(".rating-score").textContent = average || "0.0";
        document.querySelector(".rating-div-star").style.color = "gold";
        document.querySelector(".fa-users").style.color = "#86D5EE";
        document.querySelector(".based-on-reviews").textContent = `Based on ${scores.length} reviews`;
        document.querySelector(".no-of-reviewers").textContent = `${scores.length} total reviews`;
        document.querySelector(".reviews-count").textContent = `${scores.length} reviews`;
    
        stars.forEach((star, index) => {
            const starNumber = index + 1;
    
            if (average >= starNumber) {
                star.style.color = "#FFD700";
            } else if (average >= starNumber - 0.5) {
                star.style.color = "#FFD70080";
            } else {
                star.style.color = "#ccc";
            }
        });
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays <= 7) {
            return `${diffDays} days ago`;
        } else if (diffDays <= 30) {
            const weeks = Math.floor(diffDays / 7);
            return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
        } else {
            const months = Math.floor(diffDays / 30);
            return months === 1 ? '1 month ago' : `${months} months ago`;
        }
    }

    //REVIEW ELEMENT
    async function createReviewElement(review) {
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review-item';
        const reviewDate = formatDate(review.created_at);
        const userData = await fetchUser(review.user_id);
        

        if (userData) {

            if (userData.address) {
                try {
                    userLocation = 'Nairobi';
                } catch (err) {
                    console.error("Failed to fetch town data", err);
                    userLocation = userData.location || userData.city || userData.country || 'Kenya';
                }
            } else {
                userLocation = userData.location || userData.city || userData.country || 'Kenya';
            }
            
            userName = userData.first_name && userData.last_name 
                ? `${userData.first_name} ${userData.last_name}`
                : userData.username || userData.email?.split('@')[0] || 'User';
            
            if (userData.profile_picture || userData.avatar) {
                userAvatar = `<img src="${userData.profile_picture || userData.avatar}" alt="User Avatar">`;
            } else {
                const initials = userData.first_name && userData.last_name 
                    ? `${userData.first_name[0]}${userData.last_name[0]}`.toUpperCase()
                    : generateInitials(review.user_id);
                userAvatar = initials;
            }
            
            if (userData.is_verified || userData.verified) {
                verifiedStatus = `
                    <div class="verified-badge">
                        <i class="fas fa-check-circle"></i>
                        Verified
                    </div>
                `;
            } else{
                verifiedStatus = "";
            }
        } else {
            userAvatar = generateInitials(review.user_id);
            userName = `User ${review.user_id.slice(-8)}`;
            userLocation = 'Kenya';
        }
        
        
        reviewDiv.innerHTML = `
            <div class="review-header">
                <div class="user-avatar">${userAvatar}</div>
                <div class="user-info">
                    <div class="user-name">${userName}</div>
                    <div class="user-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${userLocation}, Kenya
                    </div>
                </div>
                <div class="review-meta">
                    ${verifiedStatus}
                    <div class="review-date">
                        <i class="fas fa-calendar-alt"></i>
                            ${reviewDate}
                    </div>
                </div>
            </div>
            <div class="review-text">
                ${review.description}
            </div>
            <div class="review-actions">
                <button class="action-btn">
                    <i class="fas fa-thumbs-up"></i>
                    Helpful (0)
                </button>
                <button class="action-btn">
                    <i class="fas fa-reply"></i>
                    Reply
                </button>
                <button class="action-btn">
                    <i class="fas fa-flag"></i>
                    Report
                </button>
            </div>
        `;
        
        return reviewDiv;
    }
    

    //APPEND TO REVIEWS
    async function appendReview(listingRatingData) {
        const container = document.querySelector('.reviews-container');
        if (!container) {
            console.error('Container not found:', container);
            return;
        } else {
            container.innerHTML = "";
            
            if(listingRatingData.length !== 0) {
                for (const review of listingRatingData) {
                    const reviewDiv = await createReviewElement(review);
                    container.appendChild(reviewDiv);
                }
            } else {
                document.querySelector('.no-reviews').style.display = 'block';
            }
        }
    }


    //LOCATION MAP
    const locationOverlay = document.getElementById('location-overlay');
    const locationPopup = document.getElementById('location-popup');
    const closeLocationPopup = document.getElementById('close-location-popup');
    const getDirectionsBtn = document.getElementById('get-directions');
    const shareLocationBtn = document.getElementById('share-location');
    const showLocationBtn = document.getElementById('show-location');
            

    let map;
    let marker;

    function showLocationPopup() {
        locationOverlay.style.display = 'block';
        locationPopup.style.display = 'block';
        
        if (!map) {
            setTimeout(() => {
                initializeMap();
                map.invalidateSize();
            }, 200);
        }
    }

    function hideLocationPopup() {
        locationOverlay.style.display = 'none';
        locationPopup.style.display = 'none';
    }

    let lat;
    let lng;
    let locationListingData;
    function initializeMap(listingData, townData) {
        lat = `${listingData.latitude}`;
        lng = `${listingData.longitude}`;
        locationListingData = listingData;
        
        map = L.map('location-map').setView([lat, lng], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        marker = L.marker([lat, lng])
            .addTo(map)
            .bindPopup(`${listingData.property_name}<br>${townData.state}, ${townData.town_name}`)
            .openPopup();
    }

    showLocationBtn.addEventListener('click', showLocationPopup);
    closeLocationPopup.addEventListener('click', hideLocationPopup);
    locationOverlay.addEventListener('click', hideLocationPopup);

    locationPopup.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    
    getDirectionsBtn.addEventListener('click', () => {
        if (lat && lng) {
            const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
            window.open(url, '_blank');
        } else {
            alert("Location coordinates not available.");
        }
    });

    shareLocationBtn.addEventListener('click', () => {
        const shareData = {
            title: `${locationListingData.property_name} Location`,
            text: 'Check out this amazing property',
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData);
        } else {
            navigator.clipboard.writeText(`${shareData.title} - ${shareData.text} - ${shareData.url}`);
            alert('Location details copied to clipboard!');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && locationPopup.style.display === 'block') {
            hideLocationPopup();
        }
    });


})