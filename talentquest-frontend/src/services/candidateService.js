import api from './api';

export const login = (userSessionDto) => {
  return api.post('/candidates/sessions', userSessionDto);
};
