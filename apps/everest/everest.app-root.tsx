import React from 'react';
import ReactDOM from 'react-dom';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { EverestApp } from './app';
import { DatabasesPage } from './pages/databases/databases';

const router = createBrowserRouter([
  {
    path: '/',
    element: <EverestApp />,
    children: [
      {
        path: 'databases',
        element: <DatabasesPage />,
      },
      {
        index: true,
        element: <Navigate to="/databases" replace />,
      },
    ],
  },
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root')
);
