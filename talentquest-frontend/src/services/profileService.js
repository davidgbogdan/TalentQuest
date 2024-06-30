import api from './api';

export const getCandidateProfile = () => {
  return api.get('/candidates/me');
};

export const updateCandidateProfile = (profileData) => {
  return api.put('/candidates/me', profileData);
};

export const getRecruiterProfile = () => {
  return api.get('/recruiters/me');
};

export const updateRecruiterProfile = (profileData) => {
  return api.put('/recruiters/me', profileData);
};
