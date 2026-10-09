import axios from "axios";
import { store } from "../stores/store";
import { toast } from "react-toastify";
import { router } from "../../app/layout/router/Routes";
import { queryClient } from "./queryClient";


    const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
  });

agent.interceptors.request.use(config => {
  store.uiStore.isBusy();
  return config;
})

agent.interceptors.response.use(async response =>
    {
        store.uiStore.isIdle()
        return response;
    }, async error  => {
        store.uiStore.isIdle();
        if (!error.response) {
          toast.error('Cannot reach the server - check your connection');
          return Promise.reject(error);
        }
        const {status,data} = error.response;
        switch  (status){
          case 400:
            if(data.errors){
              const modalStateErrors =[];
              for (const key in data.errors){
              if(data.errors[key]){
                modalStateErrors.push(data.errors[key])
              }
              }
              throw modalStateErrors.flat();
            }else{
              toast.error(data);
            }
            break;
          case 401:
              if (error.config?.url?.includes('/login')) {
                toast.error('Invalid email or password');
              } else if (queryClient.getQueryData(['user'])) {
                queryClient.setQueryData(['user'], null);
                toast.info('Your session has expired - please log in again');
                router.navigate('/login', { state: { from: router.state.location } });
              } else {
                toast.error('Unauthorized');
              }
              break;
          case 404:
              router.navigate('/not-found')
              break;
          case 500:
            router.navigate('/server-error',{state:{error:data}})
              break;
              default:
                break;
        }
        console.log('axios error: ',error);
        return Promise.reject(error);
    }
);


export default agent;
