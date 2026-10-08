import { Box, Paper, Stack, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import type { FormEventHandler, ReactNode } from "react";
import { motion } from "motion/react";
import { gradient } from "../../app/theme/theme";

type Props = {
  title: string;
  subtitle: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
};

const perks = [
  "Join activities in seconds",
  "Chat live with everyone going",
  "Follow friends and see their plans",
];

export default function AuthLayout({ title, subtitle, onSubmit, children }: Props) {
  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      sx={{
        mt: { xs: 1, md: 4 },
        mx: "auto",
        maxWidth: 980,
        borderRadius: 6,
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        boxShadow: "0 30px 80px rgba(20,22,41,.12)",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "space-between",
          p: 5,
          color: "white",
          backgroundImage: gradient,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          component={motion.div}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          sx={{ position: "absolute", width: 420, height: 420, borderRadius: "40%", border: "1px solid rgba(255,255,255,.2)", top: -120, right: -160 }}
        />
        <Box
          component={motion.div}
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          sx={{ position: "absolute", width: 300, height: 300, borderRadius: "38%", border: "1px solid rgba(255,255,255,.15)", bottom: -100, left: -80 }}
        />
        <Typography variant="h3" sx={{ position: "relative", fontSize: "2.4rem" }}>
          Life is better with plans.
        </Typography>
        <Stack spacing={2} sx={{ position: "relative" }}>
          {perks.map((perk, index) => (
            <Stack
              key={perk}
              component={motion.div}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.12 }}
              direction="row"
              spacing={1.5}
              sx={{ alignItems: "center" }}
            >
              <CheckCircle />
              <Typography sx={{ fontWeight: 600 }}>{perk}</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>

      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{ p: { xs: 3, sm: 5 }, display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>{title}</Typography>
          <Typography color="text.secondary">{subtitle}</Typography>
        </Box>
        {children}
      </Box>
    </Paper>
  );
}
