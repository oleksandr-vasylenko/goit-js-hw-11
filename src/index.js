import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchItems } from './js/fetchItems';

const formRef = document.querySelector('.search-form');
const galleryListRef = document.querySelector('.gallery-list');
const loadMoreRef = document.querySelector('.load-more');

let page = 1;

const cardTemplate = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) =>
  `<li class='list-item'>
    <div class="photo-card">
      <div class="photo-container">    
       <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
      </div>
    <div class="info">
            <p class="info-item">
            <b>Likes: ${likes}</b>
            </p>
            <p class="info-item">
            <b>Views: ${views}</b>
            </p>
            <p class="info-item">
            <b>Comments: ${comments}</b>
            </p>
            <p class="info-item">
            <b>Downloads: ${downloads}</b>
            </p>
        </div>
    </div>
</li>
`;

formRef.addEventListener('submit', onSubmit);
loadMoreRef.addEventListener('click', onLoadMore);

function onSubmit(e) {
  e.preventDefault();
  page = 1;
  loadMoreRef.setAttribute('hidden', true);
  galleryListRef.innerHTML = '';

  const searchText = e.target[0].value.trim().toLowerCase();
  if (searchText === '') {
    Notiflix.Notify.failure('Please specify the content you are searching for');
  } else {
    fetchItems(searchText, page).then(renderMarkup).catch(onError);
    let inputedText = localStorage.setItem('savedSearch', searchText);
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
  let inputedText = localStorage.getItem('savedSearch');
  fetchItems(inputedText, page)
    .then(data => {
      renderMarkup(data);
      console.log(data.length);
    })
    .catch(onError);
}
