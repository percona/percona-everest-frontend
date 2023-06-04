import React from 'react';
import ReactDOM from 'react-dom';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { EverestApp } from './app';
import { Typography } from '@mui/material';

const router = createBrowserRouter([
  {
    path: "/",
    element: <EverestApp />,
    children: [{
      path: 'databases',
      element: (
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
      )
    }, {
      index: true,
      element: <Navigate to="/databases" replace />
    }]
  },
]);

ReactDOM.render((
  <RouterProvider router={router} />
), document.getElementById('root'));

