import { useEffect, useState } from 'preact/hooks';
import { apiURL } from '@/utils/API';

import { Heart } from '@/components/icons';
import Rate from "@/components/Rate";

import './styles.css';

export default function BookHeader({ extensionId, bookId, bookInfo }) {
  const onAddToLibrary = () => {
    fetch(`${apiURL}/api/library/add/Default`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ extensionId, bookId })
    }).catch(err => console.error(err));
  };
  
  return (
    <header className="book-header">
      <img
        className="header-cover-background"
        src={`${apiURL}/api/books/icon/${extensionId}/${bookId}`}
        alt={bookId}
      />
      <article class="header-content-container">
        <img
          class="header-cover"
          src={`${apiURL}/api/books/icon/${extensionId}/${bookId}`}
          alt={bookId}
        />
        <div class="header-info-container">
          <h3 className="book-title">{bookInfo.title}</h3>
          <h5 className="extension-name">{extensionId}</h5>
          <p className="book-state">
            {bookInfo.state === 0
              ? "Desconocido"
              : bookInfo.state === 1
              ? "En progreso"
              : bookInfo.state === 2
              ? "Completado"
              : bookInfo.state === 3
              ? "En pausa"
              : "Desconocido"}
          </p>
          <Rate rate={bookInfo.rate || 0} />

          <button className="follow-button" onClick={onAddToLibrary}>
            <Heart />
            Agregar
          </button>
        </div>
      </article>
    </header>
  );
}