import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { motion } from "motion/react";

type Props = {
  icon: ReactNode;
  title: string;
  message?: string;
  action?: ReactNode;
};

export default function EmptyState({ icon, title, message, action }: Props) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      sx={{
        textAlign: 'center', py: 8, px: 3, borderRadius: 5,
        border: '2px dashed', borderColor: 'divider',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5
      }}
    >
      <Box sx={{
        width: 72, height: 72, borderRadius: '50%', display: 'grid', placeItems: 'center',
        bgcolor: 'action.hover', color: 'primary.main', '& svg': { fontSize: 36 }
      }}>
        {icon}
      </Box>
      <Typography variant="h6">{title}</Typography>
      {message && <Typography color="text.secondary" sx={{ maxWidth: 380 }}>{message}</Typography>}
      {action}
    </Box>
  );
}
