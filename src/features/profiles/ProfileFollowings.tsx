import { Box, Divider, Grid, Skeleton, Typography } from "@mui/material";
import { PeopleOutlined } from "@mui/icons-material";
import ProfileCard from "./ProfileCard";
import { useParams } from "react-router";
import { useProfile } from "../../lib/types/hooks/useProfile";
import EmptyState from "../../app/shared/components/EmptyState";

type Props = {
  activeTab: number;
};

export default function ProfileFollowings({ activeTab }: Props) {
  const { id } = useParams();
  const predicate = activeTab === 3 ? "followers" : "followings";
  const { profile } = useProfile(id);
  const { followings, loadingFollowings } = useProfile(id, predicate);

  return (
    <Box>
      <Typography variant="h5">
        {activeTab === 3
          ? `People following ${profile?.displayName}`
          : `People ${profile?.displayName} is following`}
      </Typography>
      <Divider sx={{ my: 2 }} />
      {loadingFollowings ? (
        <Grid container spacing={2}>
          {[0, 1, 2].map(i => (
            <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }}><Skeleton variant="rounded" height={220} sx={{ borderRadius: 5 }} /></Grid>
          ))}
        </Grid>
      ) : followings?.length === 0 ? (
        <EmptyState icon={<PeopleOutlined />} title={activeTab === 3 ? "No followers yet" : "Not following anyone yet"} />
      ) : (
        <Grid container spacing={2}>
          {followings?.map((profile) => (
            <Grid key={profile.id} size={{ xs: 12, sm: 6, lg: 4 }} sx={{ display: 'flex', justifyContent: 'center' }}>
              <ProfileCard profile={profile} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
