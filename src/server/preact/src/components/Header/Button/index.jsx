import { useState, useEffect, useRef } from 'preact/hooks';
import Dropdown from "@/components/Dropdown";

import './styles.css';

export function Button({ Icon, title, href, onClick, dropdown = false, children }) {

  if (!dropdown) return (
    <a className="header-button" title={title} href={href} onClick={onClick} >
      {<Icon />}
    </a>
  );
  
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  }

  const handleClickOutside = (event) => {
    if (showDropdown && ref.current && !ref.current.contains(event.target)) {
      setShowDropdown(!showDropdown);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, !showDropdown);

    return () => {
      document.removeEventListener('click', handleClickOutside, !showDropdown);
    }
  });

  return (
    <div className="dropdown-button-container">
      <a 
        className="header-button" 
        title={title} 
        onClick={toggleDropdown} 
        ref={ref} 
      >
        {Icon && <Icon />}
      </a>
      
      { 
        showDropdown ? (
          <Dropdown>
            {children}
          </Dropdown>
        ) : null 
      }
    
    </div>
  );
}