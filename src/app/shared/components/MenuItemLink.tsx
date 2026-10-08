import { Box } from "@mui/material";
import type { ReactNode } from "react";
import { NavLink } from "react-router";
import { motion } from "motion/react";

export default function MenuItemLink({children,to}: {children: ReactNode,to :string}) {
  return (
    <NavLink to={to} style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        <Box sx={{
          position: 'relative',
          px: 2,
          py: 1,
          borderRadius: 2.5,
          fontWeight: 600,
          color: isActive ? 'primary.main' : 'text.secondary',
          transition: 'color .2s',
          '&:hover': { color: 'text.primary' }
        }}>
          {isActive && (
            <Box
              component={motion.span}
              layoutId='nav-pill'
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              sx={{ position: 'absolute', inset: 0, borderRadius: 2.5, bgcolor: 'action.selected', zIndex: 0 }}
            />
          )}
          <Box component='span' sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>
        </Box>
      )}
    </NavLink>
  )
}
