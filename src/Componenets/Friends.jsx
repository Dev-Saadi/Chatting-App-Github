import React from 'react'
import { useEffect, useState } from 'react'
import gimg1 from '../assets/gimg1.png'
import gimg2 from '../assets/gimg2.png'
import gimg3 from '../assets/gimg3.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { activeChat } from '../slices/activeChatSlice'



const Friends = () => {


  const db = getDatabase();

  let dispatch = useDispatch()

  let [reqlist, setreqlist] = useState([]);

  let [friendlist, setfriendlist] = useState([]);

  let data = useSelector(state => state.loggedUser.value);


  useEffect(() => {
    const friendrequestRef = ref(db, 'friendrequest');
    onValue(friendrequestRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {
        if (item.val().whorecieveid == data.uid) {

          arr.push({ ...item.val(), friendid: item.key });
        }
      })
      setreqlist(arr)
    });
  }, []);



  useEffect(() => {
    const friendRef = ref(db, 'friends');
    onValue(friendRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {


        arr.push({ ...item.val(), fid: item.key });

      })
      setfriendlist(arr)

    });
  }, []);

  let handleblock = (item) => {



    if (data.uid == item.whosendid) {

      set(push(ref(db, 'block')), {
        blockid: item.whorecieveid,
        blockname: item.whorecievename,
        blockbyid: item.whosendid,
        blockbyname: item.whosendname

      }).then(() => {
        remove(ref(db, 'friends/' + item.fid))
      })
    }
    else {



      set(push(ref(db, 'block')), {
        blockid: item.whosendid,
        blockname: item.whosendname,
        blockbyid: item.whorecieveid,
        blockbyname: item.whorecievename

      }).then(() => {
        remove(ref(db, 'friends/' + item.fid))
      })

    }
  }

  let handleremove = (item) => {
    remove(ref(db, 'friends/' + item.fid))
  }


  let activeChatbtn = (item) => {
    console.log("activeChat", item);
    if (data.uid == item.whosendid) {
      dispatch(activeChat({
        type: "single",
        activeChatID: item.whorecieveid,
        activeChatName: item.whorecievename
      }))

    }
    else {
      dispatch(activeChat({
        type: "single",
        activeChatID: item.whosendid,
        activeChatName: item.whosendname
      }))
    }
  }



  return (
    <div className='box'>
      <h3>Friends</h3>

      {friendlist.map(item => (


        <div className='list' onClick={() => activeChatbtn(item)}>

          <img src={gimg1} />

          <h4>{item.whosendid == data.uid ? item.whorecievename : item.whosendname}</h4>

          <Button onClick={() => handleremove(item)} variant="contained" color='error'>Remove</Button>

          <Button onClick={() => handleblock(item)} variant="contained" color='secondary'>Block</Button>

        </div>

      ))}



    </div>
  )
}

export default Friends