import api from './api';

export const applyToJob = (jobId, cvFile) => {
  const formData = new FormData();
  formData.append('jobId', jobId);
  formData.append('cvFile', cvFile);

  return api.post('/applications', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getApplicationsByJob = (jobId) => {
  return api.get(`/applications/job/${jobId}`);
};
