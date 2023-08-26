import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Forgotpassword from "./Pages/Forgotpassword";
import { ToastContainer, toast } from 'react-toastify';
import firebaseConfig from "../firebaseConfig";





const router = createBrowserRouter(
  createRoutesFromElements(
    
      
        <Route>
              <Route
              path="/"
              element={<Registration/>}
            />
              <Route
              path="/login"
              element={<Login/>}
            />
              <Route
              path="/Forgotpassword"
              element={<Forgotpassword/>}
            />
              <Route
              path="/Home"
              element={<Home/>}
            />
        </Route>
     
  )
);

function App() {
  

  return (
    <>
     <RouterProvider router={router} />
     <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
    </>
  )
}

export default App
