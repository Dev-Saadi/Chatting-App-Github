import gimg1 from '../assets/gimg1.png'
import { getDatabase, ref, onValue, remove, set, push  } from "firebase/database";
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';










const style = {
  
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MyGroup = () => {

  const [open, setOpen] = useState(false);

  const [gname, setgname] = useState("")

  const [grequelist, setgrequelist] = useState([])

  const handleOpen = (item) => {


    const groupRef = ref(db, 'grouprequest');
    onValue(groupRef, (snapshot) => {
      let arr = []
      snapshot.forEach(gitem=>{
       
          if (data.uid == gitem.val().adminid && item.gid == gitem.val().gid) {
            
            arr.push({...gitem.val(),whosendid:gitem.key})
          }
            // arr.push({...item.val(),gid:item.key});
          
        
      })
      setgrequelist(arr)
    });




    setgname(item.groupname)
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  const db = getDatabase();

  let data = useSelector(state=> state.loggedUser.value);

  let [grouplist, setgrouplist] = useState([]);

  

  useEffect(()=>{
    const groupRef = ref(db, 'group');
    onValue(groupRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item=>{
       
          if (item.val().adminid == data.uid) {
            
            arr.push({...item.val(),gid:item.key});
          }
        
      })
      setgrouplist(arr)
    });
  },[]);


  let groupRejectnbtn = (item)=>{
    console.log(item);

    remove(ref(db, 'grouprequest/' + item.whosendid))

    

  }



  let deleteMygroupbtn = (item)=>{

    remove(ref(db, 'group/' + item.gid))

  }


  return (
    <div className='box'>
    <h3>My Group</h3>

    {grouplist.map(item=>(

    <div className='list'>

    <img src={gimg1} />
    <h4>{item.groupname}</h4>
    <Button onClick={()=>deleteMygroupbtn(item)} variant="contained" color='error'>Delete</Button>
    <Button onClick={()=>handleOpen(item)} variant="contained" color='success'>Request</Button>
    <Button variant="contained" color='success'>Members</Button>

    </div>




    ))}


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Group Request by {gname}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

            {grequelist.map(item=>(

              <>
              
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={item.whosendname}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {item.whosendname}

                      </Typography>
                      {` wants to join ${gname}`}



                      <div className='rejectacceptbtn'>

                      <div className='flex'>

                      <Button variant="contained" color='success'>Accept</Button>
                      </div>

                      


                      <div className='rejectbtn'>

                      <Button onClick={()=>groupRejectnbtn(item)}  variant="contained" color='error'>Reject</Button>

                      </div>
                      </div>


                      

                      

                      
                      
                    </>
                  }
                />
            </ListItem>
              </>

              ))}



      <Divider variant="inset" component="li" />
     
    </List>
          </Typography>
        </Box>
      </Modal>

    

    </div>
  )
}

export default MyGroup