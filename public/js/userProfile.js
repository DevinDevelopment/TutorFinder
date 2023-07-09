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
.querySelector('#description-bttn')
.addEventListener('click', profileAddDescriptionHandler);