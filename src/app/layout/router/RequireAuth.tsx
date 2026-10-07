import { Navigate, Outlet, useLocation } from "react-router";
import { useAccounts } from "../../../lib/types/hooks/useAccounts";
import Typography from "@mui/material/Typography";

export default function RequireAuth() {
    const {currentUser,loadingUserInfo} = useAccounts();
    const location = useLocation();
    if(loadingUserInfo) return <Typography>Loading...</Typography>;
    if(!currentUser) return <Navigate to='/login' state={{ from: location }} />;
  return (
   <Outlet ></Outlet>
  )
}
