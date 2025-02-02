import sqliteInit from "#l/util/db/init";

function init(db) {
  return sqliteInit(
    db,
    `CREATE TABLE IF NOT EXISTS chapters (
      id INTEGER PRIMARY KEY,
      volume_id INTEGER NOT NULL,
      remote_id TEXT NOT NULL,
      title TEXT NOT NULL,
      number TEXT NOT NULL,
      content TEXT,
      read INTEGER NOT NULL,
      UNIQUE (volume_id, remote_id),
      FOREIGN KEY (volume_id) REFERENCES volumes (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
    );`
  );
}

export default init;