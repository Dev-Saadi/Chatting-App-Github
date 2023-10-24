import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link,useNavigate } from 'react-router-dom';
import bg from '../assets/bg.png'
import { useState,useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { PiEyeClosed } from 'react-icons/pi'
import { FaRegEye } from 'react-icons/fa'
import Image from '../Componenets/Image';
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";
import { useSelector } from 'react-redux';


const Registration = () => {

    const auth = getAuth();

    const db = getDatabase();
    
    let navigate = useNavigate()

    let data = useSelector(state=> state.loggedUser.value)


  useEffect(()=>{
    if(data){
      navigate("/Home")
    }

  },[])

    


    let [formdata,setFormdata] = useState({

        fullname: "",
        email: "",
        password: ""
    })
    
    let [fullnamerror,setfullnameerror] = useState("")

    let [emailerror,setemailerror] = useState("")

    let [passworderror,setpassworderror] = useState("")

    let [open,setOpen] = useState(false)

    let [load,setload] = useState(false)

    let handleChange = (e)=>{
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
            })


            if (e.target.name == "fullname") {
                setfullnameerror("")
            }
            if (e.target.name == "email") {
                setemailerror("")
            }
            if (e.target.name == "password") {
                setpassworderror("")
            }

         
            

    }



    let handleRegistration = ()=>{
        
        
        if (!formdata.fullname) {
            setfullnameerror("Full name required")
        }

        if (!formdata.email) {
            setemailerror("Email is required")
        }

        if (!formdata.password) {
            setpassworderror("Password is required")
        }

        if (formdata.fullname && formdata.email && formdata.password) {
            
            // let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            // let passwordExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

            // if (!pattern.test(formdata.email)) {
            //     setemailerror("Invalid Email")
            // }
            // if (formdata.fullname.length < 3) {
            //     setfullnameerror("Full name must more than 3 characters")
            // }
            // if(!passwordExpression.test(formdata.password)){
            //     setpassworderror("password not strong")
            // }

            setload(true)
            
            

            createUserWithEmailAndPassword(auth, formdata.email, formdata.password).then((users)=>{


                updateProfile(auth.currentUser, {
                    displayName: formdata.fullname, 
                    photoURL: "https://firebasestorage.googleapis.com/v0/b/chatting-application-ff0ab.appspot.com/o/download.png?alt=media&token=cb810771-ce85-4262-b58d-7323c8067b3c"
                  }).then(() => {

                    sendEmailVerification(auth.currentUser).then(()=>{

                        setFormdata({
                            fullname: "",
                            email: "",
                            password: ""
                        })
    
                        setload(false)
    
                        toast.success('👍 Registration Sucessfull! Please veify your email', {
                            position: "bottom-left",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
    
                        setTimeout(()=>{
                            navigate("/Login")
        
                        },1000)
    
    
                    }).then(() => {
                        console.log(users.user.uid);

                        set(ref(db, 'users/' + users.user.uid ), {
                            username: formdata.fullname,
                            email: formdata.email,
                            profile_picture : "https://firebasestorage.googleapis.com/v0/b/chatting-application-ff0ab.appspot.com/o/download.png?alt=media&token=cb810771-ce85-4262-b58d-7323c8067b3c"
                          });
                        
                    })
    
                    
                  })

                

              
                
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode.includes("email")) {
                    toast.error('❌ Email already registered', {
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
  return (
    <div className='registration'>
    <div className="left">
        <div className='text_container'>

            <h2>Get started with easily register</h2>
            <p className='freeregister'>Free register and you can enjoy it</p>

            <TextField onChange={handleChange} name="fullname" className='inputcss' type='text' id="outlined-basic" label="Full name" variant="outlined" value={formdata.fullname} />

            {fullnamerror && <Alert className='alert' severity="error">{fullnamerror}</Alert>}

            <TextField onChange={handleChange} name="email" className='inputcss' type='email' id="outlined-basic" label="Email address" variant="outlined" value={formdata.email} />

            {emailerror && <Alert className='alert' severity="error">{emailerror}</Alert>}

            <div>
            <TextField onChange={handleChange} name="password" className='inputcss' type={open ? "text" : "password"} id="outlined-basic" label="Password" variant="outlined" value={formdata.password} />

            {open 
            ? 
            <FaRegEye onClick={()=>setOpen(false)} className='eye'/>

            :
            <PiEyeClosed onClick={()=>setOpen(true)} className='eye'/>

            }


            </div>


            {passworderror && <Alert className='alert' severity="error">{passworderror}</Alert>}

            {load 

            ? <Button  className='Signupbutton' variant="contained">
                
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

            : <Button onClick={handleRegistration} className='Signupbutton' variant="contained">Sign up</Button> }

            

            <p className='account1'>Already  have an account ?  <Link  to="/login" className="focus">Sign In</Link></p>

        </div>
    </div>
    <div className="right">
        <Image src={bg} className='bg' />
    </div>
</div>
    
  )
}

export default Registration