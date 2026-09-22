import { Box, Button, Paper, TextField, Typography } from "@mui/material";

export default function ActivityForm() {
  return (

    <Paper sx={{padding:3}}>
        <Typography variant="h5" component="h2" gutterBottom>
            Create Activity
        </Typography>
        <Box component="form" sx={{display:'flex', flexDirection:'column', gap:3}}>
            <TextField label='Title'></TextField>
            <TextField label='Description' multiline rows={3}></TextField>
            <TextField label='Category' ></TextField>
            <TextField label='Date' type="datetime-local"></TextField>
            <TextField label='City'></TextField>
            <TextField label='Venue'></TextField>
            <Box sx={{display:'flex', justifyContent:'end', gap:3}}>
                <Button color='inherit'>Cancel</Button>
                <Button color='success' variant='contained'>Submit</Button>
            </Box>
        </Box>
    </Paper>
   
  )
}
