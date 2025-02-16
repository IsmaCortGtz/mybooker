import { useState, useEffect } from 'preact/hooks';
import { apiURL } from '@/utils/API';

import Header from "@/components/Header";

import Container from "@/components/Extensions/Container";
import Cover from "@/components/Extensions/Cover";

export default function Extensions() {

  const [extensionsList, setExtensionsList] = useState([]);

  useEffect(() => {
    fetch(`${apiURL}/api/extensions/list`)
      .then((res) => res.json())
      .then((data) => setExtensionsList(data));
  }, []);

  return (
    <>
      <Header />
      <main>
        <h2>Extensiones</h2>

        <Container>
          {
            extensionsList.map((extension) => (
              <Cover 
                key={extension.id} 
                id={extension.id} 
                name={extension.name} 
                icon={extension.icon}
                background={extension.background}
                foreground={extension.foreground}
              />
            ))
          }
        </Container>

      </main>
    </>
  );
}
