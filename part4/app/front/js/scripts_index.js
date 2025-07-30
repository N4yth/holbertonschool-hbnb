document.addEventListener('DOMContentLoaded', () => {
  checkAuthentication();

  // prepare the price filter event
  document.getElementById('price-filter').addEventListener('change', (event) => {
    const placeCard = document.getElementsByClassName('place-card');
    for (let i = 0; i < placeCard.length; i++) {
      // test the save data in html tag with the value of the target elemnet value
      if (Number(placeCard[i].dataset.price) >= Number(event.target.value)) {
        placeCard[i].style.display = 'none';
      } else {
        placeCard[i].style.display = 'flex';
      }
    }
  });
});

async function checkAuthentication () {
  // check if the current user have authenticiete himself
  const loginButton = document.getElementById('login-button');
  const logoutButton = document.getElementById('logout-button');
  const token = getCookie('token');
  // check if the token is null or not
  if (!token) {
    // the user is not authenticated
    loginButton.style.display = 'flex';
    logoutButton.style.display = 'none';
  } else {
    // the user is authenticated
    loginButton.style.display = 'none';
    logoutButton.style.display = 'flex';
    document.getElementById('connected').textContent = getCookie('user');
    fetchPlaces(token);
  }
}

async function logOut () {
  // remove the user and token cookie and return to the main page
  if (confirm('Are you sure to logout ?')) {
    suprCookie(['token', 'user']);
    window.location.href = 'index.html';
  }
}

function getCookie (name) {
  // get cookie by name
  const cookies = {};
  document.cookie.split('; ').forEach(cookie => {
    const [key, value] = cookie.split('=');
    cookies[key] = value;
  });
  return cookies[name];
}

function suprCookie (names) {
  // supre the cookie by name
  names.forEach(name => {
    document.cookie = name + '=; Max-Age=-99999999;';
  });
}

async function fetchPlaces (token) {
  // fetch place data
  const response = await fetch('http://127.0.0.1:5000/api/v1/places/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  if (response.ok) {
    const data = await response.json();
    // data has been return and now display it
    displayPlaces(data);
  } else {
    const msg = await response.json();
    alert('Login failed: ' + msg.error);
  }
}

function displayPlaces (places) {
  // display all places that as been create
  const placeCard = document.getElementById('places-list');
  places.forEach(place => {
    const article = document.createElement('article');
    const button = document.createElement('button');
    const title = document.createElement('h3');
    const price = document.createElement('p');
    article.dataset.price = `${place.price}`;
    button.classList.add('details-button');
    button.classList.add('button');
    // save the button that will save the place id to the token and change page
    button.addEventListener('click', function () {
      document.cookie = `place=${place.id}; path=/`;
      window.location.href = 'place.html';
    });
    article.classList.add('place-card');
    title.classList.add('place-card-title');
    price.classList.add('place-card-price');
    button.appendChild(document.createTextNode('View Details'));
    title.appendChild(document.createTextNode(place.title));
    price.appendChild(document.createTextNode(`Price per night : ${place.price} $`));
    article.appendChild(title);
    article.appendChild(price);
    article.appendChild(button);
    placeCard.appendChild(article);
  });
}
