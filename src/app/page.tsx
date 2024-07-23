'use client'

import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import InputWithIcon from './components/inputIcon/inputIcon';
import './home.scss'
import Image from 'next/image';
import Link from 'next/link';

import {  useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { auth } from './services/firebaseConfig';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  function handleSignIn(e: React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    signInWithEmailAndPassword(email, password)
  }

  if(loading){
    return <p>Carregando...</p>
  }
  if(user){
    return console.log(user)
  }
  
  return (
    <div className='container'>
      <section className='login'>
        <h1>Bem vindo de volta!</h1>
        <p className='subtitle'>Insira suas informações para prosseguir para o site!</p>

        <form className='form'>
          <label htmlFor="email">Email</label>
          <InputWithIcon htmlFor='email' Icon={EnvelopeIcon} id='email' name='email' placeHolder='email@email.com' type='text' onChange={e => setEmail(e.target.value)}/>
          
          <label htmlFor="password">Senha</label>
          <InputWithIcon htmlFor='password' Icon={LockClosedIcon} id='password' name='password' placeHolder='senha123' type='password' onChange={e => setPassword(e.target.value)}/>

          <button onClick={handleSignIn} type='submit' className='buttonLogin'>Entrar</button>
        </form>

        <div className='moreInfos'>
          <Link href='/forgotPassword' className='forgotPassword'>Esqueceu a senha?</Link>
          <hr />
          <p>Não tem conta? <Link className='register' href="/register">Registre-se</Link></p>
        </div>
        
      </section>

      <div className='container-image'>
        <Image src="/image2.png" alt='skin de counter strike' width={10000} height={10000} className='image'/>
      </div>
    </div>
  );
}
