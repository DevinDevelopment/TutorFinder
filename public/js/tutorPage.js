const addReviewHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#review-title').value;
    const text = document.querySelector('#user-add-review').value;
    
  
    const response = await fetch('/api/tutor/addReview', {
      method: 'POST',
      body: JSON.stringify({ title, text }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/tutors/:id');
    } else {
      alert(response.statusText);
    }
  };

document
.querySelector('#submit-review-bttn')
.addEventListener('click', addReviewHandler);