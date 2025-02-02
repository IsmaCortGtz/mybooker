import './styles.css'

function BookChapters({ bookContent, checkboxSelected, chapterClick }) {

  const between = (current, chMin, chMax) => (
       current?.db_id >= chMin?.db_id 
    && current?.db_id <= chMax?.db_id 
    || current.db_id === chMin?.db_id
  );

  return (
    <section class="volumes-container">

      {bookContent.map((volume, volIdx) => (
        <details className="chapters-container" open={volIdx === 0}>
          <summary className="volume-title">{volume.title}</summary>
          
          {volume.chapters.map((chapter) => (
            <div className="chapter">
              <input
                type="checkbox"
                id={chapter.id}
                onClick={e => chapterClick(e, chapter)}
                checked={between(chapter, checkboxSelected[0], checkboxSelected[1])}
                className={
                  !checkboxSelected.includes(chapter)
                  ? "auto-selected" : "" 
                }
              />
              <label htmlFor={chapter.id}>{chapter.title}</label>
            </div>
          ))}

        </details>
      ))}

    </section>
  );
}

export default BookChapters;