import db from "#i/util/db";

function fetchOne(sql, params = []) {
  return new Promise((resolve, reject) => {
    try {
      const query = db.query(sql);
      const result =  query.get(params);
      resolve(result);
    } catch(err) {
      reject(err);
    }
  });
}

export default fetchOne;