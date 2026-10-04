import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../../lib/types/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm} from 'react-hook-form';
import { useEffect } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { activitySchema, type ActivitySchema } from "../../../../lib/schemas/activitySchema";
import TextInput from "../../../../app/shared/components/TextInput";
import SelectInput from "../../../../app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../../app/shared/components/LocationInput";

    export default function ActivityForm() {

        const {control, reset,handleSubmit} = useForm<ActivitySchema>({
            mode:'onTouched',
            resolver: zodResolver(activitySchema)});
        const {id} = useParams();
        const {updateActivity,createActivity,activity,isLoadingActivity} = useActivities(id);
        const navigate = useNavigate();
        useEffect(() => {
            if(activity)
                reset({
            ...activity,
        location:{
            city : activity.city,
            venue : activity.venue,
            latitude : activity.latitude,
            longitude : activity.longitude
        }});
        },[activity,reset])
        const onSubmit =async (data: ActivitySchema) => {
            const{location,...rest} = data;
            const activityData = {...rest,...location};
            try{
                if(activity)
                    updateActivity.mutate({...activity,...activityData},
                {onSuccess: () => {navigate(`/activities/${activity.id}`)}});
                else{
                    createActivity.mutate(activityData,
                {onSuccess: (id) => {navigate(`/activities/${id}`)}});
            }
        }
            catch(error)
            {
                console.log('Error submitting activity:', error);
            }
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
                <TextInput control={control} name='description' multiline rows={3} label="Description"></TextInput>
                <Box sx={{display: 'flex', gap: 3}}>
                    <SelectInput items={categoryOptions} control={control} name='category' label="Category"></SelectInput>
                    <DateTimeInput control={control} name='date' label="Date"></DateTimeInput>

                </Box>
                <LocationInput name='location' control={control} label='Enter the location'></LocationInput>
                <Box sx={{ display: 'flex', justifyContent: 'end', gap: 3 }}>
                    <Button color='inherit' >Cancel</Button>
                    <Button type="submit" color='success' disabled={updateActivity.isPending || createActivity.isPending} variant='contained'>Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}