import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '34523545-f21683fd59bfc3e4e2549fe07';

// Кількість зображень на сторінці
export const perPage = 12;

// Асинхронна функція для отримання зображень з бек-енду
export const getAllImages = async (query, page) => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response.data;
};
