import { Button } from '@/components/Header/Button';
import { Close } from '@/components/icons';
import './styles.css';

const modalStyles = {
  large: { width: '90%', height: '90%' },
  medium: { width: '50%', height: '50%' },
  small: { width: '30%', height: '30%' },
  tiny: { maxWidth: '350px' }
}

const titleStyles = {
  large: { fontSize: '2rem' },
  medium: { fontSize: '1.5rem' },
  small: { fontSize: '1rem' },
  tiny: { fontSize: '0.9rem' }
}

export default function Modal({ innerRef, title, type = 'large', children, noClose, noEscape }) {
  
  const closeModal = () => {
    if (noClose) return;
    innerRef.current.close();
  };

  const handleEscape = (event) => {
    if (!noEscape) return;
    event.preventDefault();
  }

  return (
    <dialog ref={innerRef} className="modal" style={modalStyles[type]} onCancel={handleEscape}>
      <header className='modal-header-container'>
        <h2 className='modal-header-title' style={titleStyles[type]}>{title}</h2>
        { !noClose && <Button title="Extensiones" onClick={closeModal} Icon={Close} /> }
      </header>
      {children}
    </dialog>
  );
}
