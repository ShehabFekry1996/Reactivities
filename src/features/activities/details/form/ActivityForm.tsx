import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";
import { useActivities } from "../../../../lib/types/hooks/useActivities";
import { useNavigate, useParams } from "react-router";

    export default function ActivityForm() {

        const {id} = useParams();
        const {updateActivity,createActivity,activity,isLoadingActivity} = useActivities(id);
        const navigate = useNavigate();
        const handleSubmit =async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData  = new FormData(event.currentTarget);
        const data: { [key: string]: FormDataEntryValue } = {}
        formData.forEach((value, key) => {
            data[key] = value;
        });
        if (activity) 
            {data.id = activity.id;
        updateActivity.mutateAsync(data as unknown as Activity);
        navigate(`/activities/${activity.id}`);
            }
        else{
            await createActivity.mutate(data as unknown as Activity, {
                onSuccess: (id) => navigate(`/activities/${id}`) 
            });
        }
    }
if(isLoadingActivity)
    return <Typography>Loading activity ...</Typography>
    return (
        <Paper sx={{ padding: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                {activity ? 'Edit Activity' : 'Create Activity'}
            </Typography>
            <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField label='Title' name='title' defaultValue={activity?.title} />
                <TextField label='Description' name='description' 
                defaultValue={activity?.description} multiline rows={3} />
                <TextField label='Category' name='category' defaultValue={activity?.category} />
                <TextField 
                label='Date' name='date'
                 type="datetime-local" defaultValue={activity?.date ?
                  activity.date.slice(0, 16) : new Date().toISOString().slice(0, 16)} />
                <TextField label='City' name='city' defaultValue={activity?.city} />
                <TextField label='Venue' name='venue' defaultValue={activity?.venue} />
                <Box sx={{ display: 'flex', justifyContent: 'end', gap: 3 }}>
                    <Button color='inherit' >Cancel</Button>
                    <Button type="submit" color='success' disabled={updateActivity.isPending || createActivity.isPending} variant='contained'>Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}