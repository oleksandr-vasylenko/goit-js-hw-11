import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchItems } from './js/fetchItems';

const formRef = document.querySelector('.search-form');
const galleryListRef = document.querySelector('.gallery-list');
const loadMoreRef = document.querySelector('.load-more');

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
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width="500px" />
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

  galleryListRef.innerHTML = '';

  const searchText = e.target[0].value.trim().toLowerCase();

  fetchItems(searchText, page).then(renderMarkup).catch(onError);
}

function renderMarkup(data) {
  if (data.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  const cardMarkup = data.map(item => cardTemplate(item)).join('');
  galleryListRef.insertAdjacentHTML('beforeend', cardMarkup);
}

function onError() {
  Notiflix.Notify.failure('Error');
}

let page = 1;

function onLoadMore() {
  page += 1;
  fetchItems(searchText, page).then(renderMarkup).catch(onError);
}
