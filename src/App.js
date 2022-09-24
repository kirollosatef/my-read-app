import React from "react";
import { Route } from "react-router-dom";
import BookList from "./components/SearchPage";
import BookSearch from "./components/BookSearch";
import SearchPage from "./components/SearchPage";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

export default class App extends React.Component {
  state = {
    books: [],
    showSearchPage: false,
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  toCamelShelf(s) {
    let shelf = s;
    s === "currentlyreading" && (shelf = "currentlyReading");
    s === "wanttoread" && (shelf = "wantToRead");
    return shelf;
  }

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      book.shelf = this.toCamelShelf(shelf);
      this.setState((state) => ({
        books: state.books.filter((b) => b.id !== book.id).concat([book]),
      }));
    });
  };

  addBookToShelf = (book, shelf) => {
    shelf = this.toCamelShelf(shelf);
    book.shelf = shelf;
    const books = this.state.books;
    const id = books.findIndex((b) => b.id === book.id);
    if (id === -1) {
      this.setState({
        books: books.concat([book]),
      });
      this.onShelfChange(book, shelf);
    }
  };

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Route
            path="/search"
            render={({ history }) => (
              <SearchPage
                books={this.state.books}
                onSetSearchPage={() => {
                  this.setState({ showSearchPage: false });
                  history.push("/");
                }}
                onAddBookToShelf={this.addBookToShelf}
              />
            )}
          />
        ) : (
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>My Reads</h1>
                </div>
                <BookList
                  books={this.state.books}
                  onUpdateBookShelf={this.updateBookShelf}
                />
                <BookSearch
                  onSetSearchPage={() =>
                    this.setState({ showSearchPage: true })
                  }
                />
              </div>
            )}
          />
        )}
      </div>
    );
  }
}
