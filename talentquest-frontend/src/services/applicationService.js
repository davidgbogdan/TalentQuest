// applicationService.js
import api from './api';

export const getApplicationsByJob = (jobId) => {
  return api.get(`/applications/job/${jobId}`);
};

export const getCvByApplicationId = (applicationId) => {
  return api.get(`/applications/${applicationId}/cv`, { responseType: 'blob' });
};

export const applyToJob = (formData) => {
  return api.post('/applications', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
