import { Avatar, Box, Button, Card, Stack, Typography } from "@mui/material";
import { Check, PersonAdd } from "@mui/icons-material";
import { Link } from "react-router";
import { motion } from "motion/react";
import type { Profile } from "../../lib/types";
import { useAccounts } from "../../lib/types/hooks/useAccounts";
import { gradient } from "../../app/theme/theme";

type Props = {
  profile: Profile;
  index?: number;
  onFollow: (userId: string) => void;
  pending?: boolean;
};

export default function PersonCard({ profile, index = 0, onFollow, pending }: Props) {
  const { currentUser } = useAccounts();
  const isMe = currentUser?.id === profile.id;

  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.5) }}
      whileHover={{ y: -6 }}
      sx={{ border: 1, borderColor: 'divider', height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: '0 20px 40px rgba(20,22,41,.12)' } }}
    >
      <Box sx={{ height: 72, backgroundImage: gradient, opacity: 0.9 }} />
      <Box sx={{ px: 2.5, pb: 2.5, mt: -5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flexGrow: 1 }}>
        <Avatar
          component={Link}
          to={`/profiles/${profile.id}`}
          src={profile.imageUrl}
          alt={profile.displayName}
          sx={{ width: 84, height: 84, border: 4, borderColor: 'background.paper', fontSize: 30 }}
        >
          {profile.displayName.charAt(0)}
        </Avatar>
        <Typography
          component={Link}
          to={`/profiles/${profile.id}`}
          variant="h6"
          sx={{ mt: 1, color: 'text.primary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
        >
          {profile.displayName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{
          mt: 0.5, minHeight: 40, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>
          {profile.bio || 'No bio yet'}
        </Typography>
        <Stack direction="row" spacing={3} sx={{ my: 2 }}>
          <Box>
            <Typography sx={{ fontWeight: 800 }}>{profile.followersCount ?? 0}</Typography>
            <Typography variant="caption" color="text.secondary">Followers</Typography>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 800 }}>{profile.followingCount ?? 0}</Typography>
            <Typography variant="caption" color="text.secondary">Following</Typography>
          </Box>
        </Stack>
        <Box sx={{ mt: 'auto', width: '100%' }}>
          {isMe ? (
            <Button fullWidth variant="outlined" component={Link} to={`/profiles/${profile.id}`}>View my profile</Button>
          ) : (
            <Button
              fullWidth
              variant={profile.following ? 'outlined' : 'contained'}
              startIcon={profile.following ? <Check /> : <PersonAdd />}
              disabled={pending}
              onClick={() => onFollow(profile.id)}
            >
              {profile.following ? 'Following' : 'Follow'}
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  );
}
