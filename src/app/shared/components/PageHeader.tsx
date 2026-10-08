import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  action?: ReactNode;
};

export default function PageHeader({ eyebrow, title, subtitle, action }: Props) {
  return (
    <Box sx={{
      display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2,
      alignItems: { xs: 'flex-start', sm: 'flex-end' }, justifyContent: 'space-between', mb: { xs: 2.5, md: 4 }
    }}>
      <Box>
        {eyebrow && (
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '.12em' }}>
            {eyebrow}
          </Typography>
        )}
        <Typography variant="h4" sx={{ fontSize: { xs: '1.6rem', md: '2.125rem' } }}>{title}</Typography>
        {subtitle && <Typography color="text.secondary" sx={{ mt: 0.5 }}>{subtitle}</Typography>}
      </Box>
      {action}
    </Box>
  );
}
