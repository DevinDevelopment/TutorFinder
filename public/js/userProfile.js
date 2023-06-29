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

profilePageHandler();
