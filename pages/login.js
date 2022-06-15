import React from 'react'
import styled from "styled-components"
import Head from 'next/head'
import { Button } from '@mui/material'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'
const Login = () => {
    const signIn =()=>{
        signInWithPopup(auth,provider)
    }
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <Logo src="https://www.kindpng.com/picc/m/488-4881214_thumb-image-transparent-live-chat-icon-hd-png.png"/>
                <Button onClick={signIn}>Sign in with google !</Button>
            </LoginContainer>
        </Container>
    )
}

export default Login

const Logo= styled.img`
    width: 200px;
    height: 200px;
    margin-bottom: 50px;
    border-radius: 20%;

`

const Container= styled.div`
    display: grid;
    place-items:center;
    height: 100vh;
`
const LoginContainer= styled.div`
    padding: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius:5px;
    box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.7); 

`
