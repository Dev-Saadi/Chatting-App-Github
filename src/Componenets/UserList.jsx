import { useEffect, useState } from 'react';
import gimg1 from '../assets/gimg1.png'
// import gimg2 from '../assets/gimg2.png'
// import gimg3 from '../assets/gimg3.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const UserList = () => {

  const db = getDatabase();


  let userInfo = useSelector((state) => state.loggedUser.value)

  let [userslist, setuserslist] = useState([]);

  let [reqlist, setreqlist] = useState([]);

  let [friendlist, setfriendlist] = useState([]);

  let [blocklist, setblocklist] = useState([]);

  useEffect(() => {
    const userRef = ref(db, 'users');
    onValue(userRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {
        if (userInfo.uid != item.key) {

          arr.push({ ...item.val(), userid: item.key });
        }
      })
      setuserslist(arr)
    });
  }, [])

  let handlefriendrequest = (info) => {

    // console.log("whosend",userInfo.uid,userInfo.displayName);

    // console.log(info);



    const db = getDatabase();

    set(push(ref(db, 'friendrequest')), {
      whosendname: userInfo.displayName,
      whosendid: userInfo.uid,
      whorecievename: info.username,
      whorecieveid: info.userid,
    });



  }

  useEffect(() => {
    const friendrequestRef = ref(db, 'friendrequest');

    onValue(friendrequestRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {


        arr.push(item.val().whorecieveid + item.val().whosendid);

      })
      setreqlist(arr)
    });

  }, []);


  useEffect(() => {
    const friendrequestRef = ref(db, 'friends');
    onValue(friendrequestRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {


        arr.push(item.val().whorecieveid + item.val().whosendid);

      })
      setfriendlist(arr)
    });
  }, [])

  let handleCancel = (item) => {

    remove(ref(db, 'friendrequest'), {

      whoRecieveName: item.whorecievename,
      whoRecieveId: item.whorecieveid
    })
  }


  useEffect(() => {
    const blockRef = ref(db, 'block');
    onValue(blockRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {


        arr.push(item.val().blockid + item.val().blockbyid);

      })
      setblocklist(arr)
    });
  }, []);


  return (
    <div className='box'>
      <h3>User List</h3>

      {userslist.map(item => (


        <div className='list'>

          <img src={gimg1} />
          <h4>{item.username}</h4>
          {reqlist.includes(item.userid + userInfo.uid) || reqlist.includes(userInfo.uid + item.userid)

            ?

            <Button className='Pending' variant="contained" color='error'>P</Button>

            :

            friendlist.includes(item.userid + userInfo.uid) || friendlist.includes(userInfo.uid + item.userid)

              ?

              <Button color='success' variant="contained">F</Button>

              :

              blocklist.includes(item.userid + userInfo.uid) || blocklist.includes(userInfo.uid + item.userid)

                ?

                <Button color='error' variant="contained">B</Button>

                :



                <Button onClick={() => handlefriendrequest(item)} variant="contained">+</Button>}



          {reqlist.includes(item.userid + userInfo.uid) && <Button onClick={() => handleCancel(item)} variant='contained'>Cancel</Button>}




        </div>

      ))}



    </div>
  )
}

export default UserList