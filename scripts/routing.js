document.addEventListener('DOMContentLoaded', () => {
    // ROUTE TO MY TICKET PAGE
    const myTicketsIcon = document.getElementById('my_tickets_icon');
    if (myTicketsIcon) {
        myTicketsIcon.addEventListener('click', function () {
            window.location.href = 'support.html';
        });
    }

    // ROUTE TO CREATE TICKET PAGE
    const createTicketPage = document.getElementById('create_ticket_page');
    if (createTicketPage) {
        createTicketPage.addEventListener('click', function () {
            window.location.href = 'support.html';
        });
    }

    // ROUTE TO MY SUBMITTED TICKET PAGE
    const myTicketPage = document.getElementById('my_ticket_page');
    if (myTicketPage) {
        myTicketPage.addEventListener('click', function () {
            window.location.href = 'my_tickets.html';
        });
    }

    // ROUTE TO NOTIFICATIONS PAGE
    const myNotificationPage = document.getElementById('notifications_icon');
    if (myNotificationPage) {
        myNotificationPage.addEventListener('click', function () {
            window.location.href = 'notification.html';
        });
    }

    // ROUTE TO PROFILE PAGE
    const myProfilePage = document.getElementById('user_profile_icon');
    if (myProfilePage) {
        myProfilePage.addEventListener('click', function () {
            window.location.href = 'profile.html';
        });
    }

    // ROUTE TO MESSAGES PAGE
    const myMessagesPage = document.getElementById('my_messages_icon');
    if (myMessagesPage) {
        myMessagesPage.addEventListener('click', function () {
            window.location.href = 'messages.html';
        });
    }

    // ROUTE TO MESSAGES PAGE
    const myLoginPage = document.getElementById('logout_div');
    if (myLoginPage) {
        myLoginPage.addEventListener('click', function () {
            window.location.href = 'new_visitor.html';
        });
    }

});
