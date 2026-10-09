import { Box, Chip, Grid, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { Map as MapIcon, Place } from "@mui/icons-material";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { latLngBounds } from "leaflet";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { format } from "date-fns";
import { motion } from "motion/react";
import { useExplore } from "../../../lib/types/hooks/useExplore";
import { categoryImage, categoryOptions, getCategory } from "../details/form/categoryOptions";
import { categoryIcon, tileAttribution, tileUrl } from "../../../lib/util/mapUtils";
import PageHeader from "../../../app/shared/components/PageHeader";
import EmptyState from "../../../app/shared/components/EmptyState";
import type { Activity } from "../../../lib/types";

function FitBounds({ activities, selected }: { activities: Activity[]; selected: Activity | null }) {
  const map = useMap();

  useEffect(() => {
    if (selected) {
      map.flyTo([selected.latitude, selected.longitude], 13, { duration: 1 });
    } else if (activities.length > 0) {
      map.fitBounds(latLngBounds(activities.map(a => [a.latitude, a.longitude])), { padding: [40, 40] });
    }
  }, [activities, selected, map]);

  return null;
}

export default function ActivityMap() {
  const [category, setCategory] = useState('');
  const [selected, setSelected] = useState<Activity | null>(null);
  const { mapActivities = [], loadingMapActivities } = useExplore({ category, loadActivities: true });

  const selectCategory = (value: string) => {
    setSelected(null);
    setCategory(value);
  };

  return (
    <>
      <PageHeader eyebrow="Explore" title="Activities near you" subtitle="Every upcoming activity, on one map" />

      <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 2, scrollbarWidth: 'none' }}>
        {[{ text: 'All', value: '' }, ...categoryOptions].map(option => (
          <Chip
            key={option.value || 'all'}
            label={option.value ? `${getCategory(option.value).emoji} ${option.text}` : 'All'}
            onClick={() => selectCategory(option.value)}
            color={category === option.value ? 'primary' : 'default'}
            variant={category === option.value ? 'filled' : 'outlined'}
            sx={{ flexShrink: 0, height: 36 }}
          />
        ))}
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ height: { xs: 380, md: 'calc(100vh - 290px)' }, minHeight: 380, borderRadius: 5, overflow: 'hidden' }}>
            <MapContainer center={[30, 20]} zoom={3} style={{ height: '100%' }}>
              <TileLayer url={tileUrl} attribution={tileAttribution} />
              <FitBounds activities={mapActivities} selected={selected} />
              {mapActivities.map(activity => (
                <Marker
                  key={activity.id}
                  position={[activity.latitude, activity.longitude]}
                  icon={categoryIcon(activity.category)}
                  eventHandlers={{ click: () => setSelected(activity) }}
                >
                  <Popup>
                    <Typography sx={{ fontWeight: 700 }}>{activity.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{format(new Date(activity.date), 'EEE dd MMM, h:mm a')}</Typography>
                    <Link to={`/activities/${activity.id}`}>View activity →</Link>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={1.5} sx={{ maxHeight: { md: 'calc(100vh - 290px)' }, overflowY: { md: 'auto' }, pr: { md: 0.5 } }}>
            {loadingMapActivities && [0, 1, 2, 3].map(i => <Skeleton key={i} variant="rounded" height={84} sx={{ borderRadius: 4 }} />)}
            {!loadingMapActivities && mapActivities.length === 0 && (
              <EmptyState icon={<MapIcon />} title="Nothing on the map" message="No upcoming activities in this category yet." />
            )}
            {mapActivities.map((activity, index) => {
              const meta = getCategory(activity.category);
              const isSelected = selected?.id === activity.id;
              return (
                <Paper
                  key={activity.id}
                  component={motion.div}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(index * 0.04, 0.4) }}
                  onClick={() => {
                    setSelected(activity);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  sx={{
                    p: 1.5, borderRadius: 4, display: 'flex', gap: 1.5, alignItems: 'center', cursor: 'pointer',
                    borderColor: isSelected ? 'primary.main' : 'divider', transition: 'all .2s',
                    '&:hover': { transform: 'translateX(4px)', borderColor: 'primary.main' }
                  }}
                >
                  <Box component="img" src={categoryImage(activity.category, 200)} alt=""
                    sx={{ width: 64, height: 64, borderRadius: 3, objectFit: 'cover', flexShrink: 0 }} />
                  <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                    <Typography sx={{ fontWeight: 700 }} noWrap>{activity.title}</Typography>
                    <Typography variant="body2" color="text.secondary" noWrap sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Place sx={{ fontSize: 16 }} /> {activity.city}
                    </Typography>
                    <Typography variant="caption" sx={{ color: meta.color, fontWeight: 700 }}>
                      {format(new Date(activity.date), 'EEE dd MMM')}
                    </Typography>
                  </Box>
                </Paper>
              );
            })}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
