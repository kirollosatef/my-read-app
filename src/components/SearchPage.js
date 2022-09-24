import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";
import BookShelf from "./BookShelf";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default class SearchPage extends Component {
  state = {
    query: "",
    searchBooks: [],
    showingBooks: [],
  };

  static propTypes = {
    onAddBookToShelf: PropTypes.func.isRequired,
  };

  updateQuery = (q) => {
    this.setState({ query: q });
    BooksAPI.search(q, 20).then((res) => {
      if (res.error) {
        this.setState({ searchBooks: [] });
      } else {
        this.setState({ searchBooks: res });
        this.updateShowingBooks(res);
      }
    });
  };

  setShelfNone = (books) => {
    let newBooks = books.map((b) => ({ ...b, shelf: "none" }));
    return newBooks;
  };

  makeUniqueArray = (books) => {
    return books.filter(
      (b, i) => books.findIndex((el) => el["id"] === b["id"]) === i
    );
  };

  updateShowingBooks = (srchBooks) => {
    const books = this.props.books;
    let showingBooks = srchBooks.map((b) => {
      let book = books.find((bk) => bk.id === b.id);
      if (book) {
        return book;
      } else {
        return b;
      }
    });
    this.setState({ showingBooks: showingBooks });
  };

  render() {
    const onSetSearchPage = this.props.onSetSearchPage;
    const onAddBookToShelf = this.props.onAddBookToShelf;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" onClick={onSetSearchPage}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={(event) => {
                  this.updateQuery(event.target.value);
                  this.makeUniqueArray(
                    this.props.books.concat(this.state.showingBooks)
                  );
                }}
              />
            }
          </div>
        </div>
        <div className="search-books-results">
          {this.state.showingBooks.length > 0 &&
            this.state.query.trim().length > 0 && (
              <BookShelf
                books={this.state.showingBooks}
                onUpdateBookShelf={onAddBookToShelf}
              />
            )}
        </div>
      </div>
    );
  }
}
