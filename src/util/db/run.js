import db from "#i/util/db";

function run(sql, params = {}, database = null) {
  return new Promise((resolve, reject) => {
    try {
      db(database).query(sql).run(params);
      resolve(true);
    } catch(error) {
      reject(error);
    }
  });
}

export default run;