import { nodeServerBaseUrl, apiClient } from '@/libs/constants.js';

export default {
  apiClient,
  registerUser(creds) {
    return apiClient.post(nodeServerBaseUrl + '/register', creds);
  },

  loginUser(creds) {
    return apiClient.post(nodeServerBaseUrl + '/login', creds);
  }
};
