/* ------ How to add a Review ------
first you need to be login
go on a place that is not one of you r place you can see if you r the host of the place in the details
on you r left you can see if you have already review a place in the top right corner and if yes you 
have the possibility tomodify or delete
in the bottom right corner you have "add review" button that will make a popup appaer you must put:
the title (not empty) / the rating / and the text (not empty)
and submit you r review to finaly add the review to the place and that will directly put you back
one the detail place with you r review in the top right corner
if you put bad information (e.g: empty title) you will be receive a error msg and will be able to
correct the error immediatly without press again the review button
*/

document.addEventListener('DOMContentLoaded', () => {
  checkAuthentication();
});

function checkAuthentication () {
  // check if the current user have authenticiete himself
  const token = getCookie('token');
  const addReviewSection = document.getElementById('add-review-button');
  const loginButton = document.getElementById('login-button');
  // check if the token is null or not
  if (!token) {
    // the user is not authenticated
    addReviewSection.style.display = 'none';
    loginButton.style.display = 'block';
  } else {
    // the user is authenticated
    addReviewSection.style.display = 'block';
    loginButton.style.display = 'none';
    document.getElementById('connected').textContent = getCookie('user');
    fetchPlaceDetails(getCookie('place'));
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
  // get a cookie by key name
  const cookies = {};
  document.cookie.split('; ').forEach(cookie => {
    const [key, value] = cookie.split('=');
    cookies[key] = value;
  });
  return cookies[name];
}

function suprCookie (names) {
  // remove a cookie by key name
  names.forEach(name => {
    document.cookie = name + '=; Max-Age=-99999999;';
  });
}

async function fetchPlaceDetails (placeId) {
  // fetch place details
  const response = await fetch(`http://127.0.0.1:5000/api/v1/places/${placeId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    // the data have been successfuly retrive and can be display
    displayPlaceDetails(data);
  } else {
    const msg = await response.json();
    alert('error: ' + msg.error);
  }
}

function displayPlaceDetails (place) {
  // display place details
  let OwnReview = 0;
  const description = document.getElementById('place-description');
  document.getElementById('place-title').textContent = place.title;
  description.classList.add('description');
  description.textContent = place.description;
  document.getElementById('place-price').textContent = `price : ${place.price}$/night`;
  document.getElementById('place-owner').textContent = `host : ${place.owner.first_name + ' ' + place.owner.last_name}`;
  // display amenities of the place by their img
  place.amenities.forEach(element => {
    const amenitiesCard = document.createElement('article');
    const amenity = document.createElement('p');
    const img = document.createElement('img');
    img.setAttribute('src', `./image/icon_${element.name}.png`);
    amenitiesCard.classList.add('amenity-card');
    amenitiesCard.appendChild(img);
    amenitiesCard.appendChild(amenity);
    amenitiesCard.classList.add('amenities-card');
    document.getElementById('amenities').appendChild(amenitiesCard);
  });
  // display that no amenity is found
  if (place.amenities.length === 0) {
    document.getElementById('amenities').textContent = 'No amenity found';
  }
  // display all the review of the place
  place.reviews.forEach(element => {
    const user = fetchUserDetails(element.user);
    const reviewsCard = document.createElement('article');
    reviewsCard.classList.add('review-card');
    user.then(function (result) {
      const userName = result.first_name + ' ' + result.last_name;
      // look if the current review as been post by the current user
      if (userName === getCookie('user')) {
        // display the own review of the current user in a special div
        document.getElementById('personal-review-update-button').style.display = 'flex';
        document.getElementById('personal-review-delete-button').style.display = 'flex';
        document.getElementById('personal-review-owner').textContent = userName;
        document.getElementById('log-user-review').dataset.id = element.id;
        document.getElementById('personal-review-title').textContent = element.title;
        document.getElementById('personal-review-owner').textContent = `- ${userName}`;
        document.getElementById('personal-review-rating').textContent = `rating : ${element.rating}/5`;
        document.getElementById('personal-review-text').textContent = element.text;
        OwnReview = 1; // set the var to confirm the place has been review by the current user
      }
      // display the review as the usual div
      const reviewTitle = document.createElement('li');
      const reviewRating = document.createElement('li');
      const reviewContet = document.createElement('li');
      const reviewWriter = document.createElement('li');
      reviewTitle.classList.add('reviews-title');
      reviewRating.classList.add('reviews-rating');
      reviewContet.classList.add('reviews-text');
      reviewWriter.classList.add('reviews-owner');
      reviewTitle.textContent = element.title;
      reviewRating.textContent = `rating : ${element.rating}/5`;
      reviewContet.textContent = element.text;
      reviewWriter.textContent = `- ${userName}`;
      reviewsCard.appendChild(reviewTitle);
      reviewsCard.appendChild(reviewRating);
      reviewsCard.appendChild(reviewContet);
      reviewsCard.appendChild(reviewWriter);
      document.getElementById('existing-review').appendChild(reviewsCard);
    });
    // set a special content for the div where is display the review of the current user
    if (OwnReview === 0) {
      noPersonalReview();
    }
  });
  // if no review is found set the a message for all review and personnal review of the current user
  if (place.reviews.length === 0) {
    document.getElementById('existing-review').textContent = 'No Review found';
    noPersonalReview();
  }
}

function noPersonalReview () {
  // function to set the personnal review to a msg
  document.getElementById('personal-review-title').textContent = '';
  document.getElementById('personal-review-owner').textContent = '';
  document.getElementById('personal-review-rating').textContent = '';
  document.getElementById('personal-review-text').textContent = 'You don t have review this place yet';
  document.getElementById('personal-review-update-button').style.display = 'none';
  document.getElementById('personal-review-delete-button').style.display = 'none';
}

async function fetchUserDetails (userId) {
  // fetch user details
  const response = await fetch(`http://127.0.0.1:5000/api/v1/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const msg = await response.json();
    alert('error: ' + msg.error);
  }
}
function toggleAddPopup () {
  // open the popup and set the button event to supression review function
  const popup = document.querySelector('.popup-frame');
  popup.classList.toggle('open');
  document.getElementById('popup-submit-button').setAttribute('onclick', 'addReview()');
}

function toggleUpdatePopup () {
  // open the popup and set the button event to modify review function
  const popup = document.querySelector('.popup-frame');
  popup.classList.toggle('open');
  document.getElementById('popup-submit-button').setAttribute('onclick', 'modifyReview()');
}

function closePopup () {
  // close the popup
  const popup = document.querySelector('.popup-frame');
  popup.classList.toggle('open');
}

async function addReview () {
  // add a review to the current place
  const placeId = getCookie('place');
  const token = getCookie('token');
  const text = document.getElementById('content').value;
  const rating = document.getElementById('rating').value;
  const title = document.getElementById('title').value;
  const response = await fetch('http://127.0.0.1:5000/api/v1/reviews/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      text,
      rating,
      place_id: placeId,
      title
    })
  });
  if (response.ok) {
    window.location.reload();
    document.getElementById('content').value = '';
  } else {
    const msg = await response.json();
    alert('Post failed: ' + msg.error);
  }
}

async function suprReview () {
  // supr the user review
  if (confirm('Are you sure to delete you r Review ?')) {
    const token = getCookie('token');
    const reviewId = document.getElementById('log-user-review').dataset.id;
    const response = await fetch(`http://127.0.0.1:5000/api/v1/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    if (response.ok) {
      alert('Review deleted successfully');
      window.location.reload();
    } else {
      const msg = await response.json();
      alert('suppresion failed: ' + msg.error);
    }
  }
}

async function modifyReview () {
  // fetch the new review data
  const token = getCookie('token');
  const text = document.getElementById('content').value;
  const rating = document.getElementById('rating').value;
  const title = document.getElementById('title').value;
  const reviewId = document.getElementById('log-user-review').dataset.id;
  const response = await fetch(`http://127.0.0.1:5000/api/v1/reviews/${reviewId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      text,
      rating
    })
  });
  if (response.ok) {
    console.log(response);
    alert('Review update successfully');
    window.location.reload();
  } else {
    const msg = await response.json();
    alert('Update failed: ' + msg.error);
  }
}
