import React, { Component } from "react";
import BookBox from "./BookBox";
export default class Bookshelf extends Component {
  render() {
    const { onChangeShelf, bookshelfTitle, books } = this.props;
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title"> {bookshelfTitle}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book) => (
                <BookBox
                  onChangeShelf={(book, shelf) => onChangeShelf(book, shelf)}
                  key={book.id}
                  book={book}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
