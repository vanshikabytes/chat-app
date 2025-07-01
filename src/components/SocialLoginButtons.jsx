import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react'
import { BsGithub, BsGoogle} from 'react-icons/bs'
import styled from 'styled-components';
import { firebaseAuth } from '../utils/FirebaseConfig';
export default function SocialLoginButtons() {
  const providers ={
    google: new GoogleAuthProvider(),
    github: new GithubAuthProvider()
  }
  const firebaseLogin =async(loginType)=>{
    try{
      const provider =providers[loginType];
      const userData = await signInWithPopup(firebaseAuth, provider);
      console.log(userData);

    }catch(err){
      console.log(err);
    }

  }
  return (<Container>
    <button type='' onClick={()=>firebaseLogin("google")}>
      <BsGoogle/>
    </button>
    <button type='' onClick={()=>firebaseLogin("github")}>
      <BsGithub/>
    </button>
    </Container>
    );
}
const Container =styled.div`
display:flex;
width:100%;
justify-content:center;
gap:1rem;
background-color:transparent;

button{
padding: 10px;
    background:transparent;
    border:0.1rem solid #4e0eff
    color: white;
    padding:0.8rem;
    border-radius: 5px;
    font-weight:bold;
    font-size:1rem;
    cursor: pointer;
    display:flex;
    justify-content:center;
    align-items:center;
    &:hover {
      background-color:rgb(92, 104, 209);
    }
}`;