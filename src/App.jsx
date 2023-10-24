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
import Message from "./Pages/Message";
import Notification from "./Pages/Notification";
import { ToastContainer, toast } from 'react-toastify';
import firebaseConfig from "../firebaseConfig";
import Rootlayout from "./Componenets/Rootlayout";





const router = createBrowserRouter(
  createRoutesFromElements(
    
      
        <Route>
              
              <Route
              path="/login"
              element={<Login/>}
            />
              <Route
              path="/Forgotpassword"
              element={<Forgotpassword/>}
            />
              <Route
              path="/"
              element={<Registration/>}
            />

            <Route path="/" element={<Rootlayout/>}>

            <Route
              path="/Home"
              element={<Home/>}
            />
              <Route
              path="/message"
              element={<Message/>}
            />
              <Route
              path="/notification"
              element={<Notification/>}
            />

            </Route>
            
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
