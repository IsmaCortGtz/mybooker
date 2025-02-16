import fetchOne from '#f/util/db/fetchOne';

async function getIcon(extensionId) {
  return (await fetchOne(
    "SELECT icon FROM extensions WHERE remote_id = @extensionId;", 
    { extensionId }
  ))["icon"];
}

export default getIcon;