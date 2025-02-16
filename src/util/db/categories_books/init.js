import sqliteInit from '#f/util/db/init';

function init(db) {
  return sqliteInit(
    db,
    `CREATE TABLE IF NOT EXISTS categories_books (
      category_id INTEGER NOT NULL,
      extension_id Text NOT NULL,
      book_id Text NOT NULL,
      title Text NOT NULL,
      PRIMARY KEY (category_id, extension_id, book_id),
      FOREIGN KEY (category_id) REFERENCES categories (id)
      ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (extension_id) REFERENCES extensions (id)
      ON DELETE CASCADE ON UPDATE CASCADE
    );`
  );
}

export default init;