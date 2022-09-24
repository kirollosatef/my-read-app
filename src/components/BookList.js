import React, { Component } from "react";
import { PropTypes } from "prop-types";
import BookShelf from "./BookShelf";

export default class BookList extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired,
  };

  render() {
    const { books, onShelfChange } = this.props;
    const types = ["Currently Reading", "Want to Read", "Read"];

    return (
      <div className="list-books-content">
        <div>
          {types.map((category, index) => (
            <div className="bookshelf" key={index}>
              <h2 className="bookshelf-title">{category}</h2>
              <div className="bookshelf-books">
                <BookShelf
                  books={books.filter(
                    (b) =>
                      b.shelf.toLowerCase() ===
                      category.replace(/ /g, "").toLowerCase()
                  )}
                  onUpdateBookShelf={onShelfChange}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
