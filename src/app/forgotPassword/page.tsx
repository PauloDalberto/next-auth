import { ArrowLeftIcon, CheckCircleIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import InputWithIcon from "../components/inputIcon/inputIcon";
import Image from 'next/image';
import './forgotPassword.scss'
import Link from "next/link";

export default function ForgotPassword(){
  return(
    <div className='container'>
      <section className='register'>
        <Link href={'/'} className='back-page'><ArrowLeftIcon width={24} height={24}/></Link>

        <h1>Recuperar senha</h1>
        <p className='subtitle'>Insira seu email e iremos enviar sua nova senha!</p>

        <form className='form'>
          <label htmlFor="email">Senha</label>
          <InputWithIcon htmlFor='email' Icon={LockClosedIcon} id='email' name='email' placeHolder='email@email.com' type='text'/>

          <button type='submit' className='buttonRegister'>Enviar email</button>
        </form>
        
      </section>

      <div className='container-image'>
        <Image src="/image2.png" alt='skin de counter strike' width={10000} height={10000} className='image'/>
      </div>

    </div>

  )
}