import sqliteInit from "#l/util/db/init";

function init(db) {
  return sqliteInit(
    db,
    `CREATE TABLE IF NOT EXISTS volumes (
      id INTEGER PRIMARY KEY,
      book_id INTEGER NOT NULL,
      remote_id TEXT NOT NULL,
      title TEXT NOT NULL,
      number TEXT NOT NULL,
      UNIQUE (book_id, remote_id),
      FOREIGN KEY (book_id) REFERENCES books (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
    );`
  );
}

export default init; 