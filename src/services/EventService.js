import {
  jsonServerBaseUrl,
  nodeServerBaseUrl,
  apiClient
} from '@/libs/constants.js';
// import NProgress from 'nprogress';

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
    return apiClient.get(
      jsonServerBaseUrl + '/events?_limit=' + perPage + '&_page=' + page
    );
  },

  getEvenEvents() {
    return apiClient.get(nodeServerBaseUrl + '/dashboard');
  },

  getEvent(id) {
    return apiClient.get(jsonServerBaseUrl + '/events/' + id);
  },
  postEvent(event) {
    return apiClient.post(jsonServerBaseUrl + '/events/', event);
  }
};
