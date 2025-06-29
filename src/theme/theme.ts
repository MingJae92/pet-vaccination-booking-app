import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#0052cc' },
    secondary: { main: '#FF4081' },
    background: { default: '#f5f5f5' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700, fontSize: '2rem', lineHeight: 1.2 },
    h6: { fontWeight: 700, fontSize: '1.25rem' },
    body1: { fontSize: '1rem' },
  },
  spacing: 8,
});

export default theme;
