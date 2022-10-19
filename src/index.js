import './css/styles.css';
import fetchItems from './js/fetchItems';
import Notiflix from 'notiflix';
import cardTemplate from './js/templates/cardTemplate.hbs';

const searchTextRef = document.querySelector('.search-form');
const searchBtnRef = document.querySelector('#search-button');

searchTextRef.addEventListener('input', oninput);
searchBtnRef.addEventListener('submit', onSubmit);

function oninput(e) {
  console.log(e);
}

function onSubmit(e) {
  e.preventDefault();
  console.log(e);
}

function renderMarkup() {}
