import api from './api';

export const login = (userSessionDto) => {
  return api.post('/recruiters/sessions', userSessionDto);
};
