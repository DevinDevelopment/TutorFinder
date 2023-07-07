const addReviewHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#review-title').value;
    const text = document.querySelector('#user-add-review').value;
    
    const response = await fetch('/api/tutor/:id/addReview', {
      method: 'POST',
      body: JSON.stringify({ title, text }),
      headers: { 'Content-Type': 'application/json' }, 
    }); 
    if (response.ok) {
      console.log('post test 1');
      document.location.replace('/tutor/:id');
    } else {
      console.log('post test bad');
      alert(response.statusText);
    }
  };

  const profileAddDescriptionHandler = async (event) => {
    event.preventDefault();
  
    const desc = document.querySelector('#user-add-desc').value;
  
    const response = await fetch('/api/student/description', {
      method: 'PUT',
      body: JSON.stringify({ desc }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  };

document
.querySelector('#submit-review-bttn')
.addEventListener('click', addReviewHandler);

document
.querySelector('#tutor-description-bttn')
.addEventListener('click', profileAddDescriptionHandler);