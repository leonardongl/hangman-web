import axios from 'axios';
const { VUE_APP_API_BASE } = process.env
const api = axios.create({
  baseURL: VUE_APP_API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
