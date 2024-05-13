import { serviceCardsInfo } from '../src/js/pixabay-api';
import { createMarkup } from '../src/js/render-functions';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
  target: document.querySelector('.js-guard'),
};

let currentPage = 1;
const maxPage = 14;
let lightbox;

let options = {
  root: null,
  rootMargin: '200px',
  threshold: 0,
};

refs.form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  const inputData = refs.input.value.trim().toLowerCase();

  document.querySelector('.loader').style.display = 'block';

  let data;

  try {
    data = await serviceCardsInfo(inputData, currentPage);

    if (data.hits.length === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: 'red',
      });
      return;
    }
  } catch (err) {
    console.log(err);
    return;
  }

  document.querySelector('.loader').style.display = 'none';

  const markup = createMarkup(data.hits);
  refs.gallery.innerHTML = markup;
  currentPage += 1;
  observer.observe(refs.target);

  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

let observer = new IntersectionObserver(onLoad, options);

function onLoad(entries, observer) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      const inputData = refs.input.value.trim().toLowerCase();

      try {
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
