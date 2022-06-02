import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookBox from "./BookBox";
import * as BooksAPI from "./BooksAPI";
export default class SearchBar extends Component {
  state = {
    query: "",
    books: [],
  };
  updateQuery = (query) => {
    BooksAPI.search(query).then((books) => {
      if (books instanceof Array) {
        this.setState(() => ({
          query,
          books: books.sort((a, b) =>
            (a.title || "").localeCompare(b.title || "")
          ),
        }));
      } else {
        this.setState(() => ({
          books: [],
        }));
      }
    });
  };

  onChangeShelf = (book, shelf) => {
    this.setState((currentState) => ({
      books: currentState.books
        .filter((b) => {
          return b.id !== book.id;
        })
        .concat([{ ...book, shelf: shelf }]),
    }));
    BooksAPI.update(book, shelf);
  };
  render() {
    const { query, books } = this.state;
    const { back } = this.props;
    const showingBooks = query === "" ? [] : books;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" onClick={() => back()}>
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              onChange={(event) => this.updateQuery(event.target.value)}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks.map((book) => (
              <BookBox
                onChangeShelf={(book, shelf) => this.onChangeShelf(book, shelf)}
                key={book.id}
                book={book}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
