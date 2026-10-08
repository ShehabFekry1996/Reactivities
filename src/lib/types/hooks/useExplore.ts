import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../../api/agent";
import type { Activity, PagedList, Profile } from "..";
import { useAccounts } from "./useAccounts";

export const useExplore = (options: { search?: string; category?: string; loadActivities?: boolean; loadPeople?: boolean }) => {
  const { currentUser } = useAccounts();
  const queryClient = useQueryClient();
  const { search, category, loadActivities, loadPeople } = options;

  const { data: mapActivities, isLoading: loadingMapActivities } = useQuery({
    queryKey: ["map-activities", category],
    queryFn: async () => {
      const response = await agent.get<PagedList<Activity, string>>("/activities", {
        params: {
          pageSize: 50,
          category: category || undefined,
          startDate: new Date().toISOString(),
        },
      });
      return response.data.items;
    },
    enabled: !!loadActivities && !!currentUser,
  });

  const { data: people, isLoading: loadingPeople } = useQuery({
    queryKey: ["people", search],
    queryFn: async () => {
      const response = await agent.get<Profile[]>("/profiles", {
        params: { search: search || undefined },
      });
      return response.data;
    },
    enabled: !!loadPeople && !!currentUser,
  });

  const toggleFollow = useMutation({
    mutationFn: async (userId: string) => {
      await agent.post(`/profiles/${userId}/follow`);
    },
    onSuccess: async (_, userId) => {
      queryClient.setQueryData<Profile[]>(["people", search], (data) =>
        data?.map((profile) =>
          profile.id === userId
            ? {
                ...profile,
                following: !profile.following,
                followersCount: (profile.followersCount ?? 0) + (profile.following ? -1 : 1),
              }
            : profile,
        ),
      );
      await queryClient.invalidateQueries({ queryKey: ["profile", userId] });
    },
  });

  return { mapActivities, loadingMapActivities, people, loadingPeople, toggleFollow };
};
