import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";
import { IconButton, Tooltip, useColorScheme } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

export default function ThemeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();
  const resolved = mode === 'system' ? systemMode : mode;
  const isDark = resolved === 'dark';

  return (
    <Tooltip title={isDark ? 'Light mode' : 'Dark mode'}>
      <IconButton onClick={() => setMode(isDark ? 'light' : 'dark')} sx={{ border: 1, borderColor: 'divider' }}>
        <AnimatePresence mode='wait' initial={false}>
          <motion.span
            key={isDark ? 'dark' : 'light'}
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex' }}
          >
            {isDark ? <LightModeRounded fontSize="small" /> : <DarkModeRounded fontSize="small" />}
          </motion.span>
        </AnimatePresence>
      </IconButton>
    </Tooltip>
  );
}
