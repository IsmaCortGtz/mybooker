import fetchOne from '#f/util/db/fetchOne';

function getInfo(extensionId) {
  return fetchOne(
    `SELECT * FROM extensions 
    WHERE id = @extensionId;`,
    { extensionId }
  );
}

export default getInfo;