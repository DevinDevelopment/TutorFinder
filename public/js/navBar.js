// const tutorTracker = async () =>  {
//   var tutorName = document.querySelector('#Search').value.trim();
//   const response = await fetch('/tutorprofile', {
//     method: 'GET',
//     tutorName
//   });

  // if (response.ok) {
  
  // } else {
  //   alert('Tutor not found');
  // }
// };

const logout = async () => {
  const response = await fetch('/api/logout', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

  document.querySelector('#logout').addEventListener('click', logout);
  // document.querySelector('#searchBttn').addEventListener('click', tutorTracker);
  