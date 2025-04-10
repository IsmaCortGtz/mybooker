import { useState, useEffect } from 'preact/hooks';
import API from '@/utils/API';

import Header from "@/components/Header";

import Container from "@/components/Books/Container";
import Cover from "@/components/Books/Cover";

export default function Library() {


  const [booksList, setBooksList] = useState([]);

  useEffect(() => {
    fetch(`${API.url}/library/list/Default`)
      .then((res) => res.json())
      .then((data) => setBooksList(data));
  }, []);

  return (
    <>
      <Header />
      <main>
        <h2>Mi Biblioteca</h2>

        <Container>
          {booksList.map((book) => (
            <Cover
              key={book.id}
              extensionId={book.extension_id}
              bookId={book.id}
              title={book.title}
            />
          ))}
        </Container>
      </main>
    </>
  );
}
