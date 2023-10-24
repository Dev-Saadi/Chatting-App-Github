import React, { useEffect, useState } from 'react'
import gimg1 from '../assets/gimg1.png'
import gimg2 from '../assets/gimg2.png'
import gimg3 from '../assets/gimg3.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, remove,set, push  } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';

const Friendrequest = () => {

  const db = getDatabase();

  let [reqlist, setreqlist] = useState([]);

  let data = useSelector(state=> state.loggedUser.value);

  useEffect(()=>{
    const friendrequestRef = ref(db, 'friendrequest');
    onValue(friendrequestRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item=>{
        if (item.val().whorecieveid == data.uid) {
          
          arr.push({...item.val(),friendid:item.key});
        }
      })
      setreqlist(arr)
    });
  },[]);

  let handledelete = (item)=>{
    console.log(item);
    remove(ref(db, 'friendrequest/' + item.friendid))
  }

  let handleAccept = (item)=>{
    
    set(push(ref(db, 'friends/')), {
    ...item
  }).then(()=>{
    remove(ref(db, 'friendrequest/' + item.friendid))
  });
  }

  return (
    <div className='box'>
    <h3>Friend Request</h3>
    {reqlist.map(item=>(

    <div className='list'>

    <img src={gimg1} />
    <h4>{item.whosendname}</h4>
    
    <Button onClick={()=>handleAccept(item)} variant="contained">Accept</Button>
    <Button onClick={()=>handledelete(item)} variant="contained" color='error'>Delete</Button>

    </div>
    ))}

    
  
    </div>
  )
}

export default Friendrequest