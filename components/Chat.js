import React from 'react'
import styled from "styled-components"
import { Avatar} from '@mui/material';
import getRecipiantEmail from '../utils/getRecipiantEmail';
import { useAuthState } from 'react-firebase-hooks/auth';
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import { useCollection } from 'react-firebase-hooks/firestore';
import {  collection,query,where } from 'firebase/firestore'
import { auth,db } from '../firebase';
import { useRouter } from 'next/router'

function Chat({id,users}) {
    const router = useRouter();
    const auth = getAuth();
    const [user] = useAuthState(auth);
    const recipiantEmail = getRecipiantEmail(users,user)
    const getImageRecipt= query(collection(db,'users'),where('email','==',getRecipiantEmail(users,user)))
    const [Recipiantsnapshot] = useCollection(getImageRecipt);

    // would be stored in an array so u have to use [0] to get the first element of the snapshot that its listening to 
    //try a cosole log

    const enterChat = () =>{
        router.push(`/chat/${id}`)
    }
    
    const recipiant = Recipiantsnapshot?.docs?.[0]?.data();
    return ( 
        <Container onClick={enterChat}>
            {recipiant?(
                <UserAvatar src={recipiant?.profileImg}/>
                ):(
                <UserAvatar>{recipiantEmail[0]}</UserAvatar>  
                )}
            <p> {recipiantEmail} </p>
        </Container>
    )
}

export default Chat

const Container= styled.div`
    display: flex;
    align-items: center;
    cursor : pointer;
    padding: 15px;
    word-break: break-word;

    :hover{
        background-color: #e9eaeb;
    }
`
const UserAvatar = styled(Avatar)`
    margin: 5px;
    margin-right:15px;
`
