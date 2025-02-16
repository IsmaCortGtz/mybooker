# Información retornada por las extensiones

The SQLite database creates an internal ID for every table, so the only table that needs a completly unique id is the extensions table. There is no porblem if two books from different extensions have the same ID.

But books in same extension needs a completly unique ID.

## Books

For the list of all books. (When all books are listed the data is stored in SQLite, so for one book information data will be from this database).

```js
[
  {
    id: "internal-extension-book-id",
    title: "Book's name",
    cover: "https://example.com/public-books-cover-url.png",
    state: 0, // 0 = Unknow, 1 = Ongoing, 2 = Completed, 3 = Paused
    rate: 4.5 // Between 0 and 5
  },
  {...}
]
```

## Book chapters

Extensions and the app will return the whole content divided with volumes

```js
[ // Volumes ordered by number: 1, 2, 3, 3.1, ...
  {
    // Volume object
    id: "internal-extension-volume-id",
    title: "Volume title",
    number: "1" // String,
    chapters: [ // Chapters ordered by number: 1, 2, 2.1, 2.2, 3, ....
      {
        // Chapter Object
        id: "internal-extension-chapter-id",
        db_id: 1 // Integer - Unique in the whole chapters list (ordered)
        title: "Chapter title",
        number: "1", // String
        read: false, // If from extension always false
        downloaded: false // If content is already downloaded (for extensions always should be false).
      },
      {...}
    ]
  },
  {...}
]
```

## Chapter content

Extensions will return plain html for chapter content. The content will be displayed in EPUB files and reader. (The content must have the title).

```html
<h1>Chapter 25: title</h1>
<p>Text example</p>
<p>Text example 2</p>
```