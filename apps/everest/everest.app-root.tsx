import React from 'react';
import ReactDOM from 'react-dom';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { EverestApp } from './app';
import { DatabasesPage } from './pages/databases/databases';
import { NewDatabasePage } from './pages/new-database/new-database';

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
        path: 'databases/new',
        element: <NewDatabasePage />,
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
