import { Button } from "@/components/Header/Button";
import IconLeft from "@/components/icons/Left";
import './styles.css';

export default function Header({ children, goBack = false }) {
  return (
    <header className='Header-Component'>
      { 
        goBack 
        ? <Button onClick={() => history.back()} Icon={IconLeft} title="Volver atrás" /> 
        : null 
      }
      <h1 className="Header-Component-title">MyBooker</h1>
      <div className="Header-Component-buttons-container">
        {children}
      </div>
    </header>
  );
}