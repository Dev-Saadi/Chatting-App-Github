import React from 'react'
import TextField from '@mui/material/TextField';
import { ThreeDots } from 'react-loader-spinner'
import Button from '@mui/material/Button';
import loginimg from '../assets/loginimg.jpg'
import Google from '../assets/Google.png'
import facebook from '../assets/facebook.png'
import { Link,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,FacebookAuthProvider } from "firebase/auth";
import { PiEyeClosed } from 'react-icons/pi'
import { FaRegEye } from 'react-icons/fa'
import Image from '../Componenets/Image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loggedUser } from '../slices/userSlice';
import { useDispatch,useSelector } from 'react-redux';
import { getDatabase, ref, set, push } from "firebase/database";





const Login = () => {
  const auth = getAuth();

  const dispatch = useDispatch()

  const provider2 = new FacebookAuthProvider();

  const provider = new GoogleAuthProvider();

  const db = getDatabase();

  let navigate = useNavigate()

  let data = useSelector(state=> state.loggedUser.value)


  useEffect(()=>{
    if(data){
      navigate("/Home")
    }

  },[])

  let [logindata,setlogindata] = useState({

    email: "",
    password:"",

  })

  



  let [open,setOpen] = useState(false)

  let [load,setload] = useState(false)

  let [emailerror,setemailerror] = useState("")

  let [passworderror,setpassworderror] = useState("")


  // let [loginerror,setloginerror] = useState({

  //   emailerror:"email required",
  //   passworderror:"password required",

  // })




  let handletype = (e)=>{
    setlogindata({
      ...logindata,
      [e.target.name]: e.target.value
    })

    // setloginerror({
    //   ...loginerror,
    //   [e.target.name]:e.target.value
    // })

    if (e.target.name == "email") {
      setemailerror("")
    }

    if (e.target.name == "password") {
      setpassworderror("")
    }



  }


  let Loginbtn = ()=>{

    if (!logindata.email) {
      setemailerror("Email required")
    }
    if (!logindata.password) {
      setpassworderror("Password required")
    }

    if (logindata.email && logindata.password) {

      // let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      // let passwordExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      
      // if (!pattern.test(logindata.email)) {
      //           setemailerror("Invalid Email")
      //       }
           
      //       if(!passwordExpression.test(logindata.password)){
      //           setpassworderror("password not strong")
      //       }

      setload(true)

      signInWithEmailAndPassword(auth, logindata.email, logindata.password).then((user)=>{

        // console.log(user);

        // if (user.user.emailVerified) {
          navigate("/Home")
          dispatch(loggedUser(user.user))
          localStorage.setItem("user",JSON.stringify(user.user))
        // }
        
        // else{

        //   toast.error('🧐 Please verify your email', {
        //     position: "bottom-left",
        //     autoClose: 2000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        // });

          

        // }
        setload(false)

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (!errorCode.includes("email")) {
          toast.error('😕 Email does not exist', {
              position: "bottom-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
          });
      }
      setload(false)
      });



    }

  }

  let Popupbtn = ()=>{
    signInWithPopup(auth, provider).then((user) => {
      navigate("/Home")
      dispatch(loggedUser(user.user))
          localStorage.setItem("user",JSON.stringify(user.user))

      // console.log("google",user);

      set(push(ref(db, 'users')), {
        username: user.user.displayName,
        email: user.user.email,
        profile_picture : user.user.photoURL
      });


 
    })
  }
  let Popupbtn2 = ()=>{
    signInWithPopup(auth, provider2).then(() => {
      console.log("done");
    })
  }


return (

    <div className='registration'>
    <div className="left">
        <div className='text_container2'>
            <h2>Log into your account!</h2>

            <div className='Popupimage'>
            <Link onClick={Popupbtn}><Image src={Google} className="Google"/></Link>

            <Link onClick={Popupbtn2}><Image src={facebook} className="facebook"/></Link>

            </div>


            


            
            
            
            <TextField onChange={handletype} name='email' className='inputcss' type='email' id="standard-basic" label="Email address" variant="standard" />

            {emailerror && <Alert className='alert' severity="error">{emailerror}</Alert>}

            <div>

            <TextField onChange={handletype} name='password' className='inputcss' type={open ? "text" : "password"} id="standard-basic" label="Password" variant="standard" />

            {open 
                ? 
                <FaRegEye onClick={()=>setOpen(false)} className='eye2'/>

                :
                <PiEyeClosed onClick={()=>setOpen(true)} className='eye2'/>

                }

            </div>


            {passworderror && <Alert className='alert' severity="error">{passworderror}</Alert>}

            {load 
            
            ? <Button className='Loginbutton' variant="contained">
               <ThreeDots 
                    height="40" 
                    width="40" 
                    radius="9"
                    color="#fff" 
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                    />
            </Button>

            : <Button onClick={Loginbtn} className='Loginbutton' variant="contained">Log in to Continue</Button>
            
            }
            
            

            <p className='account2'>Don’t have an account ? <Link to="/" className="focus">Sign up</Link></p>

            <p className='account2'>Forgot Password ? <Link to="/Forgotpassword" className="focus">Click here</Link></p>
        </div>
    </div>
    <div className="right">
        <Image src={loginimg} className="bg"/>
        
    </div>
    </div>
    
  )
}

export default Login