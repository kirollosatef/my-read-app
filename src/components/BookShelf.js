import React, { Component } from "react";
import PropTypes from "prop-types";

export default class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired,
  };
  render() {
    const { books, onUpdateBookShelf } = this.props;
    return (
      <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${book.imageLinks.thumbnail})`,
                  }}
                ></div>
                <div className="book-shelf-changer">
                  <select
                    value={book.shelf.toLowerCase()}
                    onChange={(event) =>
                      onUpdateBookShelf(book, event.target.value)
                    }
                  >
                    <option value="none" disabled>
                      Move to...
                    </option>
                    <option value="currentlyreading">Currently Reading</option>
                    <option value="wanttoread">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">
                {book.authors.length > 1
                  ? book.authors.join(" ")
                  : book.authors}
              </div>
            </div>
          </li>
        ))}
      </ol>
    );
  }
}
