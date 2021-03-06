import React from 'react'
import styled from "styled-components"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import moment from 'moment'

const Message = ({user,message}) => {
    const [userLoggedIn] = useAuthState(auth)
    const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;
    return (
        <Container>
            <TypeOfMessage >
                {message.message}
                <Timestamp>
                    {message.timestamp ? moment(message.timestamp).format('LT') : '...'  }
                </Timestamp>
            </TypeOfMessage>
        </Container>
    )
}

export default Message

const Container= styled.div`


`
const Timestamp= styled.span`
    color:gray;
    padding: 5px;
    padding-right:10px ;
    padding-top: 15px;
    font-size: 9px;
    position: absolute;
    bottom: 0;
    text-align: right;
    right: 0;

`

const MessageElement= styled.p`
    width: fit-content;
    padding: 15px;
    border-radius: 8px;
    margin: 10px;
    min-width: 60px;
    position: relative;
    text-align: right;

`
const Sender= styled(MessageElement)`
    margin-left: auto;
    background-color: #dcf8c6;

`
const Reciever = styled(MessageElement)`
    margin-left: left;
    background-color: whitesmoke;

`