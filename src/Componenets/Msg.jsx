import React, { useEffect, useRef, useState } from 'react'
import loginimg from '../assets/loginimg.jpg'
import Image from './Image'
import ModalImage from "react-modal-image";
import { TextField, Button } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';
import { MdEmojiEmotions } from "react-icons/md";
import { useSelector } from 'react-redux';

import { getDatabase, push, ref, set, onValue } from "firebase/database";
import moment from 'moment/moment';




const Msg = () => {


    const db = getDatabase();



    let [emojiShow, setemojiShow] = useState(false)
    let [mesg, setMesg] = useState("")
    let [mesgList, setMesgList] = useState([])

    let data = useSelector((state) => state.activeChat.value);
    let userdata = useSelector(state => state.loggedUser.value)

    // let ref = useRef()

    let emojibtn = () => {
        setemojiShow(!emojiShow)
    }

    // useEffect(() => {

    //     document.body.addEventListener("click", (e) => {
    //         if (ref.current.contains(e.target)) {
    //             setemojiShow(true)
    //         }
    //         else {
    //             setemojiShow(false)
    //         }
    //     })
    // }, [])


    let SendMsgbtn = () => {

        if (data.type == "single") {
            set(push(ref(db, 'singleMsg')), {
                whoSendID: userdata.uid,
                whoSendName: userdata.displayName,
                whoRecieveID: data.activeChatID,
                WhoRecieveName: data.activeChatName,
                msg: mesg,
                date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`
            });

        } else {
            console.log("tata");
        }



    }


    useEffect(() => {
        const singleMsgRef = ref(db, 'singleMsg');
        onValue(singleMsgRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                if ((item.val().whoSendID == userdata.uid && item.val().whoRecieveID == data.activeChatID)
                    ||
                    (item.val().whoSendID == data.activeChatID && item.val().whoRecieveID == userdata.uid)) {

                    arr.push(item.val());
                }

            })
            setMesgList(arr)
        });

    }, [])





    return (


        data &&
        <div className='msgbox'>

            <h1>{data.activeChatName}</h1>


            <div className="msgContainer">

                {mesgList.map(item => (
                    item.whoSendID == userdata.uid ?
                        <div className='sendMsg'>
                            <p>{item.msg}</p>
                            <br />
                            <span>{moment(item.date, "YYYYMMDD hh.mm").fromNow()}</span>
                        </div>
                        :
                        <div className='rcvMsg'>
                            <p>{item.msg}</p>
                            <br />
                            <span>{moment(item.date, "YYYYMMDD hh.mm").fromNow()}</span>
                        </div>

                ))}





                {/* <div className='sendimg'>
                    <div className='imgbackgrnd'>

                        <ModalImage
                            small={loginimg}
                            large={loginimg}
                            alt='hello'
                        />
                    </div>
                </div>

                <div className='rcvimg'>
                    <div className='rcvimgbackgrnd'>

                        <ModalImage
                            small={loginimg}
                            large={loginimg}
                            alt='hello'
                        />
                    </div>
                </div>

                <div className='sendAudio'>
                    <div className='sendaudiobox'>

                        <audio controls>

                        </audio>
                    </div>

                </div>

                <div className='rcvAudio'>

                    <div className='rcvaudiobox'>

                        <audio controls>

                        </audio>
                    </div>

                </div>

                <div className='sendVideo'>

                    <div className='sendVideobox'>

                        <video width="320" height="240" controls>

                        </video>
                    </div>
                </div>

                <div className='rcvVideo'>

                    <div className='rcvVideobox'>

                        <video width="320" height="240" controls>

                        </video>
                    </div>
                </div> */}
            </div>

            <div className="chatBox">
                <TextField onChange={(e) => setMesg(e.target.value)} id="outlined-basic" label="Message" variant="outlined" />

                <MdEmojiEmotions className='emojicon' onClick={() => emojibtn()} />

                <Button onClick={SendMsgbtn} color='success' variant="contained">Send</Button>

                {emojiShow &&

                    <div className="emojibox">
                        <EmojiPicker />
                    </div>
                }
            </div>

        </div>









    )
}

export default Msg