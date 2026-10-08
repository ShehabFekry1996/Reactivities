import { Event, FilterList, RestartAlt, Sort } from "@mui/icons-material";
import { Box, Button, Divider, Paper, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Calendar from "react-calendar"
import { observer } from "mobx-react-lite";
import { useStore } from "../../../lib/stores/useStore";
import type { ReactNode } from "react";

type Props = {
  onApply?: () => void;
};

function Section({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <Box>
      <Typography variant='subtitle2' sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '.08em', fontSize: '0.75rem' }}>
        {icon}
        {title}
      </Typography>
      {children}
    </Box>
  );
}

const toggleSx = {
  width: '100%',
  '& .MuiToggleButton-root': { flex: 1, py: 1, fontWeight: 600, textTransform: 'none' },
  '& .MuiToggleButton-root.Mui-selected, & .MuiToggleButton-root.Mui-selected:hover': { bgcolor: 'primary.main', color: '#fff' }
};

const ActivityFilter = observer(function ActivityFilter({ onApply }: Props) {
  const {activityStore: {filter, setFilter, startDate, setStartDate, sortOrder, setSortOrder, resetFilters}} = useStore();

  return (
    <Paper sx={{ p: { xs: 0.5, md: 3 }, border: { xs: 'none', md: 1 }, borderColor: { md: 'divider' }, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Section icon={<FilterList fontSize="small" />} title="Show">
        <ToggleButtonGroup exclusive size="small" value={filter} onChange={(_, value) => value && setFilter(value)} sx={toggleSx}>
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="isGoing">Going</ToggleButton>
          <ToggleButton value="isHost">Hosting</ToggleButton>
        </ToggleButtonGroup>
      </Section>

      <Section icon={<Sort fontSize="small" />} title="Sort by date">
        <ToggleButtonGroup exclusive size="small" value={sortOrder} onChange={(_, value) => value && setSortOrder(value)} sx={toggleSx}>
          <ToggleButton value="asc">Soonest</ToggleButton>
          <ToggleButton value="desc">Latest</ToggleButton>
        </ToggleButtonGroup>
      </Section>

      <Divider />

      <Section icon={<Event fontSize="small" />} title="From date">
        <Calendar
          value={startDate}
          onChange={date => setStartDate(date as Date)}
        />
      </Section>

      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <Button fullWidth variant="outlined" startIcon={<RestartAlt />} onClick={resetFilters}>Reset</Button>
        {onApply && <Button fullWidth variant="contained" onClick={onApply}>Show results</Button>}
      </Box>
    </Paper>
  )
});

export default ActivityFilter;
