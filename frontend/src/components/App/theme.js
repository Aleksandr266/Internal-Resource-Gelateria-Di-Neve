import { createTheme } from '@mui/material/styles';

export const theme = createTheme({


  palette: {
    type: 'light',
    primary: {
      main: '#F378B1',
    },
    secondary: {
      main: '#F7B7D0',
    },
  },
  typography: {
    button: {
      fontFamily: 'Roboto',
      fontWeight: 500,
      lineHeight: 1.7,
      letterSpacing: '0.05em',
    },
    fontFamily: 'Roboto',
    fontSize: 14,
  },
  direction: 'rtl',
  shape: {
    borderRadius: 4,
  },
  spacing: 8,


  // palette: {
  //   type: 'light',
  //   primary: {
  //     main: '#f7b7d0',
  //     dark: '#cd3039',
  //     light: '#ffffff',
  //   },
  //   secondary: {
  //     main: '#f50057',
  //   },
  // },
  // typography: {
  //   button: {
  //     fontFamily: 'Roboto',
  //     fontWeight: 500,
  //     lineHeight: 1.7,
  //     letterSpacing: '0.05em',
  //   },
  // },
  
})
