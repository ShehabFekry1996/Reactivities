import { Group } from "@mui/icons-material";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";

type Props ={
    openForm: () => void;

}

export default function NavBar({openForm}: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)' }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Group fontSize="large" />
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Reactivities
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Activities</Box>
              <Box sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>About</Box>
              <Box sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>Contact</Box>
            </Box>

            <Button variant="contained" sx={{ textTransform: 'uppercase', fontWeight: 'bold' }} color="warning">
              Create Activity
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}