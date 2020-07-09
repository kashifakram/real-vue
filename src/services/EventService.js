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
  getEvents(perPage, page) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page);
  },
  getEvent(id) {
    return apiClient.get('/events/' + id);
  },
  postEvent(event) {
    return apiClient.post('/events/', event);
  }
};
