import { Box, Skeleton } from "@mui/material";
import { PersonOff } from "@mui/icons-material";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";
import { useParams } from "react-router";
import { useProfile } from "../../lib/types/hooks/useProfile";
import EmptyState from "../../app/shared/components/EmptyState";

export default function ProfilePage() {
  const { id } = useParams();
  const { profile, loadingProfile } = useProfile(id);

  if (loadingProfile) return (
    <Box>
      <Skeleton variant="rounded" height={300} sx={{ borderRadius: 6, mb: 3 }} />
      <Skeleton variant="rounded" height={400} sx={{ borderRadius: 6 }} />
    </Box>
  );
  if (!profile) return <EmptyState icon={<PersonOff />} title="Profile not found" />;

  return (
    <Box>
      <ProfileHeader />
      <ProfileContent />
    </Box>
  );
}
