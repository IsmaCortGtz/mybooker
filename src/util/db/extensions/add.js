import run from '#f/util/db/run';

function add(extensionId, name, background = null, foreground = null, icon = null) {
  return run(
    `INSERT INTO extensions (remote_id, name, background, foreground, icon) VALUES (?, ?, ?, ?, ?);`, 
    [extensionId, name, background, foreground, icon]
  );
}

export default add;