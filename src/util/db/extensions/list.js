import fetchAll from "#l/util/db/fetchAll";

function list() {
  return fetchAll("SELECT remote_id AS id, name, background, foreground, icon FROM extensions;");
}

export default list;