import fetchAll from '#f/util/db/fetchAll';

function list(extensionId) {
  return fetchAll(
    `SELECT remote_id AS id, title, cover, state, rate
    FROM books ORDER BY title;`, 
    {},
    extensionId
  );
}

export default list;