import React from 'react'
import styled from "styled-components"
import Head from 'next/head'
import Sidebar from '../../components/Sidebar'
import ChatScren from '../../components/ChatScren'
import { doc, getDoc, getDocs, orderBy, query,  } from 'firebase/firestore'
import {  collection, } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import getRecipiantEmail from '../../utils/getRecipiantEmail'

const Chat = ({chat,messages}) => {
    const [user]= useAuthState(auth)
    return (
        <Container>
            <Head>
                <title>Chat with {getRecipiantEmail(chat?.users,user)}</title>
            </Head>
            <Sidebar/>
            <ChatContainer>
                <ChatScren chat={chat} message={messages}/>
            </ChatContainer>
        </Container>
    )
}

export default Chat

export async function getServerSideProps(context){

    // context.query.id is a way to get the data from the params

    const ref = doc(db,'chats',context.query.id)
    const refV2 = collection(ref,"messages")
    const messageref = query(refV2,orderBy('timestamp','asc'))
    const docSnap = await getDocs(messageref);
    const messages = docSnap.docs.map((doc) =>({
        id:doc.id,
        ...doc.data()
    })).map((messages) => ({
        ...messages,
        timestamp: messages.timestamp?.toDate().getTime(),
    }));
    const chatRes = await getDoc(ref)
    
    const chat = {
        id:chatRes.id,
        ...chatRes.data()
    }

    console.log(chat,messages)
    return{
        props:{
            messages: JSON.stringify(messages),
            chat:chat
        }
    }
}

const Container= styled.div`
    display: flex;

`
const ChatContainer= styled.div`
    flex: 1;
    overflow: scroll;
    height: 100vh;

    ::-webkit-scrollbar {
    display: none;
    }
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

`
