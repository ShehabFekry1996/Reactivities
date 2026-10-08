import { Box, Container } from '@mui/material';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import { motion } from 'motion/react';
import NavBar from './NavBar';
import MobileNav from './MobileNav';
import ScrollTopButton from '../shared/components/ScrollTopButton';

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <ScrollRestoration />
      <NavBar />
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {isHome ? <Outlet /> : (
          <Container maxWidth='xl' sx={{ pt: { xs: 2, md: 4 }, pb: { xs: 14, md: 6 }, px: { xs: 2, sm: 3 } }}>
            <Outlet />
          </Container>
        )}
      </motion.div>
      <MobileNav />
      <ScrollTopButton />
    </Box>
  )
}

export default App
