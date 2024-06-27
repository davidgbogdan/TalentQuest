import api from './api';

export const register = (candidateData) => {
  return api.post('/candidates', candidateData);
};

export const login = (userSessionDto) => {
  return api.post('/candidates/sessions', userSessionDto);
};
