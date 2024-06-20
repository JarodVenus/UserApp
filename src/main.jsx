import React from 'react'
import ReactDOM from 'react-dom/client'
import  "./styles.scss"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import UserList from './routes/UserList';
import UserProfile from './routes/UserProfile';
import Album from './routes/Album';

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserList />,
  },
  {
    path: "/profile/:userId",
    element: <UserProfile />
  },
  {
    path: "/album/:albumId",
    element: <Album />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
