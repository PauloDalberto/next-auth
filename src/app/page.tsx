'use client'

import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import {Input} from './components/inputIcon/inputIcon';
import './home.scss'
import Image from 'next/image';
import Link from 'next/link';

import {  useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { auth } from './services/firebaseConfig';
import Container from './components/container/container';
import InfosContainer from './components/infos-container/infosContainer';
import ModalSuccess from './components/modal/modalSuccess';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [
    signInWithEmailAndPassword,
  ] = useSignInWithEmailAndPassword(auth);

  const [showModal, setShowModal] = useState(false);

  async function handleSignIn(e: React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    const success = await signInWithEmailAndPassword(email, password);
    if (success) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000); 
    }
  }

  return (
    <Container>
      <InfosContainer>
        <h1 className='title'>Bem vindo de volta!</h1>
        <p className='subtitle'>Insira suas informações para prosseguir para o site!</p>

        <form className='form'>
          <label htmlFor="email">Email</label>
          <Input id='email' name='email' placeholder='email@email.com' type='text' onChange={e => setEmail(e.target.value)} Icon={EnvelopeIcon} htmlFor='email'/>
          
          <label htmlFor="password">Senha</label>
          <Input id='password' name='password' placeholder='senha123' type='password' onChange={e => setPassword(e.target.value)} Icon={LockClosedIcon} htmlFor='password'/>

          <button onClick={handleSignIn} type='submit' className='buttonLogin'>Entrar</button>
        </form>

        <div className='moreInfos'>
          <Link href='/forgotPassword' className='forgotPassword'>Esqueceu a senha?</Link>
          <hr />
          <p>Não tem conta? <Link className='register' href="/register">Registre-se</Link></p>
        </div>
      </InfosContainer>

      <div className='container-image'>
        <Image src="/image2.png" alt='skin de counter strike' width={10000} height={10000} className='image'/>
      </div>

      {showModal && <ModalSuccess />}
    </Container>
  );
}
