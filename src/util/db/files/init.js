import sqliteInit from "#f/util/db/init";

function init(db) {
  return sqliteInit(
    db,
    `CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY,
      volume REAL NOT NULL,
      book_id INTEGER NOT NULL,
      identifier TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      language TEXT NOT NULL,
      creator TEXT NOT NULL,
      date TEXT NOT NULL,
      cover TEXT,
      first_chapter_id INTEGER NOT NULL,
      last_chapter_id INTEGER NOT NULL,
      FOREIGN KEY (book_id) REFERENCES books (id)
      ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (first_chapter_id) REFERENCES chapters (id)
      ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (last_chapter_id) REFERENCES chapters (id)
      ON DELETE CASCADE ON UPDATE CASCADE
    );`
  );
}

export default init;
