import axios from 'axios';
import interceptors from './interceptors';

const movieDbAxios = axios.create({
  baseURL: process.env.VUE_APP_MOVIE_API_URL,
});
const ezTvAxios = axios.create({
  baseURL: process.env.VUE_APP_EZTV_API_URL,
});
interceptors(movieDbAxios);
export { movieDbAxios, ezTvAxios };
