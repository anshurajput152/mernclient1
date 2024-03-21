import React from 'react'
import User from './components/getuser/User.jsx';
import './App.css';
import  Add  from './components/adduser/Add.jsx';
import Edit from './components/updateuser/Edit.jsx';

import { RouterProvider, createBrowserRouter } from "react-router-dom";

export default function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />
    },
    {
      path: "/add",
      element: <Add />
    },
    {
      path: "/edit/:id",
      element: <Edit />
    },

  ]);
  return (
    <div className='App'>
      <RouterProvider router={route}></RouterProvider>
    </div>
  )
}
