import { useEffect, useState } from 'react';
import gimg1 from '../assets/gimg1.png'
import gimg2 from '../assets/gimg2.png'
import gimg3 from '../assets/gimg3.png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, remove, set, push  } from "firebase/database";
import { useSelector } from 'react-redux';

const BlockedUser = () => {

  const db = getDatabase();

  let [blocklist, setblocklist] = useState([]);


  let data = useSelector(state=> state.loggedUser.value);








  useEffect(()=>{
    const blockRef = ref(db,'block');
    onValue(blockRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item=>{
        
          
          arr.push({...item.val(),bid:item.key});
        
      })
      setblocklist(arr)
    });
  },[]);


  let handleUnblock = (item)=>{

    set(push(ref(db, 'friends')), {
      
      whosendname: item.blockbyname,
      whosendid: item.blockbyid,
      whorecievename: item.blockname,
      whorecieveid: item.blockid,

  }).then(()=>{

    remove(ref(db,"block/" + item.bid))

  });

  }








  return (
    <div className='box'>
    <h3>Blocked User</h3>

    {blocklist.map(item=>(

    <div className='list'>

    <img src={gimg1} />
    <h4>{item.blockbyid == data.uid ? item.blockname : item.blockbyname}</h4>

    {item.blockbyid == data.uid 
    
    && 

    <Button onClick={()=>handleUnblock(item)} variant="contained" color='error'>Unblocked</Button>}
    
    </div>
    ))}



    </div>
  )
}

export default BlockedUser