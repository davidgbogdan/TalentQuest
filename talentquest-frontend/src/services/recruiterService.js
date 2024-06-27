import api from './api';

export const register = (recruiterData) => {
  return api.post('/recruiters', recruiterData);
};

export const login = (userSessionDto) => {
  return api.post('/recruiters/sessions', userSessionDto);
};
