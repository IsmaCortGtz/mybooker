import run from '#f/util/db/run';

function remove(extensionId) {
  return run(
    `DELETE FROM extensions WHERE remote_id = ?;`, 
    [extensionId]
  );
}

export default remove;