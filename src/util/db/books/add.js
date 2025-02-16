import run from '#f/util/db/run';

function add(extensionId, bookId, title, cover, state, rate) {
  return run(
    `INSERT INTO books (remote_id, title, cover, state, rate) VALUES 
    (@bookId, @title, @cover, @state, @rate);`, 
    { bookId, title, cover, state, rate },
    extensionId
  );
}

export default add;