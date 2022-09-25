import React from "react";
import { Route } from "react-router-dom";
import BooksList from "./components/BooksList";
import BooksSearch from "./components/BooksSearch";
import BooksSearchPage from "./components/BooksSearchPage";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class App extends React.Component {
  state = {
    books: [],
    showSearchPage: false,
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  toCamelShelf(Shelf) {
    let shelf = Shelf;
    Shelf === "currentlyreading" && (shelf = "currentlyReading");
    Shelf === "wanttoread" && (shelf = "wantToRead");
    return shelf;
  }

  updateBookShelf = (book, shelf) => {
    shelf = this.toCamelShelf(shelf);
    BooksAPI.update(book, shelf).then(() => {
      this.setState((state) => ({
        books: state.books.map((bk) =>
          bk.id === book.id ? { ...bk, shelf: shelf } : bk
        ),
      }));
    });
  };

  addBookToShelf = (book, shelf) => {
    shelf = this.toCamelShelf(shelf);
    book.shelf = shelf;
    let idx = this.state.books.findIndex((bk) => bk["id"] === book.id);
    let bk = this.state.books;
    if (idx === -1) {
      this.setState({ books: bk.concat(book) });
      this.updateBookShelf(book, shelf);
    }
  };

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Route
            path="/search"
            render={({ history }) => (
              <BooksSearchPage
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
                <BooksList
                  books={this.state.books}
                  onUpdateBookShelf={this.updateBookShelf}
                />
                <BooksSearch
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

export default App;
