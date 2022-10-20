const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30715503-b05874fb24d95ac5a3c3e4a16';

export async function fetchItems(searchText) {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${KEY}&q=${searchText}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`
    );
    return response.data.hits;
  } catch (error) {
    console.error(error);
  }
}
