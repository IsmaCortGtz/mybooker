import sqliteInit from "#l/util/db/init";

function init(db) {
  return sqliteInit(
    db,
    `CREATE TABLE IF NOT EXISTS categories_books (
      category_id INTEGER NOT NULL,
      book_id INTEGER NOT NULL,
      PRIMARY KEY (category_id, book_id),
      FOREIGN KEY (category_id) REFERENCES categories (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
      FOREIGN KEY (book_id) REFERENCES books (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
    );`
  );
}

export default init;