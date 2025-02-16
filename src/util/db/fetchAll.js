import db from "#i/util/db";

function fetchAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    try {
      const query = db.prepare(sql);
      const result =  query.all(...params);
      resolve(result);
    } catch(err) {
      reject(err);
    }
  });
}

export default fetchAll;