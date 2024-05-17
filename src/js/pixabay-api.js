import axios from 'axios';

async function serviceCardsInfo(data) {
  const BACE_URL = 'https://pixabay.com/api/';
  const API_KEY = '42892988-1a177f86546a7a1e93a2f736f';

  const params = new URLSearchParams({
    key: API_KEY,
    q: data,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: 1,
    per_page: 40,
  });

  try {
    const response = await axios.get(`${BACE_URL}?${params}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data from Pixabay API');
  }
}

export { serviceCardsInfo };
