import React, { useRef, useState } from 'react'
import styled from "styled-components"
import { auth,db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { Avatar } from '@mui/material'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Button, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useCollection } from 'react-firebase-hooks/firestore';
import { addDoc, collection, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { doc, setDoc, deleteDoc,where} from 'firebase/firestore';
import Message from './Message'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import getRecipiantEmail from '../utils/getRecipiantEmail'
import TimeAgo from 'timeago-react';


const ChatScren = ({message,chat}) => {
    console.log(message)
    console.log(chat)
    const endOfMessage = useRef(null)
    const [user]= useAuthState(auth)
    const router = useRouter();
    const [input,setInput] = useState("")
    const [snapshot] = useCollection(query(collection(db,'chats',router.query.id,'messages'),orderBy('timestamp','asc')));
    
    const ScrollToBottom = ()=>{
        endOfMessage.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }

    const sendMessage = (e)=>{
    
        e.preventDefault();
        const usersRef=doc(db,'users',user.uid)

        setDoc(usersRef,{
            lastseen: serverTimestamp()
        },{merge:true})

        const messageREF = collection(db,'chats',router.query.id,'messages')
        addDoc(messageREF,{
            timestamp:serverTimestamp(),
            message:input,
            user:user.email,
            photoURL:user.photoURL,
        })
        setInput("");
        ScrollToBottom();
    }
    
    const recipiantEmail = getRecipiantEmail(chat.users,user);

    const [recipiantSnapShot]= useCollection(query(collection(db,'users'),where('email','==',getRecipiantEmail(chat.users,user))))
    const recipiant= recipiantSnapShot?.docs?.[0]?.data();
    console.log(recipiant)
    const showMessages = ()=>{
        if(snapshot){
            return snapshot.docs.map(message =>(
                // remeber some of the timestamp gets lost as it is processed through server to client  
                <Message key={message.id} user={message.data().user} message={{
                                                                                ...message.data(),
                                                                                timestamp:message?.data().timestamp?.toDate()?.getTime(),
                                                                            }} 
                />
            ))
        }else{
            return( JSON?.parse(message)?.map(message => (
                <Message key={message?.id} user={message?.user} message={message}/>
            )))
            }
    }

    return (
        <Container>
            <Header>
                {console.log(recipiantEmail[0])}
                {recipiant?(
                    <Avatar src={recipiant?.profileImg}/>
                ):(
                    <Avatar>{recipiantEmail[0]}</Avatar>
                )}
                <HeaderInformation>
                    <h3>{recipiantEmail}</h3>
                    {recipiant?(
                        <p>Last Active:{""} {recipiant?.lastseen?.toDate() ? (<TimeAgo datetime={recipiant?.lastseen?.toDate()}/>):("Unavailable")}</p>
                    ):(
                    <p>Loading last active</p>
                    )}                    
                </HeaderInformation>
                <HeaderIcon>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </HeaderIcon>
            </Header>
            <MessageContainer>
                {showMessages()}
                <EndOfMessage/>
            </MessageContainer>
            <InputContainer>
                <InsertEmoticonIcon ref={endOfMessage}/>
                <Input value={input} onChange={(e)=>setInput(e.target.value)}/>
                <button hidden disabled={!input} type="submit" onClick={sendMessage}>Submit</button>
                <MicIcon/>
            </InputContainer>
        </Container>
    )
}

export default ChatScren

const Input = styled.input`
    flex: 1;
    align-items: center;
    padding: 20px;
    position: sticky;
    background-color:whitesmoke;
    border-radius: 10px;
    border: none;
    border-radius: 10px;
    outline: 0;
    margin-left: 15px;
    margin-right: 15px;


`

const InputContainer= styled.form`
    display:flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom: 0;
    background-color: white;
    z-index: 100;
`

const EndOfMessage= styled.div`

    margin-bottom:50px;
`
const MessageContainer= styled.div`
    padding: 30px;
    background-color: #e5ded8;
    min-height: 90vh;
`
const Container= styled.div`

`
const Header= styled.div`
    position: sticky;
    background-color: white;
    z-index: 10;
    top:0;
    display: flex;
    padding: 11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;

`
const HeaderInformation= styled.div`
    margin-left: 15px ;
    flex: 1;
    >h3{
        margin-bottom: 3px;
    }
    > p{
        font-size: 14px;
        color: gray ;
    }


`
const HeaderIcon= styled.div`

`
