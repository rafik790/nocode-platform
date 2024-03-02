import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Error from './pages/Error';
import BaseLayout from './layouts/BaseLayout';
import CreateForm from './pages/CreateForm';
import MyForms from './pages/MyForms';
import UpdateForm from './pages/UpdateForm';
import { useAuth } from './contexts/AuthContext';
import GeneratedForm from './pages/GeneratedForm';
import Landing from './pages/private/Landing';
import AppLayout from './layouts/AppLayout';
import AppLanding from './pages/private/AppLanding';
import ContentModelsView from './pages/private/ContentModels';
import ContentModelSetting from './pages/private/ContentModelSetting';

const Routes = () => {
    const { auth } = useAuth();
    console.log("auth::", auth);

    const accessToken = auth.accessToken;

    const routesForPublic = [
        {
            path: '/',
            element: <Home />,
            errorElement: <Error />,
        },
        {
            path: '/login',
            element: <Login />,
            errorElement: <Error />,
        },
    ];

    const routesForAuthenticatedUser = [
        {
            element: <BaseLayout />,
            children: [
                {
                    path: '/landing',
                    element: <Landing />,
                },
                {
                    path: '/create-form',
                    element: <CreateForm />,
                },
                {
                    path: '/my-forms',
                    element: <MyForms />,
                },
                {
                    path: '/my-forms/:id/edit',
                    element: <UpdateForm />,
                },

            ],
        },
        {
            path: 'forms/:id',
            element: <GeneratedForm />,
            errorElement: <Error />,
        },
    ]

    const routesForApplication = [
        {
            element: <AppLayout />,
            children: [
                {
                    path: '/app/:appID',
                    element: <AppLanding />,
                }, 
                {
                    path: '/app/:appID/content-model',
                    element: <ContentModelsView />,
                },
                {
                    path: '/app/:appID/content-model/:modelID',
                    element: <ContentModelSetting />,
                }
            ],
        }
    ]

    const routesForNotAuthenticatedUser = [
        {
            path: '/',
            element: <Home />,
            errorElement: <Error />,
        },
        {
            path: '/login',
            element: <Login />,
        },
    ];

    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!accessToken ? routesForNotAuthenticatedUser : []),
        ...routesForAuthenticatedUser,
        ...routesForApplication,
    ]);

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
};
export default Routes;