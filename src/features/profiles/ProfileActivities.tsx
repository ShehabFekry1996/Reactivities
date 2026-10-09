import { Box, Card, Divider, Grid, Skeleton, Tab, Tabs, Typography } from "@mui/material";
import { EventBusy } from "@mui/icons-material";
import { Link, useParams } from "react-router";
import { format } from "date-fns";
import { motion } from "motion/react";
import { useProfile } from "../../lib/types/hooks/useProfile";
import EmptyState from "../../app/shared/components/EmptyState";
import { categoryImage, getCategory } from "../activities/details/form/categoryOptions";

const tabs = [
  { label: "Upcoming", value: "future" },
  { label: "Past", value: "past" },
  { label: "Hosting", value: "hosting" },
];

export default function ProfileActivities() {
  const { id } = useParams();
  const { userActivities, loadingUserActivities, filter, setFilter } = useProfile(id, "activities");

  return (
    <Box>
      <Typography variant="h5">Events</Typography>
      <Tabs value={filter} onChange={(_, value) => setFilter(value)} sx={{ mt: 1 }}>
        {tabs.map(tab => <Tab key={tab.value} label={tab.label} value={tab.value} />)}
      </Tabs>
      <Divider sx={{ mb: 3 }} />

      {loadingUserActivities ? (
        <Grid container spacing={2}>
          {[0, 1, 2].map(i => (
            <Grid key={i} size={{ xs: 6, sm: 4, lg: 3 }}><Skeleton variant="rounded" height={190} sx={{ borderRadius: 4 }} /></Grid>
          ))}
        </Grid>
      ) : userActivities?.length === 0 ? (
        <EmptyState icon={<EventBusy />} title="No events here" message="Nothing to show for this filter yet." />
      ) : (
        <Grid container spacing={2}>
          {userActivities?.map((activity, index) => {
            const meta = getCategory(activity.category);
            return (
              <Grid key={activity.id} size={{ xs: 6, sm: 4, lg: 3 }}>
                <Card
                  component={motion.div}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  sx={{ border: 1, borderColor: "divider", height: "100%" }}
                >
                  <Box component={Link} to={`/activities/${activity.id}`} sx={{ textDecoration: "none", color: "inherit", display: "block" }}>
                    <Box sx={{ position: "relative", height: 110 }}>
                      <Box component="img" src={categoryImage(activity.category, 500, activity.imageIndex)} alt={activity.category}
                        sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <Box sx={{ position: "absolute", top: 8, left: 8, px: 1, py: 0.25, borderRadius: 2, bgcolor: meta.color, color: "white", fontSize: 12, fontWeight: 700 }}>
                        {meta.emoji}
                      </Box>
                    </Box>
                    <Box sx={{ p: 1.5 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: "0.92rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {activity.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {format(new Date(activity.date), "dd MMM yyyy")}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
