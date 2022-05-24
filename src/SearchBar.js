import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookBox from "./BookBox";
import PropTypes from "prop-types";
export default class SearchBar extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  };
  state = {
    query: "",
  };
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
    }));
  };
  matching = (book, query) => {
    return (
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.authors.reduce(
        (pre, cur) => cur.toLowerCase().includes(query.toLowerCase()) || pre,
        false
      )
    );
  };
  render() {
    const { query } = this.state;
    const { books, onChangeShelf } = this.props;

    const showingBooks =
      query === "" ? [] : books.filter((book) => this.matching(book, query));
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
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
                onChangeShelf={(book, shelf) => onChangeShelf(book, shelf)}
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
