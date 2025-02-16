import fetchAll from '#f/util/db/fetchAll';

function list(extensionId) {
  return fetchAll(
    `SELECT remote_id AS id, extension_id, title, cover, state, rate
    FROM books WHERE extension_id = (
      SELECT id FROM extensions WHERE remote_id = ?
    ) ORDER BY title;`, 
    [extensionId]
  );
}

export default list;