import { Group } from "@mui/icons-material";
import { AppBar, Box,  Container, LinearProgress, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { useStore } from "../../lib/stores/useStore";
import { Observer } from "mobx-react-lite";



export default function NavBar() {
  const {uiStore} = useStore();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="relative" 
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
              <MenuItemLink to='/counter'>Counter</MenuItemLink>
              <MenuItemLink to='/errors'>Errors</MenuItemLink>
            </Box>
            <Box>
            UserMenu
            </Box>
          </Toolbar>
        </Container>
        <Observer>
          {() => uiStore.isLoading ? (
            <LinearProgress color="secondary" sx={{position:'absolute',height:4,bottom:0,left:0,right:0}}></LinearProgress>
          ) : null}
        </Observer>
      </AppBar>
    </Box>
  );
}