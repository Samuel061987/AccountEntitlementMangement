import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Registration from './Components/Registration/Registration';
import User from './Components/User/User';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import useToken from './useToken';


function App() {

  const {setToken}= useToken();

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login setToken={setToken}/>,
    },
    {
      path: "/",
      element: <Login setToken={setToken} />,
    },
    {
      path: "",
      element: <Login setToken={setToken}/>,
    },
    {
      path: "/signup",
      element: <Registration />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path:"/user/:id",
      element: <User/>,
    }
  ]);

 

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
