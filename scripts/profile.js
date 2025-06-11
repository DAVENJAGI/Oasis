document.addEventListener('DOMContentLoaded', () => {
    const monthlyUserStats = {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        spending:       [100, 120, 95, 130, 110, 125, 108, 96, 120, 115, 100, 90],
        favoritesAdded:  [10, 12, 14,  8,  11,  9,   10, 13, 12, 15,  11,  7],
        housesRented:    [1,  1,   0,  2,   1,   1,   2,   1,  1,   2,   0,  1],
        messagesSent:    [5, 10,  6,  8,   7,   9,   8,  12, 10, 11,  9,   6]
    };
  
    const ctx = document.getElementById('userStatsChart').getContext('2d');
  
    const userStatsChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: monthlyUserStats.months,
        datasets: [
          {
            label: 'Spending (KES)',
            data: monthlyUserStats.spending,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Favorites Added',
            data: monthlyUserStats.favoritesAdded,
            borderColor: 'rgba(255, 206, 86, 1)',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Houses Rented',
            data: monthlyUserStats.housesRented,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
            tension: 0.4,
            pointStyle: 'circle',  
            pointRadius: 3,
            pointHoverRadius: 5, 
          },
          {
            label: 'Messages Sent',
            data: monthlyUserStats.messagesSent,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'My Monthly Activity Overview'
          },
          tooltip: {
            mode: 'index',
            intersect: false
          },
          legend: {
            labels: {
              usePointStyle: true
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Value'
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



    //SHOW AND HIDE PROFLE EDIT DIV
    function showProfileEditDiv() {
      const reviewDiv = document.getElementById('whole_profile_div_edit');
      const computedStyle = window.getComputedStyle(reviewDiv);
  
      if (computedStyle.display === 'none') {
          reviewDiv.style.display = 'block';
      }
  }
  function hideProfileEditDiv() {
      const reviewDiv = document.getElementById('whole_profile_div_edit');
      const computedStyle = window.getComputedStyle(reviewDiv);
  
      if (computedStyle.display === 'block') {
          reviewDiv.style.display = 'none';
      }
  }

  const editProfileButton = document.getElementById('edit_button');
  editProfileButton.addEventListener('click', () =>{
      showProfileEditDiv();
      showOverlay();
  })

  const hideEditProfileButton = document.getElementById('exit_edit_button');
  hideEditProfileButton.addEventListener('click', () =>{
      hideProfileEditDiv();
      hideOverlay();
  })
});