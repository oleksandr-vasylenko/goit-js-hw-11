import './css/styles.css';
import Notiflix from 'notiflix';
import card from './js/templates/card.hbs';
import { fetchItems } from './js/fetchItems';

const formRef = document.querySelector('.search-form');
const galleryListRef = document.querySelector('.gallery-list');

// formRef.addEventListener('input', oninput);
formRef.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const searchText = e.target[0].value.trim().toLowerCase();
  fetchItems(searchText).then(renderMarkup).catch(onError);
}

function renderMarkup(foundData) {
  galleryListRef.insertAdjacentHTML('beforeend', card(foundData));
}

function onError() {
  Notiflix.Notify.failure('Error');
}
