import db from "#l/util/db";

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    try {
      db.query(sql).run(params);
      resolve(true);
    } catch(error) {
      reject(error);
    }
  });
}

export default run;