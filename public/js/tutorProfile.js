const tutorProfileAddDescriptionHandler = async (event) => {
    event.preventDefault();
  
    const tutorDesc = document.querySelector('#tutor-add-desc').value;
  
    const response = await fetch('/api/tutor/tutordescription', {
      method: 'PUT',
      body: JSON.stringify({ tutorDesc }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/tutorProfile');
    } else {
      alert(response.statusText);
    }
  };

document
.querySelector('#tutor-description-bttn')
.addEventListener('click', tutorProfileAddDescriptionHandler);