import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useActivities } from "../../../../lib/types/hooks/useActivities";
import { useParams } from "react-router";
import { useForm} from 'react-hook-form';
import { useEffect } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { activitySchema, type ActivitySchema } from "../../../../lib/schemas/activitySchema";
import TextInput from "../../../../app/shared/TextInput";

    export default function ActivityForm() {

        const {register,control, reset,handleSubmit} = useForm<ActivitySchema>({
            mode:'onTouched',
            resolver: zodResolver(activitySchema)});
        const {id} = useParams();
        const {updateActivity,createActivity,activity,isLoadingActivity} = useActivities(id);
        
        useEffect(() => {
            if(activity)
                reset(activity);
        },[activity,reset])
        const onSubmit =async (data: ActivitySchema) => {
            console.log(data);
        }
if(isLoadingActivity)
    return <Typography>Loading activity ...</Typography>
    return (
        <Paper sx={{ padding: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                {activity ? 'Edit Activity' : 'Create Activity'}
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextInput control={control} name='title' label="Title"></TextInput>
                <TextField {...register('description')} label='Description' 
                defaultValue={activity?.description} multiline rows={3} />
                <TextField {...register('category')} label='Category'    defaultValue={activity?.category} />
                <TextField 
                label='Date' {...register('date')}
                 type="datetime-local" defaultValue={activity?.date ?
                  activity.date.slice(0, 16) : new Date().toISOString().slice(0, 16)} />
                <TextField {...register('city')} label='City'  defaultValue={activity?.city} />
                <TextField {...register('venue')} label='Venue'  defaultValue={activity?.venue} />
                <Box sx={{ display: 'flex', justifyContent: 'end', gap: 3 }}>
                    <Button color='inherit' >Cancel</Button>
                    <Button type="submit" color='success' disabled={updateActivity.isPending || createActivity.isPending} variant='contained'>Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}