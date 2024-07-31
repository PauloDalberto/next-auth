'use client';

import { ArrowLeftIcon, EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import './register.scss';
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
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  username: z.string().min(4, "O usuário deve ter pelo menos 4 caracteres!"),
  email: z.string().email("Digite um email válido!"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres!"),
  confirmPassword: z.string().min(6, "A senha deve ter pelo menos 6 caracteres!")
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não são iguais!",
  path: ["confirmPassword"]
});
;

type DataProps = z.infer<typeof schema>;

export default function Register() {
  const [showModal, setShowModal] = useState(false);

  const [
    createUserWithEmailAndPassword
  ] = useCreateUserWithEmailAndPassword(auth);

  const { register, handleSubmit, formState: { errors }} = useForm<DataProps>({
    mode: 'onBlur',
    resolver: zodResolver(schema)
  });

  async function handleForm(data: DataProps) {
    try {
      const success = await createUserWithEmailAndPassword(data.email, data.password);
      if (success) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 2000);
      } else {
        console.error("Erro");
      }
    } catch (e) {
      console.error("Erro criar user", e);
    }
  }

  return (
    <Container>
      <InfosContainer>
        <Link href={'/'} className='back-page'><ArrowLeftIcon width={24} height={24}/></Link>

        <h1 className='title'>Crie sua conta</h1>
        <p className='subtitle'>Insira seus dados para entrar na melhor loja de skins!</p>

        <form className='form' onSubmit={handleSubmit(handleForm)}>
          <label htmlFor="username">Nome de usuário</label>
          <Input id='username' placeholder='Nome' type='text' Icon={UserIcon} htmlFor='username' {...register('username')} helperText={errors.username?.message}/>

          <label htmlFor="email">Email</label>
          <Input id='email' placeholder='email@email.com' type='text' Icon={EnvelopeIcon} htmlFor='email' {...register('email')} helperText={errors.email?.message}/>

          <label htmlFor="password">Senha</label>
          <Input id='password'  placeholder='senha123' type='password' Icon={LockClosedIcon} htmlFor='password' {...register('password')} helperText={errors.password?.message}/>

          <label htmlFor="repeatPassword">Repita a senha</label>
          <Input id='repeatPassword'  placeholder='senha123' type='password' Icon={LockClosedIcon} htmlFor='repeatPassword' {...register('confirmPassword')} helperText={errors.confirmPassword?.message}/>

          <button type='submit' className='buttonRegister'>Registrar-se</button>
        </form>
      </InfosContainer>

      <div className='container-image'>
        <Image src="/image2.png" alt='skin de counter strike' width={10000} height={10000} className='image'/>
      </div>

      {showModal && <ModalSuccess />}
    </Container>
  );
}
