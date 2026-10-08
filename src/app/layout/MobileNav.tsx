import { Add, Event, Map, People, Person } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Box, Paper } from "@mui/material";
import { Link, useLocation } from "react-router";
import { useAccounts } from "../../lib/types/hooks/useAccounts";
import { gradient } from "../theme/theme";

export default function MobileNav() {
  const { currentUser } = useAccounts();
  const { pathname } = useLocation();

  if (!currentUser) return null;

  const profilePath = `/profiles/${currentUser.id}`;
  const value = ['/activities', '/map', '/createActivity', '/people', profilePath]
    .find(path => pathname.startsWith(path)) ?? false;

  return (
    <Paper
      elevation={0}
      sx={theme => ({
        display: { xs: 'block', md: 'none' },
        position: 'fixed',
        left: 12,
        right: 12,
        bottom: 'calc(12px + env(safe-area-inset-bottom))',
        zIndex: 1100,
        borderRadius: 5,
        overflow: 'visible',
        backgroundColor: `rgba(${theme.vars?.palette.background.paperChannel} / 0.85)`,
        backdropFilter: 'blur(16px)',
        boxShadow: '0 12px 40px rgba(0,0,0,.18)'
      })}
    >
      <BottomNavigation showLabels value={value} sx={{ bgcolor: 'transparent', height: 64, borderRadius: 5, '& .MuiBottomNavigationAction-root': { minWidth: 0, px: 0.5 }, '& .MuiBottomNavigationAction-label': { fontSize: '0.7rem', '&.Mui-selected': { fontSize: '0.72rem' } } }}>
        <BottomNavigationAction component={Link} to='/activities' value='/activities' label='Activities' icon={<Event />} />
        <BottomNavigationAction component={Link} to='/map' value='/map' label='Map' icon={<Map />} />
        <BottomNavigationAction
          component={Link}
          to='/createActivity'
          value='/createActivity'
          aria-label='Create activity'
          icon={
            <Box sx={{
              width: 52, height: 52, mt: -4, borderRadius: '50%', display: 'grid', placeItems: 'center',
              color: 'white', backgroundImage: gradient, boxShadow: '0 10px 24px rgba(108,92,231,.45)'
            }}>
              <Add />
            </Box>
          }
        />
        <BottomNavigationAction component={Link} to='/people' value='/people' label='People' icon={<People />} />
        <BottomNavigationAction component={Link} to={profilePath} value={profilePath} label='Me' icon={<Person />} />
      </BottomNavigation>
    </Paper>
  );
}
