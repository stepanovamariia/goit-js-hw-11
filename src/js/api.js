import axios from 'axios';

const input = document.querySelector('input');

function serviceCardsInfo(data) {
  const BACE_URL = 'https://pixabay.com/api/';
  const API_KEY = '42892988-1a177f86546a7a1e93a2f736f';

  const params = new URLSearchParams({
    key: API_KEY,
    q: data,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  return axios.get(`${BACE_URL}?${params}`).then(({ data }) => data);
}

export { serviceCardsInfo };
