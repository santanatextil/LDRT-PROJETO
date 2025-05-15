import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://<seu-ip>:5000'
});