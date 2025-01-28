import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // Flask backend URL
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export default API;
