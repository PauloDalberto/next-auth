'use client'

import { ArrowLeftIcon, EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import './register.scss'
import Image from 'next/image';
import InputWithIcon from '../components/inputIcon/inputIcon';

import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebaseConfig';
import { useState } from 'react';
import ModalSuccess from '../components/modal/modalSuccess';
import Link from 'next/link';
import Container from '../components/container/container';
import InfosContainer from '../components/infos-container/infosContainer';

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
          <InputWithIcon htmlFor='username' Icon={UserIcon} id='username' name='username' placeHolder='Nome' type='text' />

          <label htmlFor="email">Email</label>
          <InputWithIcon htmlFor='email' Icon={EnvelopeIcon} id='email' name='email' placeHolder='email@email.com' type='text' onChange={e => setEmail(e.target.value)}/>

          <label htmlFor="password">Senha</label>
          <InputWithIcon htmlFor='password' Icon={LockClosedIcon} id='password' name='password' placeHolder='senha123' type='password' onChange={e => setPassword(e.target.value)}/>

          <label htmlFor="repeatPassword">Repita a senha</label>
          <InputWithIcon htmlFor='repeatPassword' Icon={LockClosedIcon} id='repeatPassword' name='repeatPassword' placeHolder='senha123' type='password'/>

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