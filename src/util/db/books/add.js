import run from '#f/util/db/run';

function add(extensionId, bookId, title, cover, state, rate) {
  return run(
    `INSERT INTO books (extension_id, remote_id, title, cover, state, rate) VALUES 
    ((SELECT id FROM extensions WHERE remote_id = ?1), ?2, ?3, ?4, ?5, ?6);`, 
    [extensionId, bookId, title, cover, state, rate]
  );
}

export default add;