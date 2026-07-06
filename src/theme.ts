import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4F46E5',
      dark: '#4338CA',
      light: '#EEF2FF',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#059669',
      light: '#ECFDF5',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#DC2626',
      light: '#FEF2F2'
    },
    background: {
      default: '#F4F5FB',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#1E1B2E',
      secondary: '#6B7280'
    },
    divider: '#E7E8F2'
  },
  shape: {
    borderRadius: 16
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    h1: { fontFamily: "'Poppins', sans-serif", fontWeight: 700 },
    h2: { fontFamily: "'Poppins', sans-serif", fontWeight: 700 },
    h3: { fontFamily: "'Poppins', sans-serif", fontWeight: 600 },
    h4: { fontFamily: "'Poppins', sans-serif", fontWeight: 600 },
    h5: { fontFamily: "'Poppins', sans-serif", fontWeight: 600 },
    h6: { fontFamily: "'Poppins', sans-serif", fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow:
            '0 1px 2px rgba(30,27,46,.06), 0 1px 3px rgba(30,27,46,.08)',
          transition: 'box-shadow .18s ease, transform .18s ease'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingLeft: 20,
          paddingRight: 20
        },
        containedPrimary: {
          boxShadow: '0 4px 10px rgba(79,70,229,.3)'
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow:
            '0 12px 28px rgba(30,27,46,.18), 0 4px 8px rgba(30,27,46,.1)'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 999 }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 20 }
      }
    }
  }
})

export default theme
