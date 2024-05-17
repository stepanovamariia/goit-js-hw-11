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
  loader: document.querySelector('.loader'),
};

let lightbox;

refs.form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  const inputData = refs.input.value.toLowerCase();

  if (!inputData || inputData.includes(' ')) {
    refs.gallery.innerHTML = '';

    iziToast.show({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      messageColor: 'red',
    });
    refs.loader.style.display = 'none';
    return;
  }

  refs.loader.style.display = 'block';
  refs.gallery.innerHTML = '';

  let data;

  try {
    data = await serviceCardsInfo(inputData);

    if (data.hits.length === 0) {
      refs.loader.style.display = 'none';
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

  refs.loader.style.display = 'none';

  const markup = createMarkup(data.hits);
  refs.gallery.innerHTML = markup;

  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}
