import './css/styles.css';
// import fetchItems from './js/fetchItems';
import Notiflix from 'notiflix';
import card from './js/templates/card.hbs';

const formRef = document.querySelector('.search-form');
const galleryListRef = document.querySelector('.gallery-list');

formRef.addEventListener('input', oninput);
formRef.addEventListener('submit', onSubmit);

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

function onSubmit(e) {
  e.preventDefault();
  const searchText = e.target.value;
  getItems(searchText).then(renderMarkup).catch(onError);
  renderMarkup(searchText);
}

function renderMarkup(searchText) {
  galleryListRef.insertAdjacentHTML('beforeend', card(searchText));
}

function onError() {
  Notiflix.Notify.failure('Error');
}
