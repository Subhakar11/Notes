import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles.css';
import App from './App.jsx';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter([
  { path: '/', element: <App/>, children: [
    { index: true, element: <SignIn/> },
    { path: 'signup', element: <SignUp/> },
    { path: 'dashboard', element: <Dashboard/> }
  ]}
]);

createRoot(document.getElementById('root')).render(<RouterProvider router={router} future={{ v7_startTransition: true }} />);
