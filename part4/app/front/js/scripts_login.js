/* ------ How to login as a register user ------
in the top right header you have a login button after press it you will be
send to the login page you need to put your email and password and press
"submit" to login and the site will automaticelly send you to theindex page
if you have wrong user password or email only a error message will be display
on the screen
*/

function getLogData () {
  // prepare the submit event
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      loginUser(document.getElementById('email').value, document.getElementById('password').value);
    });
  }
}

async function loginUser (email, password) {
  // fetch the login user data
  const response = await fetch('http://127.0.0.1:5000/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  if (response.ok) {
    const data = await response.json();
    document.cookie = `token=${data.access_token}; path=/`;
    document.cookie = `user=${data.user_name}; path=/`;
    window.location.href = 'index.html';
  } else {
    alert('Login failed: ' + response.json().error);
  }
}
