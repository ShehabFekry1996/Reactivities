import { Box, Button, Grid, Skeleton } from "@mui/material"
import { ArrowBack } from "@mui/icons-material";
import { Link, useParams } from "react-router";
import { useActivities } from "../../../lib/types/hooks/useActivities";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";


export default function ActivityDetailPage() {

  const {id} = useParams();
  const {activity,isLoadingActivity} = useActivities(id);

  if(isLoadingActivity || !activity)
    return (
      <Box>
        <Skeleton variant="rounded" height={360} sx={{ borderRadius: 6, mb: 3 }} />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}><Skeleton variant="rounded" height={240} sx={{ borderRadius: 5 }} /></Grid>
          <Grid size={{ xs: 12, md: 4 }}><Skeleton variant="rounded" height={240} sx={{ borderRadius: 5 }} /></Grid>
        </Grid>
      </Box>
    )

  return (
    <Box>
      <Button component={Link} to="/activities" startIcon={<ArrowBack />} color="inherit" sx={{ mb: 2, color: 'text.secondary' }}>
        Back to activities
      </Button>
      <ActivityDetailsHeader activity={activity}></ActivityDetailsHeader>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ActivityDetailsInfo activity={activity}></ActivityDetailsInfo>
          <ActivityDetailsChat></ActivityDetailsChat>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ position: { md: 'sticky' }, top: 96 }}>
            <ActivityDetailsSidebar activity={activity}></ActivityDetailsSidebar>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
