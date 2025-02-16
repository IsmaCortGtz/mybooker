import fetchAll from '#f/util/db/fetchAll';

function list() {
  return fetchAll("SELECT * FROM extensions;");
}

export default list;