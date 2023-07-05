// ------ Tutor form handlers

const tutorLoginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#tutor-email-login').value.trim();
  const password = document.querySelector('#tutor-password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/tutor/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/tutorshomepage');
    } else {
      alert('Failed to log in.');
    }
  }
};
  
  const tutorSignupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#tutor-name-signup').value.trim();
    const email = document.querySelector('#tutor-email-signup').value.trim();
    const password = document.querySelector('#tutor-password-signup').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/tutorLogin');
      } else {
        alert(response.statusText);
      }
    }
  };    
  document
    .querySelector('.tutor-login-form')
    .addEventListener('submit', tutorLoginFormHandler);
  
  document
    .querySelector('.tutor-signup-form')
    .addEventListener('submit', tutorSignupFormHandler);