import fetchOne from '#f/util/db/fetchOne';

async function getIcon(extensionId) {
  return (await fetchOne(
    "SELECT icon FROM extensions WHERE id = @extensionId;", 
    { extensionId }
  ))["icon"];
}

export default getIcon;