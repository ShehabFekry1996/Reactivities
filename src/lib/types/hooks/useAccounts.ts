import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { LoginSchema } from "../../schemas/loginSchema"
import agent from "../../api/agent"
import type { User } from "..";
import { useNavigate } from "react-router";

export const useAccounts = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post('/login?useCookies=true', creds);
        },
        onSuccess: async() => {
            queryClient.invalidateQueries({queryKey:['user']});
            await navigate('/activities');
        }
    });


    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/logout');
        },
        onSuccess: () => {
            queryClient.removeQueries({queryKey:['user']});
            navigate('/');
        }
    });

    const {data: currentUser} = useQuery({
        queryKey:['user'],
        queryFn: async ()=> {
            const response = await agent.get<User>('/account/user-info');
            return response.data;
        },
        enabled: !queryClient.getQueryData(['user'])    
    })
    return{
        loginUser
        ,logoutUser
        ,currentUser
    }
}