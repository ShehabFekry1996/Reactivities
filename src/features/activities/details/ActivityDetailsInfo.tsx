import { CalendarToday, Info, Map, Place } from "@mui/icons-material";
import { Box, Button, Collapse, Paper, Stack, Typography } from "@mui/material";
import { formatDate, fromNow } from "../../../lib/util/util";
import type { Activity } from "../../../lib/types";
import { useState, type ReactNode } from "react";
import MapComponent from "../../../app/shared/components/MapComponent";

type Props ={
    activity: Activity
}

function InfoRow({ icon, title, children, action }: { icon: ReactNode; title: string; children: ReactNode; action?: ReactNode }) {
    return (
        <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start', py: 2 }}>
            <Box sx={{ width: 44, height: 44, flexShrink: 0, borderRadius: 3, display: 'grid', placeItems: 'center', bgcolor: 'action.hover', color: 'primary.main' }}>
                {icon}
            </Box>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em' }}>{title}</Typography>
                {children}
            </Box>
            {action}
        </Stack>
    );
}

export default function ActivityDetailsInfo({activity} : Props) {
    const[mapOpen,setMapOpen] = useState(false);
    return (
        <Paper sx={{ px: { xs: 2, md: 3 }, py: 1, borderRadius: 5 }}>
            <InfoRow icon={<Info />} title="About">
                <Typography sx={{ whiteSpace: 'pre-wrap' }}>{activity.description}</Typography>
            </InfoRow>
            <InfoRow icon={<CalendarToday />} title="When">
                <Typography sx={{ fontWeight: 600 }}>{formatDate(activity.date)}</Typography>
                <Typography variant="body2" color="text.secondary">{fromNow(activity.date)}</Typography>
            </InfoRow>
            <InfoRow
                icon={<Place />}
                title="Where"
                action={
                    <Button size="small" variant="outlined" startIcon={<Map />} sx={{ whiteSpace: 'nowrap', flexShrink: 0 }} onClick={()=>setMapOpen(!mapOpen)}>
                        {mapOpen ? 'Hide' : 'Map'}
                    </Button>
                }
            >
                <Typography sx={{ fontWeight: 600 }}>{activity.city}</Typography>
                <Typography variant="body2" color="text.secondary">{activity.venue}</Typography>
            </InfoRow>
            <Collapse in={mapOpen} unmountOnExit>
                <Box sx={{ height: { xs: 280, md: 380 }, mb: 2, borderRadius: 4, overflow: 'hidden' }}>
                    <MapComponent position={[activity.latitude,activity.longitude]} venue={activity.venue} category={activity.category}></MapComponent>
                </Box>
            </Collapse>
        </Paper>
    )
}
