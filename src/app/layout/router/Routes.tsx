import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import HomePage from "../../../features/home/HomePage";
import ActivityForm from "../../../features/activities/details/form/ActivityForm";
import ActivityDashboard from "../../../features/activities/dashboard/ActivityDashboard";
import ActivityDetailPage from "../../../features/activities/details/ActivityDetailPage";
import NotFound from "../../../features/errors/NotFound";
import ServerError from "../../../features/errors/ServerError";
import LoginForm from "../../../features/accounts/LoginForm";
import RequireAuth from "./RequireAuth";
import RegisterForm from "../../../features/accounts/RegisterForm";
import ProfilePage from "../../../features/profiles/ProfilePage";
import ActivityMap from "../../../features/activities/map/ActivityMap";
import PeoplePage from "../../../features/people/PeoplePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
        {
        element: <RequireAuth/>,children:[
        {path: 'activities',element: <ActivityDashboard/>},
        {path: 'activities/:id',element: <ActivityDetailPage/>},
        {path: 'createActivity',element: <ActivityForm key='create'/>},
        {path: 'manage/:id',element: <ActivityForm/>},
        {path: 'profiles/:id',element: <ProfilePage/>},
        {path: 'map',element: <ActivityMap/>},
        {path: 'people',element: <PeoplePage/>},
        ],
        },
        {path: '',element: <HomePage/>},
        {path: 'not-found',element: <NotFound/>},
        {path: 'server-error',element: <ServerError/>},
        {path: 'login',element: <LoginForm/>},
        {path: 'register',element: <RegisterForm/>},
        {path: '*',element: <Navigate replace to={"/not-found"}/>},
    ]
  }
]);
