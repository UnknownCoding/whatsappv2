import React from 'react'
import styled from "styled-components"
import { Avatar, Button, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { signOut } from "firebase/auth";
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import * as EmailValidator from 'email-validator';
import { auth,db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, doc,query,where } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from './Chat';

const Sidebar = () => {

const [user, loading, error] = useAuthState(auth);
const userchatref= query(collection(db,'chats'),where('users','array-contains',user.email))
const [snapshot] = useCollection(userchatref);

const createChat= ()=>{
    const input = prompt("please enter an email address for the user you wish to chat with !");
    if(!input){return null};
    if (EmailValidator.validate(input) && input !== user.email && !chatAlreadyExist(input)){
        
        addDoc(collection(db,'chats'),{
            users:[user.email,input],
        })
    }

    function chatAlreadyExist (recipiantEmail){
        // double exclamation meark means it makes the reutrn value trurthy or falsy precisely!
        // we have a snapshot that is a real time listener we could even use the on Snapshot function and create a real time 
        // listener without all the firebase useCollecection function ( that still allows us tyo use a realk time listener)
        // 1-) we get INTO the docs INTO the data INTO the users then finally into the main field the USERS 
        // 2-) we use a find function with the users  to find if they are equal and check if their length is more than 0
        
        return !!snapshot?.docs?.find((chat) => chat?.data()?.users?.find((user) => user === recipiantEmail)?.length>0)
    }
}

return (    
    <Container>
        <Header>
            <UserAvatar src={user?.photoURL} onClick={()=>{signOut(auth)}}/>
            <IconsContainer>
            
                <IconButton>
                    <ChatIcon/>
                </IconButton>
            
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            
            </IconsContainer>
        </Header>
        <Search>    
            <SearchIcon/>
            <SearchInput placeholder='Search Chats'/>
        </Search>
        <SideBarButton onClick={createChat}> Start A New Chat</SideBarButton>
        {/* chats */}
        {snapshot?.docs?.map((doc)=>(
            <Chat key={doc.id} id={doc?.id} users={doc?.data()?.users}/>
        ))}
    </Container>
    
    )
}

export default Sidebar

const Container= styled.div`
    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    min-width: 330 px  ;
    max-width: 350 px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
    display: none;
    }
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
`
const Header = styled.div`
    display: flex;
    position: sticky;
    background-color: white;
    z-index: 10;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`
const UserAvatar = styled(Avatar)`
    cursor:pointer ;
    :hover{
        opacity: 0.8;
    }
`
const IconsContainer= styled.div`

`
const Search= styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius:2px;

`
const SearchInput= styled.input`
    outline-width: 0px;
    border: none;
    flex:1 ;
`
const SideBarButton= styled(Button)`
    &&&{
        border-top: 1px solid whitesmoke ;
        border-top: 1px solid whitesmoke ;
    }
    width: 100%;
`