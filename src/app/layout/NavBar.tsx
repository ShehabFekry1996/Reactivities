import { Add, Groups } from "@mui/icons-material";
import { AppBar, Box, Button, Container, LinearProgress, Stack, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { useStore } from "../../lib/stores/useStore";
import { Observer } from "mobx-react-lite";
import { useAccounts } from "../../lib/types/hooks/useAccounts";
import UserMenu from "./UserMenu";
import ThemeToggle from "../shared/components/ThemeToggle";
import { gradient } from "../theme/theme";

const navLinks = [
  { to: '/activities', label: 'Activities' },
  { to: '/map', label: 'Map' },
  { to: '/people', label: 'People' },
];

export default function NavBar() {
  const {uiStore} = useStore();
  const {currentUser} = useAccounts();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={theme => ({
        color: 'text.primary',
        backgroundColor: `rgba(${theme.vars?.palette.background.defaultChannel} / 0.72)`,
        backdropFilter: 'saturate(180%) blur(16px)',
        borderBottom: 1,
        borderColor: 'divider'
      })}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, minHeight: { xs: 60, md: 72 } }}>
          <Box component={Link} to='/' sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'inherit', textDecoration: 'none' }}>
            <Box sx={{
              width: 38, height: 38, borderRadius: 3, display: 'grid', placeItems: 'center',
              backgroundImage: gradient, color: 'white', boxShadow: '0 8px 20px rgba(108,92,231,.35)'
            }}>
              <Groups fontSize="small" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
              Reactivities
            </Typography>
          </Box>

          {currentUser && (
            <Stack direction='row' spacing={0.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
              {navLinks.map(link => (
                <MenuItemLink key={link.to} to={link.to}>{link.label}</MenuItemLink>
              ))}
            </Stack>
          )}

          <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
            <ThemeToggle />
            {currentUser ? (
              <>
                <Button
                  component={Link}
                  to='/createActivity'
                  variant='contained'
                  startIcon={<Add />}
                  sx={{ display: { xs: 'none', md: 'inline-flex' } }}
                >
                  Create
                </Button>
                <UserMenu />
              </>
            ) : (
              <>
                <Button component={Link} to='/login' color='inherit'>Login</Button>
                <Button component={Link} to='/register' variant='contained' sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
                  Get started
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
      <Observer>
        {() => uiStore.isLoading ? (
          <LinearProgress sx={{ position: 'absolute', height: 3, bottom: 0, left: 0, right: 0 }} />
        ) : null}
      </Observer>
    </AppBar>
  );
}
