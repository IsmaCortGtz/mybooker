import { apiURL } from '@/utils/API';
import "./styles.css";

export default function Cover ({ extensionId, bookId, title }) {
  return (
    <a className="cover-container" title={title} href={`/book/${extensionId}/${bookId}`} >
      <img loading="lazy" src={`${apiURL}/api/books/icon/${extensionId}/${bookId}`} alt={bookId} />
      <p>{title}</p>
    </a>
  );
};
