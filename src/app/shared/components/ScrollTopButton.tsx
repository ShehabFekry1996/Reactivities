import { KeyboardArrowUp } from "@mui/icons-material";
import { Fab, useScrollTrigger, Zoom } from "@mui/material";

export default function ScrollTopButton() {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 500 });

  return (
    <Zoom in={trigger}>
      <Fab
        size="medium"
        color="primary"
        aria-label="scroll back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        sx={{ position: 'fixed', right: { xs: 20, md: 32 }, bottom: { xs: 100, md: 32 }, zIndex: 1050 }}
      >
        <KeyboardArrowUp />
      </Fab>
    </Zoom>
  );
}
