import api from './api';

export const login = async (credentials) => {
  return api.post('/api/auth/authenticate', credentials);
};
