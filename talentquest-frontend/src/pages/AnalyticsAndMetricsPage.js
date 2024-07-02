// src/pages/AnalyticsAndMetricsPage.js
import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Bar, Doughnut, Line, Radar } from 'react-chartjs-2';
import 'chart.js/auto';

const applicationsData = {
  labels: ['DevOps Engineer', 'SQL Administrator', 'Test - Java'],
  datasets: [
    {
      label: 'Count of Applications',
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(75,192,192,0.4)',
      hoverBorderColor: 'rgba(75,192,192,1)',
      data: [1, 1, 1],
    },
  ],
};

const statusDistributionData = {
  labels: ['Applied', 'Interview', 'Hired', 'Rejected'],
  datasets: [
    {
      label: 'Application Status Distribution',
      data: [3, 1],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const matchScoreData = {
  labels: ['DevOps Engineer', 'SQL Administrator', 'Test - Java'],
  datasets: [
    {
      label: 'Average Match Score',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [0, 5, 10],
    },
  ],
};

const skillDistributionData = {
  labels: ['SQL', 'Linux', 'Terraform', 'CI/CD', 'Java', 'Spring Boot'],
  datasets: [
    {
      label: 'Skill Distribution',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [2.5, 0, 0, 0, 10, 10],
    },
    {
      label: 'Candidates',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
      data: [1, 1, 1, 1, 1, 1],
    },
  ],
};

const AnalyticsAndMetricsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Analytics and Metrics
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 500 }}>
            <Typography variant="h6" gutterBottom>
              Count of Applications
            </Typography>
            <Box sx={{ height: '100%' }}>
              <Bar data={applicationsData} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 500 }}>
            <Typography variant="h6" gutterBottom>
              Application Status Distribution
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Box sx={{ width: '70%', height: '70%' }}>
                <Doughnut data={statusDistributionData} options={{ maintainAspectRatio: false }} />
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 500 }}>
            <Typography variant="h6" gutterBottom>
              Average Match Score
            </Typography>
            <Box sx={{ height: '100%' }}>
              <Line data={matchScoreData} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 500 }}>
            <Typography variant="h6" gutterBottom>
              Skill Distribution
            </Typography>
            <Box sx={{ height: '100%' }}>
              <Radar data={skillDistributionData} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsAndMetricsPage;
