function init(db, sql) {
  try {
    db.query(sql).run();
    return true;
  } catch (_) {
    return false;
  }
}

export default init;