import { Container, CssBaseline} from '@mui/material';
import { Outlet, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import NavBar from './NavBar';

function App() {
  const location = useLocation();
  
  return (
    <>
      <CssBaseline />
      {location.pathname ==='/' ? <HomePage></HomePage> : (
        <>
        <NavBar />
          <Container maxWidth='xl' sx={{mt:3}}>
        <Outlet />
        </Container>
        </>
      )}
    </>
  )
}

export default App