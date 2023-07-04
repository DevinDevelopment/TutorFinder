function tutorTracker() {
    var tutor = $(".searchButton").val();
    // alert(tutor);
};

const logout = async () => {
  const response = await fetch('/api/tutor/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};
  
  tutorTracker();

  document.querySelector('#logout').addEventListener('click', logout);
  