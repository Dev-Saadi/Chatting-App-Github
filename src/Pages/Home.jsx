import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loggedUser } from '../slices/userSlice';
import Grid from '@mui/material/Grid';
import Grouplist from '../Componenets/Grouplist';
import Friendrequest from '../Componenets/Friendrequest';
import Friends from '../Componenets/Friends';
import MyGroup from '../Componenets/MyGroup';
import UserList from '../Componenets/UserList';
import BlockedUser from '../Componenets/BlockedUser';
import { getDatabase, ref, onValue } from "firebase/database";
import { activeChat } from '../slices/activeChatSlice';



const Home = () => {

  const db = getDatabase();
  // const database = getDatabase();

  // const auth = getAuth();

  let navigate = useNavigate()

  let dispatch = useDispatch()

  let data = useSelector(state => state.loggedUser.value)


  useEffect(() => {
    if (!data) {
      navigate("/Login")
    }

  }, [])


  useEffect(() => {
    const singleMsgRef = ref(db, 'lastmsg');
    onValue(singleMsgRef, (snapshot) => {

      snapshot.forEach(item => {



        dispatch(activeChat({
          type: "single",
          activeChatID: item.val().activeChatID,
          activeChatName: item.val().activeChatName
        }))


      })

    });

  }, [])


  // let logoutbtn = ()=>{
  //   signOut(auth).then(() => {
  //     dispatch(loggedUser(null))
  //     localStorage.removeItem("user")
  //     navigate("/Login")
  //   })

  // }




  return (
    <>



      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div className='Search'>
            <input type="text" placeholder='Search' />
          </div>
          <Grouplist />
          <Friendrequest />
        </Grid>
        <Grid item xs={4}>
          <Friends />
          <MyGroup />
        </Grid>
        <Grid item xs={4}>
          <UserList />
          <BlockedUser />
        </Grid>

      </Grid>







      {/* <Button onClick={logoutbtn} variant="outlined">Logout</Button> */}
    </>
  )
}

export default Home