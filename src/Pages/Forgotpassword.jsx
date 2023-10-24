import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Image from '../Componenets/Image';
import loginimg from '../assets/loginimg.jpg'
import Alert from '@mui/material/Alert';
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner'

const Forgotpassword = () => {
  const auth = getAuth();

  let navigate = useNavigate()

  let [email,setemail] = useState("")

  let [emailerror,setemailerror] = useState("")

  let [load,setload] = useState(false)

  let handleforgotpassword = ()=>{

    

    if (!email) {
      setemailerror("Email required")
      
      
    }else{

      setload(true)
    }
    

    sendPasswordResetEmail(auth, email).then(() => {
      
      console.log("gece");

      toast.success('👍 Check your Email', {
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


  


  let handleEmail =(e)=>{
    setemail(e.target.value)

    if (e.target.value) {
      setemailerror("")
    }

   

  }



  



  









  return (
    <div className='forgotpage'>
      <div className="left">
        <div className="forgotcontainer_2">
        <h3>Forgot Password</h3>

        <TextField onChange={handleEmail}  className='inputcss' id="outlined-basic" label="Email" variant="outlined" />
        
        {emailerror && <Alert className='alert2' severity="error">{emailerror}</Alert>}


        {load 

        ? 
        <Button className='forgotbutton' variant="contained">
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

        :
      
        <Button onClick={handleforgotpassword} className='forgotbutton' variant="contained">Reset</Button>
      
      }







        </div>
      </div>
      <div className="right">
      <Image src={loginimg} className="bg"/>

      </div>
        
    </div>
  )
}

export default Forgotpassword