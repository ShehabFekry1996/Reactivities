import { useState } from "react";
import {
  Menu,
  MenuItem,
  Box,
  Avatar,
  ListItemIcon,
  ListItemText,
  Divider,
  ButtonBase,
  Typography,
} from "@mui/material";
import { Person, Logout, Add, KeyboardArrowDown } from "@mui/icons-material";
import { useAccounts } from "../../lib/types/hooks/useAccounts";
import { Link } from "react-router";

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const { currentUser, logoutUser } = useAccounts();
  return (
    <>
      <ButtonBase
        onClick={handleClick}
        sx={{ borderRadius: 99, p: 0.5, pr: { xs: 0.5, sm: 1.5 }, gap: 1, '&:hover': { bgcolor: 'action.hover' } }}
      >
        <Avatar src={currentUser?.imageUrl} alt={currentUser?.displayName} sx={{ width: 36, height: 36 }}>
          {currentUser?.displayName.charAt(0)}
        </Avatar>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 0.5 }}>
          <Typography sx={{ fontWeight: 600 }}>{currentUser?.displayName}</Typography>
          <KeyboardArrowDown fontSize="small" sx={{ transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'none' }} />
        </Box>
      </ButtonBase>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { mt: 1, minWidth: 220, borderRadius: 3 } } }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography sx={{ fontWeight: 700 }}>{currentUser?.displayName}</Typography>
          <Typography variant="body2" color="text.secondary">{currentUser?.email}</Typography>
        </Box>
        <Divider />
        <MenuItem component={Link} to="/createActivity" onClick={handleClose}>
          <ListItemIcon>
            <Add fontSize="small" />
          </ListItemIcon>
          <ListItemText>Create Activity</ListItemText>
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/profiles/${currentUser?.id}`}
          onClick={handleClose}
        >
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            logoutUser.mutate();
            handleClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            <Logout fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
