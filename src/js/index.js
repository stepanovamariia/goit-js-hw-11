import { serviceCardsInfo } from './api.js';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  searchBtn: document.querySelector('.search-btn'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};

refs.searchBtn.addEventListener('click', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  const inputData = refs.input.value.trim().toLowerCase();

  if (inputData !== 'cat' && inputData !== 'dog') {
    refs.gallery.innerHTML = '';
    alert("Пожалуйста, введите 'cat' или 'dog'");

    return;
  }

  serviceCardsInfo(inputData)
    .then(data => {
      const markup = createMarkup(data.hits);
      refs.gallery.innerHTML = markup;
      console.log(data);
    })
    .catch(err => console.log(err));
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b><span class="value">${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b><span class="value">${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b><span class="value">${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b><span class="value">${downloads}</span>
    </p>
  </div>
</div>`
    )
    .join('');
}
