import React, { Component } from "react";
import Bookshelf from "./Bookshelf";
import { Link } from "react-router-dom";
export default class ShelfList extends Component {
  render() {
    const shelfBooks = this.props.books.reduce((cur, pre) => {
      cur[pre.shelf] = [...(cur[pre.shelf] || []), pre];
      return cur;
    }, {});
    const { onChangeShelf } = this.props;
    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <Bookshelf
              onChangeShelf={(book, shelf) => onChangeShelf(book, shelf)}
              bookshelfTitle="Currently Reading"
              books={shelfBooks.currentlyReading || []}
            />
            <Bookshelf
              onChangeShelf={(book, shelf) => onChangeShelf(book, shelf)}
              bookshelfTitle="Want to Read"
              books={shelfBooks.wantToRead || []}
            />
            <Bookshelf
              onChangeShelf={(book, shelf) => onChangeShelf(book, shelf)}
              bookshelfTitle="Read"
              books={shelfBooks.read || []}
            />
            <Bookshelf
              onChangeShelf={(book, shelf) => onChangeShelf(book, shelf)}
              bookshelfTitle="None"
              books={shelfBooks.None || []}
            />
          </div>
          <div className="open-search">
            <Link to="/search">
              <button>Add a book</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
