export const cardTemplate = ({
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
            <b>Likes: </b><span class="info-value">${likes}</span>
            </p>
            <p class="info-item">
            <b>Views: </b><span class="info-value">${views}</span>
            </p>
            <p class="info-item">
            <b>Comments: </b><span class="info-value">${comments}</span>
            </p>
            <p class="info-item">
            <b>Downloads: </b><span class="info-value">${downloads}</span>
            </p>
        </div>
    </div>
</li>
`;
