import React from 'react'
import Button from '@mui/material/Button';
import { getAuth, signOut } from "firebase/auth";
import { Link,useNavigate } from 'react-router-dom';

const Home = () => {
  const auth = getAuth();
  let navigate = useNavigate()


  let logoutbtn = ()=>{
    signOut(auth).then(() => {
      navigate("/Login")
    })
    
  }




  return (
    <>
    <Button onClick={logoutbtn} variant="outlined">Logout</Button>
    </>
  )
}

export default Home