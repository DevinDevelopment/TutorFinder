const addReviewHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#review-title').value;
    const text = document.querySelector('#user-add-review').value;

    // Get current URL
    const url = window.location.href;
    const tutor_id = url.match(/\/tutor\/(\d+)/)[1];

    const response = await fetch(`/api/tutor/${tutor_id}/addReview`, {
      method: 'POST',
      body: JSON.stringify({ title, text, tutor_id }),
      headers: { 'Content-Type': 'application/json' }, 
    }); 
    if (response.ok) {
      console.log('post test 1');
      document.location.replace(`/tutor/${tutor_id}`);
    } else {
      console.log('post test bad');
      alert(response.statusText);
    }
  };

document
.querySelector('#submit-review-bttn')
.addEventListener('click', addReviewHandler);