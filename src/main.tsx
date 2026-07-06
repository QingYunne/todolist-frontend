import { createRoot } from 'react-dom/client'
import App from '~/App.tsx'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import theme from '~/theme'

const queryClient = new QueryClient

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <App />
      <ToastContainer position="bottom-left" theme="colored" />
    </QueryClientProvider>
  </ThemeProvider>
)