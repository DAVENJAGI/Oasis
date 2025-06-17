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

    
    //headers
    const userProfileImage = document.getElementById("user_profile_icon");
    const imageUrl = localStorage.getItem('profile_image');
    const userId = localStorage.getItem('user_id');
    const customToken = localStorage.getItem('X-Custom-Token');

    function getAuthHeaders() {
        return {
            'X-Custom-Token': customToken
        };
    }

    function fetchUserName(userId) {
        return fetch(`http://0.0.0.0:5000/api/v1/user/${userId}`, {
            headers: {
                ...getAuthHeaders(),
            },
        })
        .then(response => response.json())
        .then(user => {
            return `${user.first_name} ${user.last_name}`;
        })
        .catch(error => {
            console.error("Error fetching user name:", error);
            return "Unknown User";
        });
    }
    function fetchUserTicketDetails() {
        fetch (`http://0.0.0.0:5000/api/v1/user/${userId}/tickets`, {
            headers: {
                ...getAuthHeaders(),
            },
        })
        .then(response => response.json())
        .then(async data => {
            let userFullName = await fetchUserName(userId); 

            if(userProfileImage && imageUrl) {
              userProfileImage.style.backgroundImage = `url('${imageUrl}')`;
              userProfileImage.style.backgroundSize = "cover";
              userProfileImage.style.backgroundPosition = "center";     
              userProfileImage.style.borderRadius = "50%";   
            } else {
                const defaultProfileIconHTML = `
                <div id="profile_image_icon">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-6 profile-icon">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                              </svg>
                </div>
                `;
                userProfileImage.outerHTML = defaultProfileIconHTML;
            }

            data.forEach(ticket => {
                const ticketDiv = document.createElement("div");
                const container = document.getElementById("ticket_div");
                const divBackgroundColor = document.getElementById('resolved_div')

                const statusColors = {
                    "Open": "#e6f4ff",
                    "Closed": "#f0f0f0",
                    "Pending": "#fff3cd",
                    "On-hold": "#ffe0b2",
                    "Solved": "#d4edda",
                    "Awaiting-response": "#f8d7da"
                };
               /* 
                ticketDiv.style.backgroundColor = statusColors[ticket.ticket_status] || "#ffffff";
                */
                ticketDiv.id = "ticket_div_body";
            
                ticketDiv.innerHTML = `
                    <div id="checkbox_box" class="ticket_div_body_items">
                        <input type="checkbox" id="ticket_checkbox" name="ticket_checkbox">
                    </div>
                    <div class="ticket_div_body_items">
                        <div class="resolved_div">${ticket.ticket_status}</div>
                    </div>
                    <div id="subject_txt" class="ticket_div_body_items">${ticket.description}</div>
                    <div class="ticket_div_body_items">${userFullName}</div>
                    <div class="ticket_div_body_items">${ticket.category}</div>
                    <div class="ticket_div_body_items">${ticket.id}</div>
                    <div class="ticket_div_body_items">${ticket.updated_at}</div>
                `;
                container.appendChild(ticketDiv);

                const resolvedDiv = ticketDiv.querySelector('.resolved_div');
                resolvedDiv.style.backgroundColor = statusColors[ticket.ticket_status] || "#ffffff";
                resolvedDiv.style.padding = "4px 8px";
                resolvedDiv.style.borderRadius = "4px";
                resolvedDiv.style.fontWeight = "bold";
                resolvedDiv.style.border = `2px solid ${statusColors[ticket.ticket_status] || "#ffffff"}`
            });
            
            let pendingTickets = [];
            let closedTickets = [];
            let awaitingResponseTickets = [];
            let solvedTickets = [];
            let onHoldTickets = [];
            
            data.forEach(ticket => {
                if (ticket.ticket_status === "Pending") {
                    pendingTickets.push(ticket);
                    const pendingTicketNumber = document.getElementById("pending_ticket_number");
                    pendingTicketNumber.textContent = pendingTickets.length;
                } else if (ticket.ticket_status === "Closed") {
                    closedTickets.push(ticket);
                    const closedTicketNumber = document.getElementById("closed_ticket_number");
                    closedTicketNumber.textContent = closedTickets.length;
                } else if (ticket.ticket_status === "Awaiting-response") {
                    awaitingResponseTickets.push(ticket);
                    const awaitingResponseTicketNumber = document.getElementById("awaiting_response_ticket_number");
                    awaitingResponseTicketNumber.textContent = awaitingResponseTickets.length;
                } else if (ticket.ticket_status === "Solved") {
                    solvedTickets.push(ticket);
                    const resolvedTicketNumber = document.getElementById("resolved_ticket_number");
                    resolvedTicketNumber.textContent = solvedTickets.length;
                } else if (ticket.ticket_status === "On-hold") {
                    onHoldTickets.push(ticket);
                    const onHoldTicketNumber = document.getElementById("on_hold_ticket_number");
                    onHoldTicketNumber.textContent = onHoldTickets.length;
                }
            });
            
            const allTicketNumber = document.getElementById("all_ticket_number");
            allTicketNumber.textContent = data.length;

        })
        .catch(error => console.error("Error fetching doctors:", error));
    }
    fetchUserTicketDetails();
})