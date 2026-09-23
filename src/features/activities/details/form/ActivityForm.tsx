import { Box, Button, Paper, TextField, Typography } from "@mui/material";

type Props ={
    activity?: Activity
    closeForm: () => void
}

export default function ActivityForm({activity, closeForm}:Props) {
  return (

    <Paper sx={{padding:3}}>
        <Typography variant="h5" component="h2" gutterBottom>
            Create Activity
        </Typography>
        <Box component="form" sx={{display:'flex', flexDirection:'column', gap:3}}>
            <TextField label='Title' value={activity?.title}></TextField>
            <TextField label='Description' value={activity?.description} multiline rows={3}></TextField>
            <TextField label='Category' ></TextField>
            <TextField label='Date' type="datetime-local"></TextField>
            <TextField label='City'></TextField>
            <TextField label='Venue'></TextField>
            <Box sx={{display:'flex', justifyContent:'end', gap:3}}>
                <Button color='inherit' onClick={closeForm}>
                    Cancel
                </Button>
                <Button color='success' variant='contained'>
                    Submit
                </Button>
            </Box>
        </Box>
    </Paper>
   
  )
}
