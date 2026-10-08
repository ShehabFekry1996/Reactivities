import { Grid, IconButton, InputAdornment, Skeleton, TextField } from "@mui/material";
import { Close, PersonSearch, Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useExplore } from "../../lib/types/hooks/useExplore";
import PageHeader from "../../app/shared/components/PageHeader";
import EmptyState from "../../app/shared/components/EmptyState";
import PersonCard from "./PersonCard";

export default function PeoplePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const { people, loadingPeople, toggleFollow } = useExplore({ search, loadPeople: true });

  useEffect(() => {
    const timeout = setTimeout(() => setSearch(searchTerm.trim()), 400);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <>
      <PageHeader eyebrow="Community" title="Meet people" subtitle="Find friends, hosts and fellow explorers to follow" />

      <TextField
        fullWidth
        placeholder="Search people by name or bio..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        sx={{ mb: 3, maxWidth: 560 }}
        slotProps={{
          input: {
            sx: { bgcolor: 'background.paper' },
            startAdornment: <InputAdornment position="start"><Search color="action" /></InputAdornment>,
            endAdornment: searchTerm ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearchTerm('')}><Close fontSize="small" /></IconButton>
              </InputAdornment>
            ) : null
          }
        }}
      />

      {!loadingPeople && people?.length === 0 && (
        <EmptyState icon={<PersonSearch />} title="No people found" message="Try searching for a different name." />
      )}

      <Grid container spacing={2.5}>
        {loadingPeople && [0, 1, 2, 3, 4, 5, 6, 7].map(i => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Skeleton variant="rounded" height={280} sx={{ borderRadius: 5 }} />
          </Grid>
        ))}
        {people?.map((person, index) => (
          <Grid key={person.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <PersonCard
              profile={person}
              index={index}
              onFollow={userId => toggleFollow.mutate(userId)}
              pending={toggleFollow.isPending && toggleFollow.variables === person.id}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
