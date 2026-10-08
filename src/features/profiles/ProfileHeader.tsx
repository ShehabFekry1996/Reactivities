import {
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Check, PersonAdd } from "@mui/icons-material";
import { useParams } from "react-router";
import { motion } from "motion/react";
import { useProfile } from "../../lib/types/hooks/useProfile";
import { gradient } from "../../app/theme/theme";

function Stat({ label, value }: { label: string; value?: number }) {
  return (
    <Box sx={{ textAlign: "center", px: { xs: 1.5, sm: 3 } }}>
      <Typography
        component={motion.p}
        key={value}
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        variant="h5"
        sx={{ fontWeight: 800, m: 0 }}
      >
        {value ?? 0}
      </Typography>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
    </Box>
  );
}

export default function ProfileHeader() {
  const { id } = useParams();
  const { isCurrentUser, profile, updateFollowing } = useProfile(id);

  if (!profile) return null;

  return (
    <Paper sx={{ borderRadius: { xs: 4, md: 6 }, overflow: "hidden", mb: 3 }}>
      <Box
        component={motion.div}
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        sx={{ height: { xs: 110, md: 170 }, backgroundImage: gradient, backgroundSize: "200% 200%" }}
      />
      <Box sx={{
        px: { xs: 2.5, md: 4 }, pb: 3,
        display: "flex", flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "center", md: "flex-end" }, gap: { xs: 2, md: 3 },
        mt: { xs: -7, md: -9 }
      }}>
        <Avatar
          component={motion.div}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          src={profile.imageUrl}
          alt={profile.displayName}
          sx={{ width: { xs: 120, md: 160 }, height: { xs: 120, md: 160 }, border: 5, borderColor: "background.paper", fontSize: 48, boxShadow: "0 12px 32px rgba(0,0,0,.18)" }}
        >
          {profile.displayName.charAt(0)}
        </Avatar>

        <Box sx={{ flexGrow: 1, textAlign: { xs: "center", md: "left" }, minWidth: 0 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: { xs: "center", md: "flex-start" } }}>
            <Typography variant="h4" sx={{ fontSize: { xs: "1.7rem", md: "2.1rem" } }}>{profile.displayName}</Typography>
            {profile.following && <Chip size="small" color="secondary" label="Following" />}
          </Stack>
          {profile.bio && (
            <Typography color="text.secondary" sx={{ mt: 0.5, maxWidth: 560, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {profile.bio}
            </Typography>
          )}
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: "center", width: { xs: "100%", md: "auto" } }}>
          <Stack direction="row" sx={{ "& > *:not(:last-child)": { borderRight: 1, borderColor: "divider" } }}>
            <Stat label="Followers" value={profile.followersCount} />
            <Stat label="Following" value={profile.followingCount} />
          </Stack>
          {!isCurrentUser && (
            <Button
              onClick={() => updateFollowing.mutate()}
              disabled={updateFollowing.isPending}
              variant={profile.following ? "outlined" : "contained"}
              startIcon={profile.following ? <Check /> : <PersonAdd />}
              sx={{ minWidth: 140, width: { xs: "100%", sm: "auto" } }}
            >
              {profile.following ? "Following" : "Follow"}
            </Button>
          )}
        </Stack>
      </Box>
    </Paper>
  );
}
