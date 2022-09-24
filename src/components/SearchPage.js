import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";
import BookShelf from "./BookShelf";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default class SearchPage extends Component {
  state = {
    query: "",
    duplicateBooks: [],
    shBooks: [],
  };

  static propTypes = {
    onShelfChange: PropTypes.func.isRequired,
  };

  updateQuery = (q) => {
    this.setState({ query: q });
    BooksAPI.search(q, 20).then((res) => {
      if (res.error) {
        this.setState({ duplicateBooks: [] });
      } else {
        this.setState({ duplicateBooks: res });
        this.showingBooks(res);
      }
    });
  };

  handleNoneShelf = (books) => {
    let newBooks = books.map((b) => ({ ...b, shelf: "none" }));
    return newBooks;
  };

  makeUniqueBooks = (books) => {
    return books.filter(
      (b, i) => books.findIndex((el) => el["id"] === b["id"]) === i
    );
  };

  showingBooks = (shBooks) => {
    let books = this.props.books;
    let uniqueBooks = this.makeUniqueBooks([...shBooks, ...books]);
    this.setState({ shBooks: uniqueBooks });
  };

  render() {
    const onShelfChange = this.props.onShelfChange;
    const onSearchPage = this.props.onSearchPage;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" onClick={onSearchPage}>
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
                    this.props.books.concat(this.state.shBooks)
                  );
                }}
              />
            }
          </div>
        </div>
        <div className="search-books-results">
          {this.state.shBooks.length > 0 &&
            this.state.query.trim().length > 0 && (
              <BookShelf
                books={this.state.shBooks}
                onUpdateBookShelf={onShelfChange}
              />
            )}
        </div>
      </div>
    );
  }
}
