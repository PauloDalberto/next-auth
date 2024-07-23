import "./inputIcon.scss"

interface InputIconsProps{
  htmlFor: string
  Icon: React.ElementType
  placeHolder: string
  name: string
  id: string
  type: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputWithIcon({ htmlFor, Icon, placeHolder, name, id, type, onChange }: InputIconsProps) {  
 return (
  <div className='input-container'>
    <label htmlFor={htmlFor}>
      <Icon className='icon' width={24} height={24}/>
    </label>
    <input type={type} name={name} id={id} placeholder={placeHolder} onChange={onChange}/>
  </div>
 );
}