import run from '#f/util/db/run';

function remove(extensionId) {
  return run(
    `DELETE FROM extensions WHERE id = @extensionId;`, 
    { extensionId }
  );
}

export default remove;