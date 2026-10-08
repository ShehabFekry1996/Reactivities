import { Link } from "react-router";
import type { Profile } from "../../lib/types";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Typography,
} from "@mui/material";
import { People } from "@mui/icons-material";
import { gradient } from "../../app/theme/theme";

type Props = {
  profile: Profile;
};

export default function ProfileCard({ profile }: Props) {
  return (
    <Link to={`/profiles/${profile.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          width: { xs: "100%", sm: 240 },
          border: 1,
          borderColor: "divider",
          transition: "transform .25s, box-shadow .25s",
          "&:hover": { transform: "translateY(-4px)", boxShadow: "0 16px 32px rgba(20,22,41,.12)" },
        }}
      >
        <Box sx={{ height: 56, backgroundImage: gradient }} />
        <Box sx={{ px: 2.5, pb: 2.5, mt: -4.5, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 0.75 }}>
          <Avatar
            src={profile.imageUrl}
            alt={profile.displayName}
            sx={{ width: 76, height: 76, border: 4, borderColor: "background.paper", fontSize: 28 }}
          >
            {profile.displayName.charAt(0)}
          </Avatar>
          <Typography variant="h6" color="text.primary">{profile.displayName}</Typography>
          {profile.bio && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
            >
              {profile.bio}
            </Typography>
          )}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
            <People fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {profile.followersCount ?? 0} followers
            </Typography>
            {profile.following && <Chip size="small" label="Following" color="secondary" />}
          </Box>
        </Box>
      </Card>
    </Link>
  );
}
