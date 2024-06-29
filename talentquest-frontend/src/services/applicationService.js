import api from './api';

export const getApplicationsByJob = (jobId) => {
  return api.get(`/applications/job/${jobId}`);
};

export const applyToJob = (applicationRequestDto) => {
  const formData = new FormData();
  formData.append('jobId', applicationRequestDto.jobId);
  formData.append('cvFile', applicationRequestDto.cvFile);

  return api.post('/applications', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
