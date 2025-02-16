import dir from '#i/util/dir';

async function info(id) {
  try {
    return await import(dir.extensions(id, 'extension.json'), { assert: { type: 'json' } });
  } catch(e) { return null }
}

export default info;