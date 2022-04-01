import { create } from 'apisauce';
import { BASE_URL, API_VERSION } from '../constant/network';

// Rest Client for Americamp APIs
export const RestClient = create({
  baseURL: `${BASE_URL}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: '',
  },
  timeout: 30000,
});