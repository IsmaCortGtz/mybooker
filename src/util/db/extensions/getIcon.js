import fetchOne from '#f/util/db/fetchOne';

async function getIcon(extensionId) {
  return (await fetchOne(
    "SELECT icon FROM extensions WHERE remote_id = ?1;", 
    [extensionId]
  ))["icon"];
}

export default getIcon;