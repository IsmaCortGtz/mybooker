import { execFileSync } from 'child_process';

const commands = () => {
  switch (process.platform) {
    case 'android':
    case 'linux':
      return ['xdg-open'];
    case 'darwin':
      return ['open'];
    case 'win32':
      return ['cmd', ['/c', 'start']];
    default:
      throw new Error(`Platform isn't supported.`);
  }
};

async function browser(url) {
  const [command, args = []] = commands();
  execFileSync(command, [...args, encodeURI(url)]);
}

export default browser;