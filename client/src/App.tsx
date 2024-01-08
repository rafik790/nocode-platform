import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CreateForm from './pages/CreateForm';
import BaseLayout from './layouts/BaseLayout';
import Error from './pages/Error';

import MyForms from './pages/MyForms';
import UpdateForm from './pages/UpdateForm';
import GeneratedForm from './pages/GeneratedForm';

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: '/',
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
