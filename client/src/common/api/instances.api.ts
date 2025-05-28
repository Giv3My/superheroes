import axios, { type CreateAxiosDefaults } from 'axios';
import { API_URL } from '../config';

const options: CreateAxiosDefaults = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const api = axios.create(options);
