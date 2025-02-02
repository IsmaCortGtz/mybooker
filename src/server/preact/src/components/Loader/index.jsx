import './styles.css';

export default function Loader({ size = "25px" }) {
  return (
    <span 
      className="loader-container-1" 
      style={{ "--loader-container-1-size": size }} 
    />
  )
}