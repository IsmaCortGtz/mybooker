import db from "#i/util/db";

function fetchAll(sql, params = {}, database = null) {
  return new Promise((resolve, reject) => {
    try {
      const query = db(database).query(sql);
      const result =  query.all(params);
      resolve(result);
    } catch(err) {
      reject(err);
    }
  });
}

export default fetchAll;