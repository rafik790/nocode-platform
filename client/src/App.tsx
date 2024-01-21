import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CreateForm from './pages/CreateForm';
import BaseLayout from './layouts/BaseLayout';
import Error from './pages/Error';

import MyForms from './pages/MyForms';
import UpdateForm from './pages/UpdateForm';
import GeneratedForm from './pages/GeneratedForm';
import Home from './pages/public/Home';
import Login from './pages/public/Login';

const router = createBrowserRouter([
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
  {
    element: <BaseLayout />,
    children: [
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
]);

export default function App() {
  return <RouterProvider router={router} />;
}
