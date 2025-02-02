import fetchOne from "#l/util/db/fetchOne";

function getInfo(extensionId) {
  return fetchOne(
    `SELECT  remote_id AS id, name, background, foreground, icon
    FROM extensions WHERE remote_id = ?1;`,
    [extensionId]
  );
}

export default getInfo;