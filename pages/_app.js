import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db } from '../firebase';
import Login from './login';
import Loading from '../components/Loading';
import { useEffect } from 'react';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from "firebase/auth";

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
  useEffect(()=>{
      
    onAuthStateChanged(auth, (user) => {
      if (user) {
          const usersRef=doc(db,'users',user.uid)
          setDoc(usersRef,{
            id:user.uid,
            email:user.email,
            profileImg:user.photoURL,
            lastseen: serverTimestamp()
            },{merge:true})
    }});
    
  },[user])
  
  if (loading){
    return <Loading/>
  }
  if (!user){
    return <Login/>
  }
  return <Component {...pageProps} />
  
}

export default MyApp

