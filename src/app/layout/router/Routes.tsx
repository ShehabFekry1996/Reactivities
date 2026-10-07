import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import HomePage from "../../../features/home/HomePage";
import ActivityForm from "../../../features/activities/details/form/ActivityForm";
import ActivityDashboard from "../../../features/activities/dashboard/ActivityDashboard";
import ActivityDetailPage from "../../../features/activities/details/ActivityDetailPage";
import Counter from "../../../features/counter/Counter";
import NotFound from "../../../features/errors/NotFound";
import TestErrors from "../../../features/errors/TestErrors";
import ServerError from "../../../features/errors/ServerError";
import LoginForm from "../../../features/accounts/LoginForm";
import RequireAuth from "./RequireAuth";
import RegisterForm from "../../../features/accounts/RegisterForm";

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
        //These routes require Authentication so we wrap them in RequireAuth component which checks if the user is logged in or not and if not it redirects to login page
        ],
        },
        {path: '',element: <HomePage/>},
        {path: 'counter',element: <Counter/>},
        {path: 'errors',element: <TestErrors/>},
        {path: 'not-found',element: <NotFound/>},
        {path: 'server-error',element: <ServerError/>},
        {path: 'login',element: <LoginForm/>},
        {path: 'register',element: <RegisterForm/>},
        {path: '*',element: <Navigate replace to={"/not-found"}/>}, 
        //if the page isn't found you're navigated to not found page

    ]
  }
]);