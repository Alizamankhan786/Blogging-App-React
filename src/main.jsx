import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Profile from './Pages/Profile.jsx';
import Singleuser from './Pages/Singleuser.jsx';
import ProtectedRoutes from './ProtectedRoutes.jsx';


const router = createBrowserRouter([
  {
    path: ``,
    element: <Layout />,
    children: [
      {
        path: ``,
        element: <Home />,
      },
      {
        path: `login`,
        element: <Login />,
      },
      {
        path: `register`,
        element: <Register />,
      },
      {
        path: `dashboard`,
        element: <ProtectedRoutes component={<Dashboard />} />,
      },
      {
        path: `profile`,
        element:<ProtectedRoutes component={<Profile />} />
      },
      {
        path: `singleuser`,
        element: <ProtectedRoutes component={<Singleuser/>}/>,
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
  
)
