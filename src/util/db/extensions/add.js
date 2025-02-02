import run from "#l/util/db/run";

function add(extensionId, name, background = null, foreground = null, icon = null) {
  return run(
    `INSERT INTO extensions (remote_id, name, background, foreground, icon) VALUES (?1, ?2, ?3, ?4, ?5);`, 
    [extensionId, name, background, foreground, icon]
  );
}

export default add;