import { Link } from "react-router";
import type { Profile } from "../../lib/types"
import { Box, Card, CardContent, CardMedia, Chip, Divider, Typography } from "@mui/material";
import { Person } from "@mui/icons-material";

type Props= {
    profile: Profile
}

export default function ProfileCard({profile}: Props) {
    const following = false;
 return (
  <Link to={`/profiles/${profile.id}`} style={{ textDecoration: 'none' }}>
    <Card sx={{ borderRadius: 3, p: 3, maxWidth: 300 }} elevation={4}>
      <CardMedia
        component="img"
        src={profile?.imageUrl || '/images/user.png'}
        sx={{ width: 200 }}
      />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h5">{profile.displayName}</Typography>
          {following && <Chip size="small" label="Following" color="secondary" variant="outlined" />}
        </Box>
      </CardContent>
      <Divider />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        <Person />
        <Typography sx={{ ml: 1 }}>20 Followers</Typography>
      </Box>
    </Card>
  </Link>
);
}
