import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";
import BooksShelf from "./BooksShelf";
import PropTypes from "prop-types";

export class BooksSearchPage extends Component {
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
    setTimeout(() => {
      BooksAPI.search(q, 20).then((res) => {
        this.setState({ searchBooks: res });
        this.updateShowingBooks(res);
      });
    }, 200);
  };

  setShelfNone = (arr) => {
    let newArray = arr.map((obj) => ({ ...obj, shelf: "none" }));
    return newArray;
  };

  makeUniqueArray = (arr) => {
    return arr.filter(
      (el, index) => arr.findIndex((a) => a["id"] === el["id"]) === index
    );
  };

  updateShowingBooks = (srchBooks) => {
    if (srchBooks.length > 0 && this.state.query.trim().length > 0) {
      if (srchBooks[0].hasOwnProperty("shelf")) {
        this.setState({ showingBooks: srchBooks });
      } else {
        this.setState({
          showingBooks: this.setShelfNone(srchBooks),
        });
      }
    }
  };

  render() {
    const onSetSearchPage = this.props.onSetSearchPage;
    const onAddBookToShelf = this.props.onAddBookToShelf;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={onSetSearchPage}>
            Close
          </a>
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
              <BooksShelf
                books={this.state.showingBooks}
                onUpdateBookShelf={onAddBookToShelf}
              />
            )}
        </div>
      </div>
    );
  }
}

export default BooksSearchPage;
