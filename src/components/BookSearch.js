import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class BookSearch extends Component {
  render() {
    return (
      <div className="open-search">
        <Link to="/search" onChange={this.props.onSearchPageChange}>
          Add a book
        </Link>
      </div>
    );
  }
}
