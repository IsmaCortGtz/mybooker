import sqliteInit from '#l/util/db/init';

function init(db) {
  return sqliteInit(
    db,
    `CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY,
      extension_id INTEGER NOT NULL,
      remote_id TEXT NOT NULL,
      title TEXT NOT NULL,
      cover TEXT NOT NULL,
      state INTEGER NOT NULL,
      rate REAL NOT NULL,
      FOREIGN KEY (extension_id) REFERENCES extensions (id)
      ON DELETE CASCADE 
      ON UPDATE CASCADE,
      UNIQUE (extension_id, remote_id)
    );`
  );
}

export default init;