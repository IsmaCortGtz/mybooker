import sqliteInit from '#l/util/db/init';

function init(db) {
  return sqliteInit(
    db,
    `CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL UNIQUE
    );`
  )
  &&
  sqliteInit(
    db, 
    `INSERT INTO categories (id, name)
    SELECT 1, 'Default'
    WHERE NOT EXISTS (SELECT 1 FROM categories WHERE id = 1);`
  );
}

export default init;