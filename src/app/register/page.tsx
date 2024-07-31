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

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  username: z.string().min(3, "Por favor, informe um nome válido"),
  email: z.string().email("Digite um email valido")
})

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


  type DataProps = z.infer<typeof schema>

  const { register, handleSubmit, formState: { errors }} = useForm<DataProps>({
    mode: 'onBlur',
    resolver: zodResolver(schema)
  });

  const handleForm = (data: any) => {
    console.log(data)
  }

  return(
    <Container>
      <InfosContainer>
        <Link href={'/'} className='back-page'><ArrowLeftIcon width={24} height={24}/></Link>

        <h1 className='title'>Crie sua conta</h1>
        <p className='subtitle'>Insira seus dados para entrar na melhor loja de skins!</p>

        <form className='form' onSubmit={handleSubmit(handleForm)}>
          <label htmlFor="username">Nome de usuário</label>
          <Input id='username' placeholder='Nome' type='text' Icon={UserIcon} htmlFor='username' {...register('username')} helperText={errors.username?.message}/>

          <label htmlFor="email">Email</label>
          <Input id='email' placeholder='email@email.com' type='text' onChange={e => setEmail(e.target.value)} Icon={EnvelopeIcon} htmlFor='email' helperText={errors.username?.message}/>

          <label htmlFor="password">Senha</label>
          <Input id='password' name='password' placeholder='senha123' type='password' onChange={e => setPassword(e.target.value)} Icon={LockClosedIcon} htmlFor='password'/>

          <label htmlFor="repeatPassword">Repita a senha</label>
          <Input id='repeatPassword' name='repeatPassword' placeholder='senha123' type='password' Icon={LockClosedIcon} htmlFor='repeatPassword'/>

          <button onChange={handleSignOut} type='submit' className='buttonRegister'>Registrar-se</button>
        </form>
      </InfosContainer>

      <div className='container-image'>
        <Image src="/image2.png" alt='skin de counter strike' width={10000} height={10000} className='image'/>
      </div>

      {showModal && <ModalSuccess />}
    </Container>
  )
}