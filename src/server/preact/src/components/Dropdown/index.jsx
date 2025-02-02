import './styles.css';

function Dropdown({ children, innerRef }) {
  return (
    <div ref={innerRef} className="dropdown-content-container">
      {children}
    </div>
  );
}

function DropdownItem({ label, onClick, Icon, disabled }) {

  const handleClick = () => {
    if (disabled) return;
    onClick && onClick();
  }

  return (
    <a title={label} className="dropdown-item" onClick={handleClick} disabled={disabled} >
      { Icon && <Icon />}
      <span>{label}</span>
    </a>
  );
}

Dropdown.Item = DropdownItem;
export default Dropdown;