import List from "@/components/List";
import Item from "@/components/List/Item";
import { File } from "@/components/icons";

import "./styles.css";

function BookFiles({ filesList }) {
  return (
    <List>
      {filesList.map((file) => (
        <Item id={file.id} icon={File} title={file.title} />
      ))}
    </List>
  );
}

export default BookFiles;
