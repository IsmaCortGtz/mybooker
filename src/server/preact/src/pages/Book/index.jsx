import { useState, useEffect, useRef } from 'preact/hooks';
import { Router, route } from 'preact-router';
import API from '@/utils/API';

import BookChapters from './Chapters';
import BookFiles from './Files';
import BookHeader from './Header';

import LoaderModal from '@/components/Loader/Modal';
import Modal from '@/components/Modal';
import Header from "@/components/Header";
import { Button } from "@/components/Header/Button";
import Dropdown from "@/components/Dropdown";
import Input, { Submit } from '@/components/Input';

import { Download, Book, Dots, SelectAll, Deselect } from '@/components/icons';

import './styles.css';

export default function BookPage({ pageTab, extensionId, bookId }) {

  const [loadingMessage, setLoadingMessage] = useState("Descargando contenido");
  const [bookInfo, setBookInfo] = useState({});
  const [bookContent, setBookContent] = useState([]);
  const [filesList, setFilesList] = useState([]);
  const [checkboxSelected, setCheckboxSelected] = useState([]);

  const loadingModal = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const showModal = setTimeout(() => {
      startLoadingModal("Descargando contenido");
    }, 50);

    API.get(`/books/list/${extensionId}/${bookId}`, (data) => {
      clearTimeout(showModal);
      setBookContent(data);
      loadingModal.current.close();
    });

    API.get(`/books/info/${extensionId}/${bookId}`, (data) => setBookInfo(data))
    API.get(`/files/list/${extensionId}/${bookId}`, (data) => setFilesList(data));
  }, []);


  const startLoadingModal = (message) => {
    if (message && message !== loadingMessage) setLoadingMessage(message);
    loadingModal.current.showModal();
  };



  const onCreateBook = async (event) => {
    event.preventDefault();
    const datos = {
      extensionId,
      bookId,
      volume: parseInt(event.target.number.value),
      title: event.target.title.value,
      language: event.target.language.value,
      creator: event.target.creator.value,
      date: event.target.date.value,
      firstChapterId: checkboxSelected[0].id,
      lastChapterId: checkboxSelected[1]?.id || checkboxSelected[0].id,
    }

    startLoadingModal("Creando libro");
    API.post("/files/add", datos, () => {
      loadingModal.current.close();
      modalRef.current.close();
      setCheckboxSelected([]);
      API.get(`/files/list/${extensionId}/${bookId}`, (data) => setFilesList(data));
    });
  };



  const chapterClick = (event, chapter) => {
    if (checkboxSelected.includes(chapter)) {
      const newCheckboxSelected = checkboxSelected.filter(n => n.db_id !== chapter.db_id);
      return setCheckboxSelected(newCheckboxSelected.toSorted((a, b) => a.db_id - b.db_id));
    }
    
    if (checkboxSelected.length < 2) {
      const newCheckboxSelected = [...checkboxSelected, chapter];
      return setCheckboxSelected(newCheckboxSelected.toSorted((a, b) => a.db_id - b.db_id));
    }

    if (chapter.db_id > checkboxSelected[1].db_id) {
      const newCheckboxSelected = [checkboxSelected[0], chapter];
      return setCheckboxSelected(newCheckboxSelected.toSorted((a, b) => a.db_id - b.db_id));
    }

    if (chapter.db_id < checkboxSelected[0].db_id) {
      const newCheckboxSelected = [chapter, checkboxSelected[1]];
      return setCheckboxSelected(newCheckboxSelected.toSorted((a, b) => a.db_id - b.db_id));
    }
    
    event.preventDefault();
  }


  return (
    <>
      <LoaderModal innerRef={loadingModal} message={loadingMessage} type='tiny' noClose  noEscape />
      <Modal innerRef={modalRef} title="Crear libro">
        <form onSubmit={onCreateBook}>
          <div className='ceate-book-cover-container'>
            <img
              class="create-book-cover"
              src={`${API.url}/books/icon/${extensionId}/${bookId}`}
              alt={bookInfo.id}
            />
            <div className='create-book-cover-inputs'>
              <Input label="Titulo" name="title" value={`${bookInfo.title} - Volumen 1`} required />
              <Input label="Numero" type='number' name="number" placeholder={"ex. 1"} value={1} required />
              <p className='create-book-chapters-info'>Usando capitulos '{checkboxSelected[0]?.title}' a '{checkboxSelected[1]?.title || checkboxSelected[0]?.title}'</p>
            </div>
          </div>
          <Input label="Idioma" name="language" placeholder={"ex. es-MX"} value="es" required />
          <Input label="Creador" name="creator" value={extensionId} required />
          <Input label="Fecha de publicación" type="date" name="date" value={(new Date()).toISOString().substring(0,10)} required />
          <Submit label="Crear libro" Icon={Book} />
        </form>
      </Modal>

      <Header goBack >
        <Button title="Acción" Icon={Dots} dropdown >
            <Dropdown.Item
              disabled={pageTab === "files"}
              Icon={SelectAll} 
              label="Seleccionar todo"
              onClick={() => {
                const lastVolume = bookContent[bookContent.length - 1];
                const lasChapterNumber = lastVolume.chapters[lastVolume.chapters.length - 1];
                setCheckboxSelected([ bookContent[0].chapters[0], lasChapterNumber ]);
              }}
            />
            <Dropdown.Item 
              disabled={checkboxSelected.length === 0 || pageTab === "files"} 
              Icon={Deselect} 
              label="Deseleccionar"
              onClick={() => setCheckboxSelected([])}
            />
            <Dropdown.Item 
              disabled={checkboxSelected.length === 0 || pageTab === "files" || true } 
              Icon={Download} 
              label="Descargar"
            />
            <Dropdown.Item 
              disabled={checkboxSelected.length === 0 || pageTab === "files" } 
              Icon={Book} 
              label="Crear libro" 
              onClick={() => modalRef.current.showModal()}
            />
        </Button>
      </Header>

      <main style={{ padding: "0" }}>
        <BookHeader extensionId={extensionId} bookId={bookId} bookInfo={bookInfo} />

        <div className='book-tab-container'>
          <a onClick={() => route(`/book/${extensionId}/${bookId}`, true)} className='book-tab-item' active={pageTab === ""} >Capitulos</a>
          <a onClick={() => route(`/book/${extensionId}/${bookId}/files`, true)} className='book-tab-item' active={pageTab === "files"} >
            Archivos
          </a>
        </div>

        <Router>
          <BookChapters path="/book/:extensionId/:bookId" bookContent={bookContent} checkboxSelected={checkboxSelected} chapterClick={chapterClick} />
          <BookFiles path="/book/:extensionId/:bookId/files" filesList={filesList} />
        </Router>
      </main>
    </>
  );
}
