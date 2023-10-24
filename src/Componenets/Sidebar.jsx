import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { AiOutlineHome, AiOutlineMessage, AiOutlineSetting } from "react-icons/ai"
import { IoMdNotificationsOutline} from "react-icons/io"
import { RiLogoutBoxRLine} from "react-icons/ri"
import { Link,useNavigate  } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { loggedUser } from '../slices/userSlice';

const Sidebar = () => {

    const auth = getAuth();

    let navigate = useNavigate()
  
    let dispatch  = useDispatch()



    let userInfo = useSelector((state)=>state.loggedUser.value)

    let [url,seturl] = useState("Home")


    let logoutbtn = ()=>{
        signOut(auth).then(() => {
          dispatch(loggedUser(null))
          localStorage.removeItem("user")
          navigate("/Login")
        })
        
      }



  return (

    <div className='Sidebar'> 

    <img className='sidebarimg' src={userInfo.photoURL} />
    <h1>{userInfo.displayName}</h1>


    <ul>
        <li onClick={()=>seturl("Home")} className={url=="Home" && "active"}>
           <Link to="/Home"><AiOutlineHome className='icon'/></Link>
            
        </li>

        <li onClick={()=>seturl("Message")} className={url=="Message" && "active"}>
            <Link to="/Message"><AiOutlineMessage className='icon'/></Link>
        </li>

        <li onClick={()=>seturl("Notification")} className={url=="Notification" && "active"}>
            <Link to="/Notification"><IoMdNotificationsOutline className='icon'/></Link>
        </li>

        <li>
         <Link to="/setting"><AiOutlineSetting className='icon'/></Link>   
        </li>

        <li onClick={logoutbtn}>
          <Link to="/logout"><RiLogoutBoxRLine className='icon'/></Link>  
        </li>
    </ul>

    </div>
  )
}

export default Sidebar