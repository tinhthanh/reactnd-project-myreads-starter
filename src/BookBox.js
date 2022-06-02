import React, { Component } from "react";
import PropTypes from "prop-types";
export default class BookBox extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  };
  render() {
    const { book, onChangeShelf } = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: book.imageLinks
                  ? `url(${book.imageLinks.thumbnail || "none"})`
                  : "none",
              }}
            />
            <div className="book-shelf-changer">
              <select
                onChange={(event) => onChangeShelf(book, event.target.value)}
                value={book.shelf ? book.shelf : "none"}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title ? book.title : ""}</div>
          {(book.authors || []).map((author) => (
            <div key={author} className="book-authors">
              {author}
            </div>
          ))}
        </div>
      </li>
    );
  }
}
