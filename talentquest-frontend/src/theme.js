import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    h2: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 300,
    },
  },
});

export default theme;
