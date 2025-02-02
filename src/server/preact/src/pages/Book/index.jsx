import { useState, useEffect, useRef } from 'preact/hooks';
import { apiURL, post } from '@/utils/API';

import BookChapters from './Chapters';
import BookHeader from './Header';

import Loader from '@/components/Loader';
import LoaderModal from '@/components/Loader/Modal';
import Modal from '@/components/Modal';
import Header from "@/components/Header";
import { Button } from "@/components/Header/Button";
import Dropdown from "@/components/Dropdown";
import Input, { Submit } from '@/components/Input';

import { Download, Book, Dots, Extensions, Settings, Home, SelectAll, Deselect } from '@/components/icons';

import './styles.css';

export default function SettingsPage({ extensionId, bookId }) {

  const [loadingMessage, setLoadingMessage] = useState("Descargando contenido");
  const [bookInfo, setBookInfo] = useState({});
  const [bookContent, setBookContent] = useState([]);
  const [checkboxSelected, setCheckboxSelected] = useState([]);

  const loadingModal = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const showModal = setTimeout(() => {
      startLoadingModal("Descargando contenido");
    }, 50);

    fetch(`${apiURL}/api/books/list/${extensionId}/${bookId}`)
      .then(res => res.json())
      .then(data => {
        clearTimeout(showModal);
        console.log(data);
        setBookContent(data);
        loadingModal.current.close();
      });

    fetch(`${apiURL}/api/books/info/${extensionId}/${bookId}`)
      .then(res => res.json())
      .then(data => setBookInfo(data));
  }, []);


  const startLoadingModal = (message) => {
    if (message && message !== loadingMessage) setLoadingMessage(message);
    loadingModal.current.showModal();
  };



  const onCreateBook = (event) => {
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
    post("/api/files/add", datos).then(() => {
      loadingModal.current.close();
      modalRef.current.close();
      setCheckboxSelected([]);
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
      <LoaderModal 
        innerRef={loadingModal} 
        message={loadingMessage} 
        type='tiny'
        noClose 
        noEscape  
      />
      
      <Header goBack >
        <Button title="Mi Biblioteca" href="/" Icon={Home} />
        <Button title="Extensiones" href="/extensions" Icon={Extensions} />
        <Button title="Ajustes" href="/settings" Icon={Settings} />
        <Button title="Acción" Icon={Dots} dropdown >
            <Dropdown.Item 
              Icon={SelectAll} 
              label="Seleccionar todo"
              onClick={() => {
                const lastVolume = bookContent[bookContent.length - 1];
                const lasChapterNumber = lastVolume.chapters[lastVolume.chapters.length - 1];
                setCheckboxSelected([ bookContent[0].chapters[0], lasChapterNumber ]);
              }}
            />
            <Dropdown.Item 
              disabled={checkboxSelected.length === 0} 
              Icon={Deselect} 
              label="Deseleccionar"
              onClick={() => setCheckboxSelected([])}
            />
            <Dropdown.Item 
              disabled={checkboxSelected.length === 0 || true} 
              Icon={Download} 
              label="Descargar"
            />
            <Dropdown.Item 
              disabled={checkboxSelected.length === 0} 
              Icon={Book} 
              label="Crear libro" 
              onClick={() => modalRef.current.showModal()}
            />
        </Button>
      </Header>

      <Modal innerRef={modalRef} title="Crear libro">
        <form onSubmit={onCreateBook}>
          <div className='ceate-book-cover-container'>
            <img
              class="create-book-cover"
              src={`${apiURL}/api/books/icon/${extensionId}/${bookId}`}
              alt={bookInfo.id}
            />
            <div className='create-book-cover-inputs'>
              <Input label="Titulo" name="title" value={bookInfo.title} required />
              <Input label="Numero" type='number' name="number" placeholder={"ex. 1"} value={1} required />
              {
                checkboxSelected.length === 2
                  ? (
                    <p className='create-book-chapters-info'>
                      Usando capitulos '{checkboxSelected[0]?.title}' a '{checkboxSelected[1]?.title}'
                    </p>
                  ) : (
                    <p className='create-book-chapters-info'>
                      Usando capitulo '{checkboxSelected[0]?.title}'
                    </p>
                  )
              }
              
                
              
            </div>
          </div>
          <Input label="Idioma" name="language" placeholder={"ex. es-MX"} value="es" required />
          <Input label="Creador" name="creator" value={extensionId} required />
          <Input label="Fecha de publicación" type="date" name="date" value={(new Date()).toISOString().substring(0,10)} required />
          <Submit label="Crear libro" Icon={Book} />
        </form>
      </Modal>

      <main style={{ padding: "0" }}>
        <BookHeader extensionId={extensionId} bookId={bookId} bookInfo={bookInfo} />

        <div className='book-tab-container'>
          <p className='book-tab-item' active >Capitulos</p>
          <p className='book-tab-item'>
            Archivos
          </p>
        </div>

        <BookChapters bookContent={bookContent} checkboxSelected={checkboxSelected} chapterClick={chapterClick} />
      </main>
    </>
  );
}
