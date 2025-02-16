import fs from "node:fs";
import { pipeline } from "node:stream/promises";
import mime from "mime-types";
import dir from "#i/util/dir";

import booksList from "#f/util/db/books/list";
import dbAddBook from "#f/util/db/books/add";

import extensionRun from "#f/util/extensions/run";
import extensionActions from "#f/util/extensions/actions";

/**
 * List books in extension
 * @param {string} extensionId
 * @returns {Promise<Book[]>} Array of books or null if there was an error
 */
async function list(extensionId) {
  // Get book list from database
  const booksDb = await booksList(extensionId);
  if (Array.isArray(booksDb) && booksDb.length > 0) return booksDb;
  
  // Get book list from extension
  const books = await extensionRun(extensionId, extensionActions.LIST_BOOKS);
  if (!books) return null;

  // Save books to database
  for (const book of books) {
    await bookAdd(extensionId, book.id, book.title, book.cover, book.state, book.rate);
  }

  return books;
}




/**
 * Add a book to the library
 * @param {string} extensionId
 * @param {string} bookId
 * @param {string} title
 * @param {string} cover_url
 * @param {number} state 0 = Unknow, 1 = Ongoing, 2 = Completed, 3 = Paused
 * @param {number} rate
 * @returns {Promise<boolean>} True if the book was added successfully
 */
async function bookAdd(extensionId, bookId, title, cover_url, state, rate) {
  const response = await fetch(cover_url);
  if (!response.ok) throw new Error("Error downloading cover");

  // Create book folder
  fs.mkdirSync(dir.config.cache(extensionId, bookId), { recursive: true });

  // Save cover image
  const extension = mime.extension(response.headers.get("content-type"));
  const filename = `icon.${extension}`;
  const filepath = dir.config.cache(extensionId, bookId, filename);

  // Save in SQLite database
  const result = await dbAddBook(extensionId, bookId, title, filename, state, rate);
  if (!result) throw new Error("Error saving book data");

  await pipeline(response.body, fs.createWriteStream(filepath));
  return true;
}


export default list;
