import run from '#f/util/db/run';

function add(extensionId, name, background = null, foreground = null, icon = null) {
  return run(
    `INSERT INTO extensions (id, name, background, foreground, icon) VALUES (@extensionId, @name, @background, @foreground, @icon);`, 
    { extensionId, name, background, foreground, icon }
  );
}

export default add;