const profilePageHandler = async () => {
  try {
    const response = await fetch('/api/users/profile');
    if (response.ok) {
      const userProfile = await response.json();
      const profileTemplate = Handlebars.compile(`
        <h1>Hello {{username}}</h1>
        <p>Email: {{email}}</p>
        <p>Description: {{description}}</p>
      `);

      const renderedProfile = profileTemplate(userProfile);
      document.getElementById('profile-container').innerHTML = renderedProfile;
    } else {
      throw new Error('Failed to fetch user profile');
    }
  } catch (err) {
    console.error(err);
  }
};

const profileAddDescriptionHandler = async (event) => {
  event.preventDefault();

  const desc = document.querySelector('#user-add-desc').value.trim();

  const response = await fetch('/api/student/description', {
    method: 'POST',
    body: JSON.stringify({ desc }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert(response.statusText);
  }
};

profilePageHandler();
