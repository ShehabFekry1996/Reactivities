import { Group } from "@mui/icons-material";
import { AppBar, Box,  Container, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";



export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)' }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box component={NavLink} to='/' sx={{ display:'flex',gap:2}}></Box>
              <Group fontSize="large" />
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Reactivities
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <MenuItemLink to='/activities'>Activities</MenuItemLink>
              <MenuItemLink to='/createActivity'>Create Activity</MenuItemLink>
            </Box>
            <Box>
            UserMenu
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}