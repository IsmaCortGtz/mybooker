import sqliteInit from '#f/util/db/init';

function init(db) {
  return sqliteInit(
    db,
    `CREATE TABLE IF NOT EXISTS extensions (
      id INTEGER PRIMARY KEY,
      remote_id TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      background TEXT,
      foreground TEXT,
      icon TEXT
    );`
  );
}

export default init;