import { Box, Card, Skeleton } from "@mui/material";

export default function ActivityCardSkeleton() {
  return (
    <Card sx={{ border: 1, borderColor: 'divider' }}>
      <Skeleton variant="rectangular" height={190} animation="wave" />
      <Box sx={{ p: 2.5 }}>
        <Skeleton width="80%" height={30} animation="wave" />
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', my: 1 }}>
          <Skeleton variant="circular" width={28} height={28} animation="wave" />
          <Skeleton width="40%" animation="wave" />
        </Box>
        <Skeleton width="90%" animation="wave" />
        <Skeleton width="60%" animation="wave" />
      </Box>
    </Card>
  );
}
