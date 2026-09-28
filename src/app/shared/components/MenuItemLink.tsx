import { Box } from "@mui/material";
import type { ReactNode } from "react";
import { NavLink } from "react-router";

export default function MenuItemLink({children,to}: {children: ReactNode,to :string}) {
  return (
    <Box component={NavLink} to={to} 
    sx={{
        fontSize: '1.2rem',
        textTransform: "uppercase",
        color: 'inherit',
        fontWeight: "bold",
        '&.active':{
            color: 'yellow'
        }
    }}
    >
        {children}
    </Box>
  )
}
