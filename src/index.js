import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchItems } from './js/fetchItems';
import { cardTemplate } from './js/cardTemplate';

const formRef = document.querySelector('.search-form');
const galleryListRef = document.querySelector('.gallery-list');
const loadMoreRef = document.querySelector('.load-more');

let page = 1;
let searchText = '';

formRef.addEventListener('submit', onSubmit);
loadMoreRef.addEventListener('click', onLoadMore);

function onSubmit(e) {
  e.preventDefault();
  page = 1;

  if (!searchText.includes(e.target[0].value.trim().toLowerCase())) {
    loadMoreRef.setAttribute('hidden', true);
    galleryListRef.innerHTML = '';

    searchText = e.target[0].value.trim().toLowerCase();
    if (searchText === '') {
      Notiflix.Notify.failure(
        'Please specify the content you are searching for'
      );
    } else {
      fetchItems(searchText, page).then(renderMarkup).catch(onError);
    }
  }
}

function renderMarkup(data) {
  if (data.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  const cardMarkup = data.map(item => cardTemplate(item)).join('');
  galleryListRef.insertAdjacentHTML('beforeend', cardMarkup);

  if (data.length === 40) {
    loadMoreRef.removeAttribute('hidden');
  } else if (data.length > 0) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    loadMoreRef.setAttribute('hidden', true);
  }
}

function onError() {
  Notiflix.Notify.failure('Error');
}

function onLoadMore() {
  page += 1;
  let inputedText = searchText;
  fetchItems(inputedText, page)
    .then(data => {
      renderMarkup(data);
      console.log(data.length);
    })
    .catch(onError);
}
