'use client'

import { ArrowLeftIcon, EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import './register.scss'
import Image from 'next/image';

import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebaseConfig';
import { useState } from 'react';
import ModalSuccess from '../components/modal/modalSuccess';
import Link from 'next/link';
import Container from '../components/container/container';
import InfosContainer from '../components/infos-container/infosContainer';
import { Input } from '../components/inputIcon/inputIcon';

export default function Register(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [
    createUserWithEmailAndPassword,
  ] = useCreateUserWithEmailAndPassword(auth);

  const [showModal, setShowModal] = useState(false);

  async function handleSignOut(e: React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    const success = await createUserWithEmailAndPassword(email, password);
    if (success) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000); 
    }
  }

  return(
    <Container>
      <InfosContainer>
        <Link href={'/'} className='back-page'><ArrowLeftIcon width={24} height={24}/></Link>

        <h1 className='title'>Crie sua conta</h1>
        <p className='subtitle'>Insira seus dados para entrar na melhor loja de skins!</p>

        <form className='form'>
          <label htmlFor="username">Nome de usuário</label>
          <Input id='username' name='username' placeholder='Nome' type='text' Icon={UserIcon} htmlFor='username'/>

          <label htmlFor="email">Email</label>
          <Input id='email' name='email' placeholder='email@email.com' type='text' onChange={e => setEmail(e.target.value)} Icon={EnvelopeIcon} htmlFor='email'/>

          <label htmlFor="password">Senha</label>
          <Input id='password' name='password' placeholder='senha123' type='password' onChange={e => setPassword(e.target.value)} Icon={LockClosedIcon} htmlFor='password'/>

          <label htmlFor="repeatPassword">Repita a senha</label>
          <Input id='repeatPassword' name='repeatPassword' placeholder='senha123' type='password' Icon={LockClosedIcon} htmlFor='repeatPassword'/>

          <button onClick={handleSignOut} type='submit' className='buttonRegister'>Registrar-se</button>
        </form>
      </InfosContainer>

      <div className='container-image'>
        <Image src="/image2.png" alt='skin de counter strike' width={10000} height={10000} className='image'/>
      </div>

      {showModal && <ModalSuccess />}
    </Container>
  )
}