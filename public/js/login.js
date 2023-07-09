const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#signup-name').value.trim();
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    var radioButtons = document.getElementsByName("inlineRadioOptions");
    var selectedValue = "";
    var radioButtonSelected = false;

    for (var i = 0; i < radioButtons.length; i++) {

    if (radioButtons[i].checked) {
      var label = document.querySelector('label[for="' + radioButtons[i].id + '"]');
      selectedValue = label.textContent;
      radioButtonSelected = true;

      break;
        }
    }

    if (name && email && password && selectedValue == 'Student') {
        if (name && email && password) {
            const response = await fetch('/api/login/studentsignup', {
              method: 'POST',
              body: JSON.stringify({ name, email, password }),
              headers: { 'Content-Type': 'application/json' },
            });
        
            if (response.ok) {
              document.location.replace('/login');
            } else {
              alert(response.statusText);
            }
        }
    } 
    else if(name && email && password && selectedValue == 'Tutor'){
        const response = await fetch('/api/login/tutorsignup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
          });
      
          if (response.ok) {
            document.location.replace('/login');
          } else {
            alert(response.statusText);
          }
    }
    else{
        console.log("No option selected.");
    }
};

const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#login-email').value.trim();
  const password = document.querySelector('#login-password').value.trim();

  var radioButtons = document.getElementsByName("inlineRadioOptions");
  var selectedValue = "";
  var radioButtonSelected = false;

  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      var label = document.querySelector('label[for="' + radioButtons[i].id + '"]');
      selectedValue = label.textContent;
      radioButtonSelected = true;
      break;
    }
  }

  if (email && password && selectedValue === 'Tutor') {
    const response = await fetch('/api/login/tutorlogin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Include cookies in the request
    });

    if (response.ok) {
      document.location.replace('/tutorshomepage');
    } else {
      alert('Failed to log in.');
    }
    
  } else if (email && password && selectedValue === 'Student') {
    const response = await fetch('/api/login/studentlogin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Include cookies in the request
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  } else {
    console.log("No option selected.");
  }
  };

document
.querySelector('#signup-btn')
.addEventListener('click', signupFormHandler);

document
.querySelector('#login-btn')
.addEventListener('click', loginFormHandler);
