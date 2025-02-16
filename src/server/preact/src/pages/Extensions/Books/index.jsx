import { useState, useEffect, useRef } from "preact/hooks";
import { apiURL } from "@/utils/API";

import Loader from '@/components/Loader';
import Modal from '@/components/Modal';
import Header from "@/components/Header";
import { Button } from "@/components/Header/Button";

import HomeIcon from "@/components/icons/Home";
import SettingsIcon from "@/components/icons/Settings";
import ExtensionsIcon from "@/components/icons/Extensions";
import DotsIcon from "@/components/icons/Dots";

import Container from "@/components/Books/Container";
import Cover from "@/components/Books/Cover";

import './styles.css';



export default function Extensions({ extensionId }) {

  const [extensionInfo, setExtensionInfo] = useState({});
  const [detailsStyle, setDetailsStyle] = useState("");
  const loadingModal = useRef(null);

  useEffect(() => {
    let style = "";
    if (extensionInfo.background) style += (`--background-color: ${extensionInfo.background};`);
    if (extensionInfo.foreground) style += (`color: ${extensionInfo.foreground};`);
    setDetailsStyle(style);
  }, [extensionInfo]);


  useEffect(() => {
    const showModal = setTimeout(() => {
      loadingModal.current.showModal();
    }, 50);

    fetch(`${apiURL}/api/extensions/info/${extensionId}`)
      .then((response) => response.json())
      .then((data) => setExtensionInfo(data));

    fetch(`${apiURL}/api/books/list/${extensionId}`)
      .then((response) => response.json())
      .then((data) => {
        clearTimeout(showModal);
        setBooksList(data);
        loadingModal.current.close();
      });
  }, []);
  
  const [booksList, setBooksList] = useState([]);
  
  return (
    <>
      <Modal innerRef={loadingModal} noClose noEscape title="Descargando contenido" type='tiny' >
        <Loader />
      </Modal>

      <Header goBack >
        <Button title="Más" Icon={DotsIcon} />
      </Header>

      <main style={{ padding: "0" }}>
        <section className="extension-books-header" style={detailsStyle}>
          { 
            extensionInfo.icon 
            ? <img src={`${apiURL}/api/extensions/icon/${extensionId}`} alt={extensionInfo.name}></img>
            : <h3>{extensionId}</h3>
          }
        </section>

        <Container>
          {booksList.map((book) => (
            <Cover
              key={book.id}
              extensionId={extensionId}
              bookId={book.id}
              title={book.title}
            />
          ))}
        </Container>
      </main>
    </>
  );
}
