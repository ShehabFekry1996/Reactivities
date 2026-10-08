import { ArrowBack } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import { gradient } from '../../app/theme/theme'

export default function NotFound() {
  return (
    <Box sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 2, px: 2 }}>
      <Typography
        component={motion.h1}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
        transition={{ scale: { type: 'spring' }, y: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
        sx={{ fontSize: { xs: '6rem', md: '9rem' }, fontWeight: 900, lineHeight: 1, m: 0, backgroundImage: gradient, backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}
      >
        404
      </Typography>
      <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
        We could not find what you are looking for
      </Typography>
      <Typography color="text.secondary">The page may have moved, or the activity no longer exists.</Typography>
      <Button component={Link} to='/activities' variant="contained" startIcon={<ArrowBack />} sx={{ mt: 2 }}>
        Back to activities
      </Button>
    </Box>
  )
}
