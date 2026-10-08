import { Navigate, Outlet, useLocation } from "react-router";
import { useAccounts } from "../../../lib/types/hooks/useAccounts";
import { Box, CircularProgress } from "@mui/material";

export default function RequireAuth() {
    const {currentUser,loadingUserInfo} = useAccounts();
    const location = useLocation();
    if(loadingUserInfo) return (
      <Box sx={{ display: 'grid', placeItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
    if(!currentUser) return <Navigate to='/login' state={{ from: location }} />;
  return (
   <Outlet ></Outlet>
  )
}
