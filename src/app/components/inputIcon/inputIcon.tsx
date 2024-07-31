import { forwardRef, InputHTMLAttributes } from "react";
import "./inputIcon.scss";

type Props = InputHTMLAttributes<HTMLInputElement>;

interface InputProps extends Props {
  Icon: React.ElementType;
  htmlFor: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, Icon, helperText, htmlFor, ...props }, ref) => {
    const inputClass = helperText ? "input error" : "input";

    return (
      <div className="input-container">
        <label htmlFor={htmlFor}>
          <Icon className="icon" width={24} height={24} />
        </label>
        <input 
          type={type} 
          name={name} 
          ref={ref} 
          className={inputClass} 
          {...props} 
        />
        <div className="errorMessage">{helperText}</div>
      </div>
    );
  }
);

Input.displayName = 'Input'; // Definindo o display name

export { Input };
