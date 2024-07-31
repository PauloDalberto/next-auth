'use client'

import { ArrowLeftIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import {Input} from "../components/inputIcon/inputIcon";
import Image from 'next/image';
import './forgotPassword.scss'
import Link from "next/link";

import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from "../services/firebaseConfig";
import Container from "../components/container/container";
import InfosContainer from "../components/infos-container/infosContainer";

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email("Digite um email válido!"),
})

type DataProps = z.infer<typeof schema>;

export default function ForgotPassword(){
  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

  const { register, handleSubmit, formState: { errors }} = useForm<DataProps>({
    mode: 'onBlur',
    resolver: zodResolver(schema)
  });

  async function handleEmail(data: DataProps) {
    const success = await sendPasswordResetEmail(data.email);
    if (success) {
      alert('Sent email');
    }
  }

  return(
    <Container>
      <InfosContainer>
        <Link href={'/'} className='back-page'><ArrowLeftIcon width={24} height={24}/></Link>

        <h1 className="title">Recuperar senha</h1>
        <p className='subtitle'>Insira seu email e iremos enviar sua nova senha!</p>

        <form className='form' onSubmit={handleSubmit(handleEmail)}>
          <label htmlFor="email">Senha</label>
          <Input id='email' placeholder='email@email.com' type='text' htmlFor="email" {...register('email')} Icon={LockClosedIcon} helperText={errors.email?.message}/>

          <button type='submit' className='buttonRegister' >Enviar email</button>
        </form>
      </InfosContainer>

      <div className='container-image'>
        <Image src="/image2.png" alt='skin de counter strike' width={10000} height={10000} className='image'/>
      </div>
    </Container>
  )
}