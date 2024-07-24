import './infosContainer.scss';

interface InfosContainerProps {
  children: React.ReactNode
}

export default function InfosContainer({ children }: InfosContainerProps){
  return(
    <div className="infos-container">
      {children}
    </div>  
  )
}