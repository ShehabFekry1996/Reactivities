import { useState } from "react";
import { Button, Menu, MenuItem,Box, Avatar, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { Person, Logout, Add } from "@mui/icons-material";
import { useAccounts } from "../../lib/types/hooks/useAccounts";
import { Link } from "react-router";

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const {currentUser ,logoutUser} = useAccounts();
  console.log(currentUser);
  return (
    <>
      <Button color="inherit" size="large" sx={{fontSize:'1.1rem'}} onClick={handleClick}>
        <Box sx={{display:'flex', alignItems:'center', gap:2}}>
            <Avatar src={currentUser?.imageUrl} alt="current user"></Avatar >
            {currentUser?.displayName}
        </Box>
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem component={Link} to='/createActivity' onClick={handleClose}>
        <ListItemIcon>
          <Add></Add>
          </ListItemIcon>
          <ListItemText>Create Activity</ListItemText>
        </MenuItem>
        <Divider></Divider>
         <MenuItem component={Link} to={`/profiles/${currentUser?.id}`} onClick={handleClose}>
        <ListItemIcon>
          <Person></Person>
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <Divider></Divider>
         <MenuItem onClick={() => {
          logoutUser.mutate();
          handleClose();
         }}>
        <ListItemIcon>
          <Logout></Logout>
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}