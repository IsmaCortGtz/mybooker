import run from "#l/util/db/run";

function remove(extensionId) {
  return run(
    `DELETE FROM extensions WHERE remote_id = ?1;`, 
    [extensionId]
  );
}

export default remove;