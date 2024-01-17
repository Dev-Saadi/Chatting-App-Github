import TextField from '@mui/material/TextField';
import gimg1 from '../assets/gimg1.png'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";



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

const Grouplist = () => {

  const db = getDatabase();

  let [grouplist, setgrouplist] = useState([]);

  let data = useSelector(state => state.loggedUser.value);

  const [open, setOpen] = useState(false);
  const [gname, setgroupname] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let handleCreategroup = () => {

    set(push(ref(db, 'group')), {
      groupname: gname,
      adminid: data.uid,
      adminName: data.displayName

    }).then(() => {
      setOpen(false)
    })
  }



  useEffect(() => {
    const groupRef = ref(db, 'group');
    onValue(groupRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {

        if (item.val().adminid != data.uid) {

          arr.push({ ...item.val(), gid: item.key });
        }

      })
      setgrouplist(arr)
    });
  }, []);

  let handleGroupJoin = (item) => {
    console.log(item);
    set(push(ref(db, 'grouprequest')), {
      ...item,
      whosendid: data.uid,
      whosendname: data.displayName,


    }).then(() => {

    })
  }


  let [groupfrndreq, setgroupfrndreq] = useState([]);

  useEffect(() => {

    const groupfrndreqRef = ref(db, 'grouprequest');
    onValue(groupfrndreqRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item => {




        arr.push(item.val().whosendid + item.val().gid);




      })
      setgroupfrndreq(arr)

    });


  }, []);


  let groupCancelbtn = (item) => {

    remove(ref(db, 'grouprequest'), {

      whosendid: item.uid,
    });

  }















  return (
    <div className='box'>
      <h3>Group List
        <Button onClick={handleOpen} className='Groupbtn' variant="contained">Create Group</Button>
      </h3>



      {grouplist.map(item => (

        <div className='list'>

          <img src={gimg1} />
          <h4>{item.groupname}</h4>

          {groupfrndreq.includes(item.gid + data.uid) || groupfrndreq.includes(data.uid + item.gid) ?



            <Button color='secondary' variant="contained">Pending</Button>
            :
            <Button onClick={() => handleGroupJoin(item)} variant="contained">Join</Button>




          }

          {groupfrndreq.includes(data.uid + item.gid)

            &&
            <Button onClick={() => groupCancelbtn(item)} color='error' variant="contained">Cancel</Button>



          }








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
            Create Group
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField onChange={(e) => setgroupname(e.target.value)} id="standard-basic" label="Group Name" variant="standard" />

            <div className='Createbtn'>

              <Button onClick={handleCreategroup} variant="contained">Create</Button>
            </div>

          </Typography>
        </Box>
      </Modal>


    </div>


  )
}

export default Grouplist