import { Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
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
import { gradient } from "../../../../app/theme/theme";

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
        }
    if(isLoadingActivity)
    return <Box sx={{ display: 'grid', placeItems: 'center', height: '50vh' }}><CircularProgress /></Box>
    return (
        <Paper sx={{ maxWidth: 860, mx: 'auto', borderRadius: { xs: 4, md: 6 }, overflow: 'hidden' }}>
            <Box sx={{ backgroundImage: gradient, color: 'white', px: { xs: 3, md: 5 }, py: { xs: 3, md: 4 } }}>
                <Typography variant="h4" sx={{ fontSize: { xs: '1.6rem', md: '2.1rem' } }}>
                    {activity ? 'Edit activity' : 'Create a new activity'}
                </Typography>
                <Typography sx={{ opacity: 0.9 }}>
                    {activity ? 'Update the details for your attendees' : 'Tell people what, when and where'}
                </Typography>
            </Box>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: { xs: 3, md: 5 } }}>
                <TextInput control={control} name='title' label="Title"></TextInput>
                <TextInput control={control} name='description' multiline rows={4} label="Description"></TextInput>
                <Box sx={{display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3}}>
                    <SelectInput items={categoryOptions} control={control} name='category' label="Category"></SelectInput>
                    <DateTimeInput control={control} name='date' label="Date"></DateTimeInput>
                </Box>
                <LocationInput name='location' control={control} label='Enter the location'></LocationInput>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button color='inherit' onClick={() => navigate(-1)}>Cancel</Button>
                    <Button type="submit" size="large" loading={updateActivity.isPending || createActivity.isPending} variant='contained'>
                        {activity ? 'Save changes' : 'Create activity'}
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}
