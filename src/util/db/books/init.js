import sqliteInit from '#f/util/db/init';

function init(db) {
  return sqliteInit(
    db,
    `CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY,
      remote_id TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      cover TEXT NOT NULL,
      state INTEGER NOT NULL,
      rate REAL NOT NULL
    );`
  );
}

export default init;