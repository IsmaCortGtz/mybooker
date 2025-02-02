import './styles.css';

export default function Container({ children }) {
  return (
    <section className="books-container">
      {children}
    </section>
  );
}