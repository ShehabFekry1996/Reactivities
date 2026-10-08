import {
  Paper,
  Typography,
  Chip,
  Avatar,
  Box,
  Stack,
  LinearProgress,
} from "@mui/material";
import { Link } from "react-router";
import { motion } from "motion/react";
import type { Activity } from "../../../lib/types";

type Props = {
  activity: Activity;
};

export default function ActivityDetailsSidebar({ activity }: Props) {
  const going = activity.attendees.length;

  return (
    <Paper sx={{ borderRadius: 5, overflow: 'hidden' }}>
      <Box sx={{ p: 3, pb: 2 }}>
        <Typography variant="h6">Who's going</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {going} {going === 1 ? 'person' : 'people'} going
        </Typography>
        <LinearProgress variant="determinate" value={Math.min(going * 10, 100)} sx={{ height: 6, borderRadius: 3 }} />
      </Box>
      <Stack sx={{ px: 1.5, pb: 1.5 }}>
        {activity.attendees.map((attendee, index) => (
          <Box
            key={attendee.id}
            component={motion.div}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Box
              component={Link}
              to={`/profiles/${attendee.id}`}
              sx={{
                display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, borderRadius: 3,
                textDecoration: 'none', color: 'inherit', transition: 'background .2s',
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <Avatar
                sx={{ width: 48, height: 48, border: attendee.following ? 2 : 0, borderColor: 'secondary.main' }}
                alt={attendee.displayName}
                src={attendee.imageUrl}
              >
                {attendee.displayName.charAt(0)}
              </Avatar>
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography sx={{ fontWeight: 700 }} noWrap>{attendee.displayName}</Typography>
                {attendee.following && (
                  <Typography variant="body2" color="secondary.main" sx={{ fontWeight: 600 }}>Following</Typography>
                )}
              </Box>
              {activity.hostId === attendee.id && (
                <Chip label="Host" size="small" color="warning" />
              )}
            </Box>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}
