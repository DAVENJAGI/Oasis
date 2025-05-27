document.addEventListener('DOMContentLoaded', () => {
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

    //SHOW AND HIDE TICKET INFO DIV
    function showTicketInfo() {
        const ticketFeedbackDiv = document.getElementById('ticket_feedback_div');
        const computedStyle = window.getComputedStyle(ticketFeedbackDiv);
      
        if (computedStyle.display === 'none') {
            ticketFeedbackDiv.style.display = 'block';
        }
    }
    function hideTicketInfo() {
        const ticketFeedbackDiv = document.getElementById('ticket_feedback_div');
        const computedStyle = window.getComputedStyle(ticketFeedbackDiv);
      
        if (computedStyle.display === 'block') {
            ticketFeedbackDiv.style.display = 'none';
        }
    }

    const hideTicketFeedbackDiv = document.getElementById('exit_ticket_feedback_button');
    hideTicketFeedbackDiv.addEventListener('click', () => {
        hideOverlay1();
        hideTicketInfo();
    })

    const showTicketFeedbackDivButton = document.getElementById('ticket_div');
    showTicketFeedbackDivButton.addEventListener('click', () => {
        showOverlay1();
        showTicketInfo();
    })
})