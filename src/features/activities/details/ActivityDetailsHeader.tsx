import { Box, Typography, Chip, Stack, Avatar, IconButton, Tooltip } from "@mui/material";
import { CalendarMonth, Edit, EventAvailable, EventBusy, IosShare, Place } from "@mui/icons-material";
import { Link } from "react-router";
import { motion } from "motion/react";
import { toast } from "react-toastify";
import { formatDate, fromNow } from "../../../lib/util/util";
import type { Activity } from "../../../lib/types";
import { useActivities } from "../../../lib/types/hooks/useActivities";
import StyledButton from "../../../app/shared/components/StyledButton";
import { categoryImage, getCategory } from "./form/categoryOptions";

type Props ={
    activity : Activity
}

const toIcsDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

export default function ActivityDetailsHeader({activity}: Props) {
    const {updateAttendance} = useActivities(activity.id);
    const category = getCategory(activity.category);
    const date = new Date(activity.date);
    const isPast = date < new Date();

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            await navigator.share({ title: activity.title, text: activity.description, url }).catch(() => {});
        } else {
            await navigator.clipboard.writeText(url);
            toast.success('Link copied to clipboard');
        }
    };

    const handleAddToCalendar = () => {
        const end = new Date(date.getTime() + 2 * 60 * 60 * 1000);
        const ics = [
            'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Reactivities//EN', 'BEGIN:VEVENT',
            `UID:${activity.id}@reactivities`, `DTSTAMP:${toIcsDate(new Date())}`,
            `DTSTART:${toIcsDate(date)}`, `DTEND:${toIcsDate(end)}`,
            `SUMMARY:${activity.title}`, `DESCRIPTION:${activity.description}`,
            `LOCATION:${activity.venue}, ${activity.city}`, 'END:VEVENT', 'END:VCALENDAR'
        ].join('\r\n');
        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
        link.download = `${activity.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.ics`;
        link.click();
        URL.revokeObjectURL(link.href);
    };

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            sx={{ position: 'relative', mb: 3, borderRadius: { xs: 4, md: 6 }, overflow: 'hidden', minHeight: { xs: 380, md: 400 } }}
        >
            <Box
                component={motion.img}
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                src={categoryImage(activity.category, 2000, activity.imageIndex)}
                alt={`${activity.category} image`}
                sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: activity.isCancelled ? 'grayscale(1)' : 'none' }}
            />
            <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,9,20,.92) 10%, rgba(8,9,20,.35) 60%, rgba(8,9,20,.1))' }} />

            <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 16, right: 16 }}>
                <Tooltip title="Add to calendar">
                    <IconButton onClick={handleAddToCalendar} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)', '&:hover': { bgcolor: 'rgba(255,255,255,.25)' } }}>
                        <CalendarMonth />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Share">
                    <IconButton onClick={handleShare} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)', '&:hover': { bgcolor: 'rgba(255,255,255,.25)' } }}>
                        <IosShare />
                    </IconButton>
                </Tooltip>
            </Stack>

            <Box sx={{
                position: 'absolute', bottom: 0, left: 0, right: 0, color: 'white', p: { xs: 2.5, md: 4 },
                display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2.5,
                justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'flex-end' }
            }}>
                <Box sx={{ minWidth: 0 }}>
                    <Stack direction="row" spacing={1} sx={{ mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
                        <Chip label={`${category.emoji} ${category.text}`} sx={{ bgcolor: category.color, color: 'white', textTransform: 'capitalize' }} />
                        {activity.isCancelled && <Chip label="Cancelled" color="error" />}
                        {!activity.isCancelled && (
                            <Chip label={isPast ? 'Ended' : `Starts ${fromNow(date)}`} sx={{ bgcolor: 'rgba(255,255,255,.18)', color: 'white', backdropFilter: 'blur(8px)' }} />
                        )}
                    </Stack>
                    <Typography variant="h3" sx={{ fontSize: { xs: '1.8rem', sm: '2.3rem', md: '2.8rem' }, mb: 1.5, lineHeight: 1.1 }}>
                        {activity.title}
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0.75, sm: 3 }} sx={{ opacity: 0.9 }}>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}><CalendarMonth fontSize="small" />{formatDate(activity.date)}</Typography>
                        <Typography sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}><Place fontSize="small" />{activity.city}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center', mt: 2 }}>
                        <Avatar src={activity.hostImageUrl} sx={{ width: 32, height: 32, border: '2px solid white' }}>{activity.hostDisplayName.charAt(0)}</Avatar>
                        <Typography variant="body2">
                            Hosted by <Link to={`/profiles/${activity.hostId}`} style={{ color: 'white', fontWeight: 700 }}>{activity.hostDisplayName}</Link>
                        </Typography>
                    </Stack>
                </Box>

                <Stack direction="row" spacing={1.5} sx={{ width: { xs: '100%', md: 'auto' }, flexShrink: 0 }}>
                    {activity.isHost ? (
                        <>
                            <StyledButton
                                variant='contained'
                                color={activity.isCancelled ? 'success' : 'error'}
                                onClick={() => { updateAttendance.mutate(activity.id)}}
                                disabled={updateAttendance.isPending}
                                sx={{ flex: { xs: 1, md: 'none' } }}
                            >
                                {activity.isCancelled ? 'Re-activate' : 'Cancel activity'}
                            </StyledButton>
                            <StyledButton
                                variant="contained"
                                color="primary"
                                component={Link}
                                to={`/manage/${activity.id}`}
                                disabled={activity.isCancelled}
                                startIcon={<Edit />}
                                sx={{ flex: { xs: 1, md: 'none' } }}
                            >
                                Manage
                            </StyledButton>
                        </>
                    ) : (
                        <StyledButton
                            variant="contained"
                            color={activity.isGoing ? 'inherit' : 'primary'}
                            onClick={() => {updateAttendance.mutate(activity.id) }}
                            disabled={updateAttendance.isPending || activity.isCancelled}
                            startIcon={activity.isGoing ? <EventBusy /> : <EventAvailable />}
                            sx={{ flex: { xs: 1, md: 'none' }, py: 1.4, px: 3, ...(activity.isGoing && { bgcolor: 'rgba(255,255,255,.9)', color: '#141629' }) }}
                        >
                            {activity.isGoing ? 'Cancel attendance' : 'Join activity'}
                        </StyledButton>
                    )}
                </Stack>
            </Box>
        </Box>
    )
}
