import { serviceCardsInfo } from './api.js';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
  target: document.querySelector('.js-guard'),
};

let currentPage = 1;
const maxPage = 14;

let options = {
  root: null,
  rootMargin: '200px',
  threshold: 0,
};

let observer = new IntersectionObserver(onLoad, options);

let lightbox;

function onLoad(entries, observer) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      try {
        const inputData = refs.input.value.trim().toLowerCase();
        const data = await serviceCardsInfo(inputData, currentPage);
        const markup = createMarkup(data.hits);
        refs.gallery.insertAdjacentHTML('beforeend', markup);
        currentPage += 1;
        lightbox.refresh();
      } catch (err) {
        console.log(err);
      }

      if (!entry.isIntersecting || currentPage >= maxPage) {
        observer.unobserve(refs.target);
      }
    }
  });
}

refs.form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  currentPage = 1;
  const inputData = refs.input.value.trim().toLowerCase();

  if (inputData !== 'cat' && inputData !== 'dog') {
    refs.gallery.innerHTML = '';
    Notiflix.Notify.failure("Please enter 'cat' or 'dog'");
    return;
  }

  try {
    const data = await serviceCardsInfo(inputData, currentPage);
    const markup = createMarkup(data.hits);
    refs.gallery.innerHTML = markup;
    currentPage += 1;
    observer.observe(refs.target);
    console.log(data);

    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } catch (err) {
    console.log(err);
  }
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
        `
  <a class="photo-card" href="${largeImageURL}" alt="${tags}"><img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
</a>`
    )
    .join('');
}
