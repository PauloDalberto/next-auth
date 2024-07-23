import { CheckCircleIcon } from "@heroicons/react/24/outline";
import './modalSucess.scss'

export default function ModalSuccess(){
  return(
    <section className="modal-container">
      <div className="modal">
        
        <div className="modal-text">
          <div className="title-icon">
            <h1>Login realizado com sucesso!</h1>
            <CheckCircleIcon width={28} height={28} color="green" />
          </div>
          <p>Você será redirecionado para a página agora!</p>
        </div>
      </div>
    </section>
  )
}