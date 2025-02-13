import fetchOne from "#l/util/db/fetchOne";

async function getId(name) {
  const data = await fetchOne("SELECT id FROM categories WHERE name = ?1;", [name]);
  return data.id || null;
}

export default getId;