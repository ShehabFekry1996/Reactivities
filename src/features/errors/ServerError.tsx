import { ErrorOutlined } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";

export default function ServerError() {
    const { state } = useLocation();

    return (
        <Paper sx={{ maxWidth: 860, mx: 'auto', borderRadius: 5, overflow: 'hidden' }}>
            <Box sx={{ p: { xs: 3, md: 4 }, display: 'flex', gap: 2, alignItems: 'center', bgcolor: 'error.main', color: 'white' }}>
                <ErrorOutlined sx={{ fontSize: 40 }} />
                <Box>
                    <Typography variant="h5">{state?.error?.message || 'There has been an error'}</Typography>
                    <Typography sx={{ opacity: 0.9 }}>Something went wrong on our side.</Typography>
                </Box>
            </Box>
            {state?.error?.details && (
                <Box component="pre" sx={{ m: 0, p: { xs: 2, md: 4 }, overflow: 'auto', fontSize: 13, maxHeight: 400 }}>
                    {state.error.details}
                </Box>
            )}
            <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
                <Button component={Link} to="/activities" variant="contained">Back to activities</Button>
            </Box>
        </Paper>
    );
}
