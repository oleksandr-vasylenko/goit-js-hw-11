import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchItems } from './js/fetchItems';

const formRef = document.querySelector('.search-form');
const galleryListRef = document.querySelector('.gallery-list');

const cardTemplate = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) =>
  `<li>
    <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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

function onSubmit(e) {
  e.preventDefault();
  const searchText = e.target[0].value.trim().toLowerCase();
  fetchItems(searchText).then(renderMarkup).catch(onError);
}

function renderMarkup(data) {
  const cardMarkup = data.map(item => cardTemplate(item)).join('');
  galleryListRef.insertAdjacentHTML('beforeend', cardMarkup);
}

function onError() {
  Notiflix.Notify.failure('Error');
}
