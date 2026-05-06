import api from '../api/axios';

const authService = {
  signup: async (userData) => {
    const response = await api.post('/signup', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/login', credentials);
    if (response.data.token) {
      localStorage.setItem('user_token', response.data.token);
    }
    if (response.data.user) {
      localStorage.setItem('user_id', response.data.user.id);
      localStorage.setItem('user_name', response.data.user.name);
    }
    return response.data;
  },

  logout: async () => {
    try {
      await api.post('/logout');
    } catch {
      // token may already be invalid, proceed with local cleanup
    } finally {
      localStorage.removeItem('user_token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_name');
    }
  },
};

export default authService;
