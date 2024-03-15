import './App.css';
import AddUser from './components/addUser/AddUser';
import Users from './components/users/Users';
import RemovedUsers from './components/removedUsers/RemovedUsers';
import RootLayout from '../src/components/RootLayout'
import ErrorPage from './components/ErrorPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
function App() {
  const routerObject=createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          path:'/',
          element:<AddUser/>,
        },
        {
          path:'/users',
          element:<Users/>
        },
        {
          path:'/removed-users',
          element:<RemovedUsers/>
        }
      ]
    }
  ])
  return (
    <>
    <RouterProvider router={routerObject}/>
    </>
  );
}

export default App;
