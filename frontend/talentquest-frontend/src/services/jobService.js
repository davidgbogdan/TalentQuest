import api from './api';

export const getAllJobs = () => {
  return api.get('/jobs');
};

export const getJobsForRecruiter = () => {
  return api.get('/jobs/me');
};

export const addJob = (jobRequestDto) => {
  return api.post('/jobs/me', jobRequestDto);
};
