import { randomUUID } from "node:crypto";
import AdmZip from "adm-zip";
import dir from "#l/util/dir";

import text from './src/template';
import createOPF from "./src/opf";
import createNCX from "./src/ncx";
import createTable from "./src/tableOfContent";

const CONTAINER_XML = `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
    <rootfiles>
        <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
   </rootfiles>
</container>
`;


export default class EPUB {
  constructor() {
    this.zip = new AdmZip();
    this.zip.addFile("mimetype", Buffer.from("application/epub+zip"));
    this.zip.addFile("META-INF/container.xml", Buffer.from(CONTAINER_XML));
    this.zip.addLocalFolder(dir.src.util("epub", "templates", "Styles"), "OEBPS/Styles");
  }


  setMeta(metadata) {
    if (!metadata) throw new Error("Metadata is required");
    if (!metadata.title) throw new Error("Title is required");
    if (!metadata.number) throw new Error("Number is required");
    if (!metadata.language) throw new Error("Language is required");
    if (!metadata.creator) throw new Error("Creator is required");
    if (!metadata.date) throw new Error("Date is required");
    this.metadata = metadata;
    if (!metadata.identifier) this.metadata.identifier = randomUUID();
    this.metadata.chapters = [];
  }


  setCover(coverBuffer, name) {
    if (!coverBuffer) throw new Error("Cover is required");
    this.metadata.cover = name;
    const templateData = [
      { template_name: "title", value: this.metadata.title },
      { template_name: "content", value: `<div class="cover"><img class="cover-img" src="../Images/${name}" alt="${this.metadata.title}" /></div>` }
    ];

    this.zip.addFile(`OEBPS/Text/cover.html`, Buffer.from(text(templateData, "COVER")));
    this.zip.addFile(`OEBPS/Images/${name}`, coverBuffer);
  }


  addChapter(chapter) {
    if (!this.metadata.chapters) throw new Error("Metadata is required");
    if (!chapter) throw new Error("Chapter is required");
    if (!chapter.id) throw new Error("Chapter ID is required");
    if (!chapter.title) throw new Error("Chapter title is required");
    if (!chapter.number) throw new Error("Chapter number is required");
    if (!chapter.content) throw new Error("Chapter content is required");
    
    this.metadata.chapters.push({
      id: chapter.id,
      title: chapter.title,
      number: chapter.number
    });

    const templateData = [
      { template_name: "title", value: chapter.title },
      { template_name: "content", value: chapter.content }
    ];
    
    this.zip.addFile(`OEBPS/Text/${chapter.id}.html`, Buffer.from(text(templateData)));
  }

  save(path) {
    this.zip.addFile(`OEBPS/content.opf`, Buffer.from(createOPF(this.metadata)));
    this.zip.addFile(`OEBPS/toc.ncx`, Buffer.from(createNCX(this.metadata)));
    this.zip.addFile(`OEBPS/Text/table_of_content.html`, Buffer.from(createTable(this.metadata)));

    const zipPath = dir.config("out", `${this.metadata.title}.epub`);
    this.zip.writeZip(path || zipPath);
  }
}