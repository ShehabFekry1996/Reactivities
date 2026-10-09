import { ArrowForward, Bolt, Explore, Forum, Map, People, Event } from "@mui/icons-material";
import { Avatar, AvatarGroup, Box, Button, Card, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router";
import { motion, type Variants } from "motion/react";
import { useAccounts } from "../../lib/types/hooks/useAccounts";
import { gradient } from "../../app/theme/theme";
import { categoryImage, categoryOptions, getCategory } from "../activities/details/form/categoryOptions";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const features = [
  { icon: <Explore />, title: 'Discover', text: 'Browse activities by category, date and city with instant search and filters.' },
  { icon: <Event />, title: 'Host', text: 'Create an event in seconds, pick a venue and watch people join in real time.' },
  { icon: <Forum />, title: 'Live chat', text: 'Every activity has its own live chat, powered by SignalR, so plans come together fast.' },
  { icon: <People />, title: 'Follow friends', text: 'Follow people you like and see who is going before you decide.' },
  { icon: <Map />, title: 'Explore the map', text: 'See every upcoming activity on an interactive map and find what is near you.' },
  { icon: <Bolt />, title: 'Fast everywhere', text: 'A responsive, installable-feeling experience on phone, tablet and desktop.' },
];

const portraits = [
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/65.jpg',
  'https://randomuser.me/api/portraits/men/75.jpg',
  'https://randomuser.me/api/portraits/women/12.jpg',
];

function Blob({ color, size, top, left, delay }: { color: string; size: number; top: string; left: string; delay: number }) {
  return (
    <Box
      component={motion.div}
      animate={{ x: [0, 40, -30, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay }}
      sx={{
        position: 'absolute', top, left, width: size, height: size, borderRadius: '50%',
        background: color, filter: 'blur(80px)', opacity: 0.55, pointerEvents: 'none'
      }}
    />
  );
}

export default function HomePage() {
  const { currentUser } = useAccounts();

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Box sx={{ position: 'relative', minHeight: { xs: 'calc(100svh - 60px)', md: 'calc(100vh - 72px)' }, display: 'flex', alignItems: 'center' }}>
        <Blob color='#6C5CE7' size={420} top='-10%' left='-8%' delay={0} />
        <Blob color='#00B8A9' size={360} top='40%' left='70%' delay={2} />
        <Blob color='#EC4899' size={280} top='65%' left='10%' delay={4} />

        <Container maxWidth='lg' sx={{ position: 'relative', py: { xs: 6, md: 10 }, px: { xs: 2, sm: 3 } }}>
          <Grid container spacing={6} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Box component={motion.div} variants={container} initial='hidden' animate='show'>
                <Box component={motion.div} variants={item}>
                  <Stack direction='row' spacing={1} sx={{
                    alignItems: 'center', display: 'inline-flex', px: 1.5, py: 0.75, borderRadius: 99,
                    border: 1, borderColor: 'divider', bgcolor: 'background.paper', mb: 3
                  }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'secondary.main', boxShadow: '0 0 0 4px rgba(0,184,169,.2)' }} />
                    <Typography variant='body2' sx={{ fontWeight: 600 }}>New activities every week</Typography>
                  </Stack>
                </Box>
                <Typography
                  component={motion.h1}
                  variants={item}
                  variant='h1'
                  sx={{ fontSize: { xs: '2.6rem', sm: '3.5rem', md: '4.4rem' }, lineHeight: 1.05, mb: 3 }}
                >
                  Find your people.{' '}
                  <Box component='span' sx={{ backgroundImage: gradient, backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                    Make plans that matter.
                  </Box>
                </Typography>
                <Typography component={motion.p} variants={item} color='text.secondary' sx={{ fontSize: { xs: '1.05rem', md: '1.2rem' }, maxWidth: 560, mb: 4 }}>
                  Reactivities brings together food crawls, gigs, desert trips and late-night museum tours.
                  Join what is happening, host your own, and chat with everyone going.
                </Typography>
                <Stack component={motion.div} variants={item} direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  {currentUser ? (
                    <Button component={Link} to='/activities' size='large' variant='contained' endIcon={<ArrowForward />} sx={{ py: 1.6, px: 4 }}>
                      Explore activities
                    </Button>
                  ) : (
                    <>
                      <Button component={Link} to='/register' size='large' variant='contained' endIcon={<ArrowForward />} sx={{ py: 1.6, px: 4 }}>
                        Get started free
                      </Button>
                      <Button component={Link} to='/login' size='large' variant='outlined' sx={{ py: 1.6, px: 4 }}>
                        I have an account
                      </Button>
                    </>
                  )}
                </Stack>
                <Stack component={motion.div} variants={item} direction='row' spacing={2} sx={{ alignItems: 'center', mt: 5 }}>
                  <AvatarGroup max={5} sx={{ '& .MuiAvatar-root': { width: 40, height: 40, borderColor: 'background.default' } }}>
                    {portraits.map(src => <Avatar key={src} src={src} />)}
                  </AvatarGroup>
                  <Typography variant='body2' color='text.secondary'>
                    <Box component='b' sx={{ color: 'text.primary' }}>Join the community</Box> of explorers, foodies and music lovers
                  </Typography>
                </Stack>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ position: 'relative', height: 480 }}>
                {categoryOptions.slice(0, 6).map((category, index) => {
                  const meta = getCategory(category.value);
                  const positions = [
                    { top: '0%', left: '10%' }, { top: '8%', left: '58%' }, { top: '34%', left: '30%' },
                    { top: '56%', left: '0%' }, { top: '62%', left: '60%' }, { top: '84%', left: '28%' },
                  ];
                  return (
                    <Card
                      key={category.value}
                      component={motion.div}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
                      transition={{
                        opacity: { delay: 0.3 + index * 0.1 },
                        scale: { delay: 0.3 + index * 0.1, type: 'spring' },
                        y: { duration: 4 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }
                      }}
                      whileHover={{ scale: 1.08, rotate: -2 }}
                      sx={{
                        position: 'absolute', ...positions[index], display: 'flex', alignItems: 'center', gap: 1.5,
                        px: 2.5, py: 1.5, borderRadius: 4, border: 1, borderColor: 'divider',
                        boxShadow: '0 20px 40px rgba(20,22,41,.12)', cursor: 'default'
                      }}
                    >
                      <Box sx={{ width: 40, height: 40, borderRadius: 3, display: 'grid', placeItems: 'center', bgcolor: `${meta.color}22`, fontSize: 20 }}>
                        {meta.emoji}
                      </Box>
                      <Typography sx={{ fontWeight: 700 }}>{category.text}</Typography>
                    </Card>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth='lg' sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant='overline' sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '.12em' }}>Everything you need</Typography>
          <Typography variant='h3' sx={{ fontSize: { xs: '2rem', md: '2.8rem' } }}>Built for getting out there</Typography>
        </Box>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid key={feature.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                component={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -6 }}
                sx={{ p: 3.5, height: '100%', border: 1, borderColor: 'divider', transition: 'box-shadow .3s', '&:hover': { boxShadow: '0 24px 48px rgba(108,92,231,.15)' } }}
              >
                <Box sx={{ width: 52, height: 52, borderRadius: 3.5, display: 'grid', placeItems: 'center', color: 'white', backgroundImage: gradient, mb: 2.5 }}>
                  {feature.icon}
                </Box>
                <Typography variant='h6' sx={{ mb: 1 }}>{feature.title}</Typography>
                <Typography color='text.secondary'>{feature.text}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth='lg' sx={{ pb: { xs: 8, md: 12 }, px: { xs: 2, sm: 3 } }}>
        <Typography variant='h4' sx={{ mb: 3, fontSize: { xs: '1.6rem', md: '2.125rem' } }}>Pick your vibe</Typography>
        <Grid container spacing={2}>
          {categoryOptions.map((category, index) => (
            <Grid key={category.value} size={{ xs: 6, sm: 4, md: 3 }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                sx={{
                  position: 'relative', height: { xs: 130, md: 180 }, borderRadius: 5, overflow: 'hidden',
                  '&:hover img': { transform: 'scale(1.08)' }
                }}
              >
                <Box component='img' src={categoryImage(category.value, 900)} loading='lazy' alt={category.text}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .6s ease' }} />
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.75), transparent 60%)' }} />
                <Typography variant='h6' sx={{ position: 'absolute', left: 16, bottom: 12, color: 'white' }}>
                  {getCategory(category.value).emoji} {category.text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth='lg' sx={{ pb: { xs: 14, md: 10 }, px: { xs: 2, sm: 3 } }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          sx={{ borderRadius: 6, p: { xs: 4, md: 7 }, textAlign: 'center', color: 'white', backgroundImage: gradient, position: 'relative', overflow: 'hidden' }}
        >
          <Typography variant='h3' sx={{ fontSize: { xs: '1.8rem', md: '2.6rem' }, mb: 1.5 }}>Your next plan is one tap away</Typography>
          <Typography sx={{ opacity: 0.9, mb: 4 }}>Join an activity tonight or host one this weekend.</Typography>
          <Button
            component={Link}
            to={currentUser ? '/activities' : '/register'}
            size='large'
            endIcon={<ArrowForward />}
            sx={{ bgcolor: 'white', color: '#141629', px: 4, py: 1.5, '&:hover': { bgcolor: 'rgba(255,255,255,.9)' } }}
          >
            {currentUser ? 'Browse activities' : 'Create free account'}
          </Button>
        </Box>
        <Typography variant='body2' color='text.secondary' sx={{ textAlign: 'center', mt: 6 }}>
          © {new Date().getFullYear()} Reactivities
        </Typography>
      </Container>
    </Box>
  );
}
