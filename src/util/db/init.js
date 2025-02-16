function init(db, sql) {
  return new Promise((resolve, _) => {
    try {
      db().query(sql).run();
      resolve(true);
    } catch (_) {
      resolve(false);
    }
  });
}

export default init;