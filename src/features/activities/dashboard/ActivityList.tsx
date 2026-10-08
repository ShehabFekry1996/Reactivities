import { Box, Typography } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { useActivities } from "../../../lib/types/hooks/useActivities";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

const ActivityList = observer(function ActivityList() {

    const {activitiesGroup,isLoading,hasNextPage,fetchNextPage,isFetchingNextPage} = useActivities()
    const {ref, inView} = useInView({threshold: 0.5});

    useEffect(() => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  if(isLoading)
    return <Typography>Loading ...</Typography>
  if(!activitiesGroup || activitiesGroup.pages[0].items.length === 0)
    return <Typography>No activities found</Typography>
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {activitiesGroup.pages.map((page, pageIndex) => (
            <Box
              key={pageIndex}
              ref={pageIndex === activitiesGroup.pages.length - 1 ? ref : null}
              sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
            >
              {page.items.map(activity => (
                <ActivityCard key={activity.id} activity={activity}/>
              ))}
            </Box>
        ))}
        {isFetchingNextPage && <Typography>Loading more ...</Typography>}
    </Box>
  )
});

export default ActivityList;
