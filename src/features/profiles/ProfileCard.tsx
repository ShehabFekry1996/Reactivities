import { Link } from "react-router";
import type { Profile } from "../../lib/types";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import { Person } from "@mui/icons-material";

type Props = {
  profile: Profile;
};

export default function ProfileCard({ profile }: Props) {
  return (
    <Link to={`/profiles/${profile.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          borderRadius: 3,
          p: 3,
          width: 250,
          height: 420,
          display: "flex",
          flexDirection: "column",
        }}
        elevation={4}
      >
        <CardMedia
          component="img"
          src={profile?.imageUrl || "/images/user.png"}
          sx={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }}
        />
        <CardContent
          sx={{ p: 0, pt: 2, flexGrow: 1, "&:last-child": { pb: 0 } }}
        >
          {" "}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="h5">{profile.displayName}</Typography>
            {profile.bio && (
              <Typography
                variant="body2"
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {profile.bio}
              </Typography>
            )}
            {profile.following && (
              <Chip
                size="small"
                label="Following"
                color="secondary"
                variant="outlined"
                sx={{ alignSelf: "flex-start" }}
              />
            )}
          </Box>
        </CardContent>
        <Divider />
        <Box sx={{ display: "flex", alignItems: "center", pt: 1 }}>
          <Person />
          <Typography sx={{ ml: 1 }}>
            {profile.followersCount} Followers
          </Typography>
        </Box>
      </Card>
    </Link>
  );
}
