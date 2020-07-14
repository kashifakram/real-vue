import axios from 'axios';
// import NProgress from 'nprogress';

const axiosObj = {
  baseURL: '//localhost:3000',
  withCredentials: false,
  // timeout: 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

const apiClient = axios.create(axiosObj);

//commented out to implement via global route navigation guards

// apiClient.interceptors.request.use(config => {
//   NProgress.start();
//   return config;
// });

// apiClient.interceptors.response.use(response => {
//   NProgress.done();
//   return response;
// });

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
