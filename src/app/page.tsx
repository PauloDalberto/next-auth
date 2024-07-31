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

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email("Digite um email válido!"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres!"),
})

type DataProps = z.infer<typeof schema>;

export default function Home() {
  const [
    signInWithEmailAndPassword,
  ] = useSignInWithEmailAndPassword(auth);
  
  const { register, handleSubmit, formState: { errors }} = useForm<DataProps>({
    mode: 'onBlur',
    resolver: zodResolver(schema)
  });
  
  const [showModal, setShowModal] = useState(false);

  async function handleSignIn(data: DataProps){
    try {
      const success = await signInWithEmailAndPassword(data.email, data.password);
      if (success) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 2000); 
      }
    }
    catch (e){
      console.log("Erro:", e);
    }
  }

  return (
    <Container>
      <InfosContainer>
        <h1 className='title'>Bem vindo de volta!</h1>
        <p className='subtitle'>Insira suas informações para prosseguir para o site!</p>

        <form className='form' onSubmit={handleSubmit(handleSignIn)}>
          <label htmlFor="email">Email</label>
          <Input id='email' placeholder='email@email.com' type='text' Icon={EnvelopeIcon} htmlFor='email' {...register('email')} helperText={errors.email?.message}/>
          
          <label htmlFor="password">Senha</label>
          <Input id='password' placeholder='senha123' type='password' Icon={LockClosedIcon} htmlFor='password'  {...register('password')} helperText={errors.password?.message}/>

          <button type='submit' className='buttonLogin'>Entrar</button>
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
