document.addEventListener('DOMContentLoaded', () => {
    const userProfileAvatar = document.getElementById('usr-profile-avatar');
    userProfileAvatar.addEventListener('click', () => {
        window.location.href = 'profile.html';
    })
});