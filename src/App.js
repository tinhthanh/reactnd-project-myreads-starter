import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBar from "./SearchBar";
import { Routes, Route } from "react-router-dom";
import ShelfList from "./ShelfList";
class BooksApp extends React.Component {
  state = {
    books: [],
  };
  loading = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  };
  back = () => {
    this.loading();
  };
  componentDidMount() {
    this.loading();
  }
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
    return (
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <ShelfList
                onChangeShelf={(book, shelf) => this.onChangeShelf(book, shelf)}
                books={this.state.books}
              />
            }
          />
          <Route path="/search" element={<SearchBar back={this.back} />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>Page not found!</p>
              </main>
            }
          />
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
