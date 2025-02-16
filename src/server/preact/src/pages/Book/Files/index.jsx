import FilesItem from "@/components/Files";

import "./styles.css";

function BookFiles({ bookId }) {
  return (
    <div>
      <FilesItem title={`${bookId} - Volumen 1`} read />
      <FilesItem title={`${bookId} - Volumen 2`} />
      <FilesItem title={`${bookId} - Volumen 3`} />
    </div>
  );
}

export default BookFiles;
