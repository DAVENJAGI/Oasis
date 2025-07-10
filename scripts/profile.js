
document.addEventListener('DOMContentLoaded', function() {
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
      item.addEventListener('click', function() {
          menuItems.forEach(i => i.classList.remove('active'));
          this.classList.add('active');
      });
  });
});

// Add loading animation
window.addEventListener('load', function() {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach((element, index) => {
      setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
      }, index * 100);
  });
});

document.addEventListener('DOMContentLoaded', () => {

  //HIDE AND SHOW EDIT USER PROFILE
  const editUserProfileBtn = document.getElementById('edit-usr-profile-btn');
  editUserProfileBtn.addEventListener('click', () => {
    toggleEdit();
  })

  const closeEditUserProfileBtn = document.getElementById('close-edit-usr-profile-btn');
  closeEditUserProfileBtn.addEventListener('click', () => {
    toggleEdit();
  })

  function toggleEdit() {
    const viewMode = document.getElementById('viewMode');
    const editMode = document.getElementById('editMode');
    const editBtn = document.querySelector('.edit-btn');
    
    if (editMode.classList.contains('active')) {
        editMode.classList.remove('active');
        viewMode.classList.remove('editing');
        editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
    } else {
        editMode.classList.add('active');
        viewMode.classList.add('editing');
        editBtn.innerHTML = '<i class="fas fa-times"></i> Cancel';
    }
  }

  //SAVE USER INFO UPDATE TO DATABASE
  const saveUserProfileInfoBtn = document.getElementById('save-usr-profile-info-btn');
  saveUserProfileInfoBtn.addEventListener('click', () => {
      saveProfile();
  })

  function saveProfile() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const primaryPhone = document.getElementById('primaryPhone').value;
    const secondaryPhone = document.getElementById('secondaryPhone').value;
    const gender = document.getElementById('gender').value;
    const address = document.getElementById('address').value;

    
    const profileDataElements = document.querySelectorAll('.profile-data');
    profileDataElements[0].textContent = firstName;
    profileDataElements[1].textContent = lastName;
    profileDataElements[2].textContent = email;
    profileDataElements[3].textContent = primaryPhone;
    profileDataElements[4].textContent = secondaryPhone;
    profileDataElements[5].textContent = gender;
    profileDataElements[6].textContent = address;

    document.querySelector('.profile-name h2').innerHTML = `
        ${firstName} ${lastName}
        <span class="verified-badge">
            <i class="fas fa-check"></i>
            Verified
        </span>
    `;

    alert('Profile updated successfully!');
    
    toggleEdit();
  }
})