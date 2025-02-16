import run from '#f/util/db/run';

function add(extensionId, bookId, title, cover, state, rate) {
  return run(
    `INSERT INTO books (extension_id, remote_id, title, cover, state, rate) VALUES 
    ((SELECT id FROM extensions WHERE remote_id = @extensionId), @bookId, @title, @cover, @state, @rate);`, 
    { extensionId, bookId, title, cover, state, rate }
  );
}

export default add;