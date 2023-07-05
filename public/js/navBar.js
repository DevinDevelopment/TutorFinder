const tutorTracker = async () =>  {
  var tutorName = document.querySelector('#Search').value.trim();
  const response = await fetch('/', {
    method: 'GET',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert('Failed to log in.');
  }
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
  document.querySelector('#searchBttn').addEventListener('click', tutorTracker);
  