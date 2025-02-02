import Header from '@/components/Header';
import { Button } from '@/components/Header/Button';

import HomeIcon from '@/components/icons/Home';
import SettingsIcon from '@/components/icons/Settings';
import ExtensionsIcon from '@/components/icons/Extensions';

export default function Settings() {
  return (
    <>
        <Header>
          <Button title="Mi Biblioteca" href="/" Icon={HomeIcon} />
          <Button title="Extensiones" href="/extensions" Icon={ExtensionsIcon} />
          <Button title="Ajustes" Icon={SettingsIcon} />
        </Header>

        <main>
          <h2>Ajustes</h2>
        </main>
    </>
  );
}