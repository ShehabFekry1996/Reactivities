import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { EventBusy } from "@mui/icons-material";
import ActivityCard from "./ActivityCard";
import ActivityCardSkeleton from "./ActivityCardSkeleton";
import { useActivities } from "../../../lib/types/hooks/useActivities";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import EmptyState from "../../../app/shared/components/EmptyState";
import { useStore } from "../../../lib/stores/useStore";

const ActivityList = observer(function ActivityList() {

    const {activitiesGroup,isLoading,hasNextPage,fetchNextPage,isFetchingNextPage} = useActivities()
    const {activityStore: {resetFilters}} = useStore();
    const {ref, inView} = useInView({rootMargin: '200px'});

    useEffect(() => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  if(isLoading)
    return (
      <Grid container spacing={2.5}>
        {[0, 1, 2, 3].map(i => (
          <Grid key={i} size={{ xs: 12, sm: 6 }}><ActivityCardSkeleton /></Grid>
        ))}
      </Grid>
    )

  const activities = activitiesGroup?.pages.flatMap(page => page.items) ?? [];

  if(activities.length === 0)
    return (
      <EmptyState
        icon={<EventBusy />}
        title="No activities found"
        message="Try a different category, date or search term."
        action={<Button variant="outlined" onClick={resetFilters}>Clear filters</Button>}
      />
    )

  return (
    <>
      <Grid container spacing={2.5}>
        {activities.map((activity, index) => (
          <Grid key={activity.id} size={{ xs: 12, sm: 6 }}>
            <ActivityCard activity={activity} index={index % 3} />
          </Grid>
        ))}
      </Grid>
      <Box ref={ref} sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        {isFetchingNextPage && <CircularProgress size={28} />}
      </Box>
    </>
  )
});

export default ActivityList;
