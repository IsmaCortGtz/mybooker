import fetchOne from '#f/util/db/fetchOne';

async function getId(name) {
  const data = await fetchOne("SELECT id FROM categories WHERE name = ?;", [name]);
  return data.id || null;
}

export default getId;