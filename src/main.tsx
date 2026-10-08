import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/plus-jakarta-sans'
import '@fontsource/roboto/400.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-calendar/dist/Calendar.css'
import 'leaflet/dist/leaflet.css'
import './app/layout/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router'
import { router } from './app/layout/router/Routes'
import { store, StoreContext } from './lib/stores/store'
import {ToastContainer} from 'react-toastify'
import { LocalizationProvider } from '@mui/x-date-pickers'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './app/theme/theme'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme} defaultMode='system'>
      <CssBaseline enableColorScheme />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StoreContext.Provider value={store}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools buttonPosition='bottom-left'></ReactQueryDevtools>
            <ToastContainer position='bottom-right' hideProgressBar theme='colored'></ToastContainer>
            <RouterProvider router={router}></RouterProvider>
          </QueryClientProvider>
        </StoreContext.Provider>
      </LocalizationProvider>
    </ThemeProvider>
  </StrictMode>,
)
