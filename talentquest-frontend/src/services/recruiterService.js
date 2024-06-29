import api from './api';

export const register = (recruiterData) => {
  return api.post('/recruiters', recruiterData);
};

export const login = (userSessionDto) => {
  return api.post('/recruiters/sessions', userSessionDto);
};

export const getJobsForRecruiter = () => {
  return api.get('/jobs/me');
};

export const addJob = (jobRequestDto) => {
  return api.post('/jobs/me', jobRequestDto);
}