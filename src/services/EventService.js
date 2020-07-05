import axios from 'axios';

const axiosObj = {
  baseURL: '//localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

const apiClient = axios.create(axiosObj);

export default {
  getEvents() {
    return apiClient.get('/events', {
      params: {
        NAME: 90
      }
    });
  }
};
