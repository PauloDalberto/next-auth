'use client'

import { ArrowLeftIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import {Input} from "../components/inputIcon/inputIcon";
import Image from 'next/image';
import './forgotPassword.scss'
import Link from "next/link";

import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from "../services/firebaseConfig";
import { useState } from "react";
import Container from "../components/container/container";
import InfosContainer from "../components/infos-container/infosContainer";

export default function ForgotPassword(){
  const [email, setEmail] = useState('');
  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

  const actionCodeSettings = {
    url: 'http://localhost:3000/',
  };

  return(
    <Container>
      <InfosContainer>
        <Link href={'/'} className='back-page'><ArrowLeftIcon width={24} height={24}/></Link>

        <h1 className="title">Recuperar senha</h1>
        <p className='subtitle'>Insira seu email e iremos enviar sua nova senha!</p>

        <form className='form'>
          <label htmlFor="email">Senha</label>
          <Input id='email' name='email' placeholder='email@email.com' type='text' htmlFor="email" onChange={(e) => setEmail(e.target.value)} Icon={LockClosedIcon}/>

          <button type='submit' className='buttonRegister' onClick={async () => {
          const success = await sendPasswordResetEmail(
            email,
            actionCodeSettings
          );
          if (success) {
            alert('Sent email');
          }
        }}>Enviar email</button>
        </form>
      </InfosContainer>

      <div className='container-image'>
        <Image src="/image2.png" alt='skin de counter strike' width={10000} height={10000} className='image'/>
      </div>
    </Container>
  )
}