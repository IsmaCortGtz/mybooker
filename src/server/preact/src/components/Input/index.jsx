import './styles.css';

export default function Input({ 
  label,
  name, 
  type = "text",
  required = false,
  placeholder,
  value,
  min,
  max,
  minLength,
  maxLength,
}) {
  return (
    <div className='input-component-container'>
      <label className='input-component-label' htmlFor={name} title={label}>
        {label}
        { required && <span className='input-component-required'>*</span> }
      </label>
      <input 
        className='input-component-input' 
        type={type} 
        name={name} 
        required={required} 
        title={label}
        placeholder={placeholder}
        value={value}
        min={min}
        max={max}
        minLength={minLength}
        maxLength={maxLength}
      />
    </div>
  );
}


export function Submit({ label, Icon }) {
  return (
    <button className='input-button-submit'>
      { Icon && <Icon className='input-button-icon' /> }
      { label || "Enviar" }
    </button>
  );
}