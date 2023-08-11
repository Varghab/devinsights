import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import BlogDetail from './components/BlogDetail';
import Login from './components/Login';
import Signup from './components/Signup';
import Create from './components/Create';
import MyBlogs from './components/MyBlogs';
import ProtectedRoute from './utils/ProtectedRoute';
import CreateError from './components/Create/CreateError';
import Profile from './components/Profile';
import { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { userContext } from './store/UserContext';
import axios from 'axios';



const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  children:[{
    path: '/',
    element: <Home />,
  },{
    path: '/blog/:name/:id',
    element: <BlogDetail />
  },{
    path: '/login',
    element: <Login />
  },{
    path: '/signup',
    element: <Signup />
  },{
    path: '/create',
    element: <ProtectedRoute children={<Create /> } notLoggedIn={<CreateError/>} > </ProtectedRoute>
  },{
    path: '/myblogs',
    element: <ProtectedRoute notLoggedIn={<CreateError/>} ><MyBlogs /></ProtectedRoute>
  },{
    path: '/myProfile',
    element: <ProtectedRoute notLoggedIn={<CreateError />}><Profile /> </ProtectedRoute>
  }
]
}])

function App() {
  return (
    <>
      <RouterProvider router={router}>
      </RouterProvider>
    </>
  );
}

export default App;
