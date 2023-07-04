// ------ Student form handlers

const studentLoginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#student-email-login').value.trim();
    const password = document.querySelector('#student-password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/student/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    }
  };
    
    const studentSignupFormHandler = async (event) => {
      event.preventDefault();
    
      const name = document.querySelector('#student-name-signup').value.trim();
      const email = document.querySelector('#student-email-signup').value.trim();
      const password = document.querySelector('#student-password-signup').value.trim();
    
      if (name && email && password) {
        const response = await fetch('/api/student', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/studentLogin');
        } else {
          alert(response.statusText);
        }
      }
    };

document
.querySelector('.student-login-form')
.addEventListener('submit', studentLoginFormHandler);

document
.querySelector('.student-signup-form')
.addEventListener('submit', studentSignupFormHandler);