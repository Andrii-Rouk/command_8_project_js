import axios from 'axios';
import { withLoader } from './loader.js';

axios.defaults.baseURL = 'https://books-backend-v2.b.goit.study';

const request = (url, config) =>
  withLoader(async () => {
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.error(`GET ${url}:`, error.message);
      throw error;
    }
  });

export const getCategoryList = () => request('/books/category-list');

export const getTopBooks = () => request('/books/top-books');

export const getBooksByCategory = category =>
  request('/books/category', { params: { category } });

export const getBooksById = id => request(`/books/${id}`);
