import { File, Checks } from "@/components/icons";
import "./styles.css";

function FilesItem({ title, read = false }) {
  return (
    <div className="book-files-item-container">
      <input type="checkbox" id={`booK-file-${title}`} className="book-files-item-checkbox" />
      <label htmlFor={`booK-file-${title}`} className="book-files-item-label">
        <File />
        <p className="book-files-item-title" >{title}</p>
        <Checks className={`book-files-item-read ${read ? 'read' : ""}`} title={read ? "Leído" : "No leído"} />
      </label>
    </div>
  );
}

export default FilesItem;
