import './styles.css';

export default function Container({ children }) {
  return (
    <>
      <section className="extensions-container">
        {children}
      </section>
    </>
  );
}