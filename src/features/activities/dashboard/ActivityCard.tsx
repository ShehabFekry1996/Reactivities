import { AccessTime, ArrowForward, Place } from "@mui/icons-material";
import { Avatar, AvatarGroup, Box, Button, Card, Chip, Stack, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router";
import { format } from "date-fns";
import { motion } from "motion/react";
import { fromNow } from "../../../lib/util/util";
import type { Activity } from "../../../lib/types";
import { getCategory } from "../details/form/categoryOptions";

type Props = {
  activity: Activity;
  index?: number;
};

const glass = {
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(255,255,255,.18)',
  color: '#fff',
  border: '1px solid rgba(255,255,255,.25)'
};

export default function ActivityCard({activity, index = 0}: Props) {
  const category = getCategory(activity.category);
  const date = new Date(activity.date);

  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      sx={{
        height: '100%', display: 'flex', flexDirection: 'column', border: 1, borderColor: 'divider',
        transition: 'transform .3s ease, box-shadow .3s ease',
        '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 24px 48px rgba(20,22,41,.14)' },
        '&:hover .cover': { transform: 'scale(1.08)' }
      }}
    >
      <Box component={Link} to={`/activities/${activity.id}`} sx={{ position: 'relative', height: 190, overflow: 'hidden', display: 'block' }}>
        <Box
          className="cover"
          component="img"
          src={`/images/categoryImages/${activity.category}.jpg`}
          alt={activity.category}
          sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .6s ease', filter: activity.isCancelled ? 'grayscale(1)' : 'none' }}
        />
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.65), transparent 55%)' }} />
        <Chip size="small" label={`${category.emoji} ${activity.category}`} sx={{ ...glass, position: 'absolute', top: 12, left: 12, textTransform: 'capitalize' }} />
        <Stack direction="row" spacing={0.75} sx={{ position: 'absolute', top: 12, right: 12 }}>
          {activity.isCancelled && <Chip size="small" label="Cancelled" color="error" />}
          {!activity.isCancelled && activity.isHost && <Chip size="small" label="Hosting" color="secondary" />}
          {!activity.isCancelled && !activity.isHost && activity.isGoing && <Chip size="small" label="Going" color="success" />}
        </Stack>
        <Box sx={{ ...glass, position: 'absolute', left: 12, bottom: 12, borderRadius: 3, px: 1.5, py: 0.5, textAlign: 'center', lineHeight: 1 }}>
          <Typography sx={{ fontWeight: 800, fontSize: '1.3rem', lineHeight: 1.1 }}>{format(date, 'dd')}</Typography>
          <Typography sx={{ fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '.08em' }}>{format(date, 'MMM')}</Typography>
        </Box>
      </Box>

      <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.25, flexGrow: 1 }}>
        <Typography variant="h6" sx={{ lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {activity.title}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Avatar src={activity.hostImageUrl} alt={activity.hostDisplayName} sx={{ width: 26, height: 26, fontSize: 12 }}>
            {activity.hostDisplayName.charAt(0)}
          </Avatar>
          <Typography variant="body2" color="text.secondary">
            Hosted by{' '}
            <Box component={Link} to={`/profiles/${activity.hostId}`} sx={{ color: 'text.primary', fontWeight: 600, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
              {activity.hostDisplayName}
            </Box>
          </Typography>
        </Stack>

        <Stack spacing={0.75} sx={{ color: 'text.secondary' }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <AccessTime sx={{ fontSize: 18 }} />
            <Typography variant="body2" noWrap>
              {format(date, 'EEE, h:mm a')} · <Box component="span" sx={{ color: category.color, fontWeight: 600 }}>{fromNow(date)}</Box>
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', minWidth: 0 }}>
            <Place sx={{ fontSize: 18 }} />
            <Typography variant="body2" noWrap>{activity.city} · {activity.venue}</Typography>
          </Stack>
        </Stack>

        <Box sx={{ mt: 'auto', pt: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: 1, borderColor: 'divider' }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 30, height: 30, fontSize: 12, borderColor: 'background.paper' } }}>
              {activity.attendees.map(attendee => (
                <Tooltip key={attendee.id} title={attendee.displayName}>
                  <Avatar src={attendee.imageUrl} alt={attendee.displayName}>{attendee.displayName.charAt(0)}</Avatar>
                </Tooltip>
              ))}
            </AvatarGroup>
            <Typography variant="body2" color="text.secondary">{activity.attendees.length} going</Typography>
          </Stack>
          <Button component={Link} to={`/activities/${activity.id}`} size="small" endIcon={<ArrowForward />}>
            View
          </Button>
        </Box>
      </Box>
    </Card>
  )
}
