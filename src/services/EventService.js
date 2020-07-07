import axios from 'axios';

const axiosObj = {
  baseURL: '//localhost:3000',
  withCredentials: false,
  timeout: 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

const apiClient = axios.create(axiosObj);

export default {
  getEvents() {
    return apiClient.get('/events');
  },
  getEvent(id) {
    return apiClient.get('/events/' + id);
  },
  createEvent(event) {
    return apiClient.post('/events/', event);
  }
};
