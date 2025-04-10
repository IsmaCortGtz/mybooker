import List from "@/components/List";
import Item from "@/components/List/Item";
import { Chapter, Download, Checks } from "@/components/icons";
import "./styles.css";

function BookChapters({ bookContent, checkboxSelected, chapterClick }) {
  const between = (current, chMin, chMax) =>
    (current?.db_id >= chMin?.db_id && current?.db_id <= chMax?.db_id) ||
    current.db_id === chMin?.db_id;

  return (
    <List>
      {bookContent.map((volume, volIdx) => (
        <Item.Group
          key={volume.id}
          title={volume.title} 
          open={volIdx === 0}
        >
          {volume.chapters.map((chapter) => (
            <Item
              key={chapter.id}
              title={chapter.title}
              id={chapter.id}
              icon={Chapter}
              onClick={(e) => chapterClick(e, chapter)}
              checked={between(
                chapter,
                checkboxSelected[0],
                checkboxSelected[1]
              )}
              autoSelected={!checkboxSelected.includes(chapter)}
            >
              <Item.State icon={Download} title={chapter.downloaded ? "Descargado" : "No descargado"} active={chapter.downloaded} />
              <Item.State icon={Checks} title={chapter.read ? "Leído" : "No leído"} active={chapter.read} />
            </Item>
          ))}
        </Item.Group>
      ))}
    </List>
  );
}

export default BookChapters;
