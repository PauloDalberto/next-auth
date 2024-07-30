import { forwardRef, InputHTMLAttributes } from "react"
import "./inputIcon.scss"

type Props = InputHTMLAttributes<HTMLInputElement>;

interface InputProps extends Props{
  Icon: React.ElementType
  htmlFor: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ type, name, Icon, htmlFor, ...props }, ref) => {
  return (
    <div className='input-container'>
      <label htmlFor={htmlFor}>
        <Icon className='icon' width={24} height={24}/>
      </label>
      <input 
        type={type} 
        name={name} 
        ref={ref}
        {...props}
      />
    </div>
   );
})
