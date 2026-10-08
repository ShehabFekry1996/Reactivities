import { Badge, Box, Button, Drawer, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Close, Search, Tune } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import ActivityList from "./ActivityList";
import ActivityFilter from "./ActivityFilter";
import CategoryChips from "./CategoryChips";
import { useStore } from "../../../lib/stores/useStore";
import { useAccounts } from "../../../lib/types/hooks/useAccounts";
import PageHeader from "../../../app/shared/components/PageHeader";

const ActivityDashboard = observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  const { currentUser } = useAccounts();
  const [searchTerm, setSearchTerm] = useState(activityStore.search);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => activityStore.setSearch(searchTerm.trim()), 400);
    return () => clearTimeout(timeout);
  }, [searchTerm, activityStore]);

  return (
    <>
      <PageHeader
        eyebrow="Discover"
        title={`Hey ${currentUser?.displayName ?? ''} 👋`}
        subtitle="Here's what's happening around you"
      />

      <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search by title, city or venue..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              sx: { bgcolor: 'background.paper' },
              startAdornment: <InputAdornment position="start"><Search color="action" /></InputAdornment>,
              endAdornment: searchTerm ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchTerm('')}><Close fontSize="small" /></IconButton>
                </InputAdornment>
              ) : null
            }
          }}
        />
        <Badge badgeContent={activityStore.activeFilterCount} color="primary" sx={{ display: { md: 'none' } }}>
          <Button variant="outlined" onClick={() => setFiltersOpen(true)} sx={{ minWidth: 0, px: 2, height: '100%' }}>
            <Tune />
          </Button>
        </Badge>
      </Box>

      <CategoryChips />

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <ActivityList />
        </Grid>
        <Grid size={{ md: 4 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box sx={{ position: 'sticky', top: 96 }}>
            <ActivityFilter />
          </Box>
        </Grid>
      </Grid>

      <Drawer
        anchor="bottom"
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        slotProps={{ paper: { sx: { borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '88vh', p: 2, pb: 4 } } }}
      >
        <Box sx={{ width: 40, height: 4, borderRadius: 2, bgcolor: 'divider', mx: 'auto', mb: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={() => setFiltersOpen(false)}><Close /></IconButton>
        </Box>
        <ActivityFilter onApply={() => setFiltersOpen(false)} />
      </Drawer>
    </>
  )
});

export default ActivityDashboard;
