import { Event, FilterList, Sort } from "@mui/icons-material";
import { Box, ListItemText, MenuItem, MenuList, Paper, Typography } from "@mui/material";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css'
import { observer } from "mobx-react-lite";
import { useStore } from "../../../lib/stores/useStore";

const ActivityFilter = observer(function ActivityFilter() {
  const {activityStore: {filter, setFilter, startDate, setStartDate, sortOrder, setSortOrder}} = useStore();
  return (
    <Box sx={{display:'flex', flexDirection:'column',gap:3, position:'sticky', top:112}}>
    <Paper sx={{p:3}}>
        <Box sx={{width: '100%'}}>
            <Typography  variant='h6' sx={{display:'flex' ,alignItems:'center',mb:1,color:'primary.main'}}>
                <FilterList sx={{mr:1}}></FilterList>
                Filters
            </Typography>
            <MenuList>
                <MenuItem selected={filter === 'all'} onClick={() => setFilter('all')}>
                  <ListItemText primary="All events"></ListItemText>
                </MenuItem>
                  <MenuItem selected={filter === 'isGoing'} onClick={() => setFilter('isGoing')}>
                  <ListItemText primary="I'm going"></ListItemText>
                </MenuItem>
                  <MenuItem selected={filter === 'isHost'} onClick={() => setFilter('isHost')}>
                  <ListItemText primary="I'm hosting"></ListItemText>
                </MenuItem>
            </MenuList>

        </Box>
    </Paper>
    <Paper sx={{p:3}}>
        <Typography variant='h6' sx={{display:'flex' ,alignItems:'center',mb:1,color:'primary.main'}}>
            <Sort sx={{mr:1}}></Sort>
            Sort by date
        </Typography>
        <MenuList>
            <MenuItem selected={sortOrder === 'asc'} onClick={() => setSortOrder('asc')}>
              <ListItemText primary="Soonest first"></ListItemText>
            </MenuItem>
            <MenuItem selected={sortOrder === 'desc'} onClick={() => setSortOrder('desc')}>
              <ListItemText primary="Latest first"></ListItemText>
            </MenuItem>
        </MenuList>
    </Paper>
    <Box component={Paper} sx={{width: '100%',p:3}}>
        <Typography variant="h6" sx={{display:'flex',alignItems:'center',mb:3,color:'primary.main'}}>
            <Event sx={{mr:1}}>
            </Event>
                Select date
        </Typography>
        <Calendar
          value={startDate}
          onChange={date => setStartDate(date as Date)}
        ></Calendar>
    </Box>
    </Box>
  )
});

export default ActivityFilter;
