import './css/styles.css';
// import fetchItems from './js/fetchItems';
import Notiflix from 'notiflix';
import card from './js/templates/card.hbs';

const searchTextRef = document.querySelector('.search-form');
const searchBtnRef = document.querySelector('.search-button');
const galleryListRef = document.querySelector('.gallery-list');

searchTextRef.addEventListener('input', oninput);
searchBtnRef.addEventListener('click', onSubmit);

const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30715503-b05874fb24d95ac5a3c3e4a16';

async function getItems(searchText) {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${KEY}&q=${searchText}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

// function oninput(e) {
//   const searchText = e.target.value.trim().toLowerCase();
//   console.log(searchText);
// }

function onSubmit(e) {
  e.preventDefault();
  const searchText = e.target.value.trim().toLowerCase();
  getItems(searchText).then(renderMarkup).catch(onError);
}

function renderMarkup(foundData) {
  galleryListRef.insertAdjacentHTML('beforeend', card(foundData));
}

function onError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
