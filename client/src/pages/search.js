import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import { List, ListItem } from "../components/List";
import SaveBtn from "../components/SaveBtn";

class Search extends Component {
  state = {
    books: [],
    title: "",
    searchMessage:"No books to display. Enter a book title to search.",
    savedText:"",
    errorText:""
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({[name]: value});
  };

  saveBookToDb = id => {
    let selectedBooks = this.state.books.filter(book => book._id === id);
    console.log(selectedBooks[0]);
    API.saveBook(selectedBooks[0])
      .then(()=> this.setState({savedText:"Saved",errorText:""}))
      .catch(()=> this.setState({savedText:"",errorText:"Error Saving"}))
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.searchGoogleBooks(this.state.title).then(res => {
      if (!res.data.items) {
        this.setState({ searchMessage: "No books found!", books: [] });
      }
      else {
        let booksNum;
        if (res.data.totalItems > 10) {
          booksNum = "Displaying 10 of " + res.data.totalItems + " books";
        } else {
          booksNum = res.data.items.length + " books found!";
        }
        let bookData = res.data.items;
        bookData = bookData.map(book => {
          const authors = typeof book.volumeInfo.authors !== "undefined" ? book.volumeInfo.authors.join(", ") : "n/a";
          const description = typeof book.volumeInfo.description !== "undefined" ? book.volumeInfo.description : "n/a";
          const imageUrl = typeof book.volumeInfo.imageLinks.thumbnail !== "undefined" ? book.volumeInfo.imageLinks.thumbnail : "";
          const link = typeof book.volumeInfo.infoLink !== "undefined" ? book.volumeInfo.infoLink : "";
          book = {
            _id: book.id,
            title: book.volumeInfo.title,
            author: authors,
            description: description,
            image: imageUrl,
            link: link
          };
          return book;
        });
       
        this.setState({ 
          books: bookData,
          searchMessage: booksNum
          }
        );
      }
      }).catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="12">
            <Jumbotron>
            <h1>Search Google Books</h1>
            </Jumbotron>
          </Col>
        </Row>

        <Row>
          <Col size="12">
            <form className='text-center py-4'>
              <Input value={this.state.title} onChange={this.handleInputChange} name="title" placeholder="Book Title" />
              <FormBtn disabled={!this.state.title} onClick={this.handleFormSubmit}>
                <svg class="bi bi-search" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                  <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                </svg>
                &nbsp;Search Google Books
              </FormBtn>
            </form>
          </Col>
        </Row>

        <Row>
          <Col size="12">
            { (this.state.books.length > 0) ? (
              <div>
                <h2>
                  Results: {this.state.searchMessage}
                  <span className="badge badge-success mx-3 p-2">{this.state.savedText}</span>
                  <span className="badge badge-danger mx-3 p-2">{this.state.errorText}</span>
                </h2>
                <List>
                  {this.state.books.map(book => (
                    <ListItem key={book._id} >
                      <Row>
                        <Col size="12">
                          <h3 className="text-light rounded bg-info p-2">{book.title}</h3>
                          <Row>
                            <Col size="sm-6 md-7 lg-8 xl-9">
                              <p className="text-center text-sm-left">
                                <span className="font-weight-bolder">Author(s): </span>
                                {book.author}
                              </p>
                            </Col>

                            <Col size="sm-6 md-5 lg-4 xl-3">
                              <div className="text-center text-sm-right">
                                <a href={book.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark px-3 m-2" role="button">
                                <svg class="bi bi-link-45deg" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                                  <path d="M5.712 6.96l.167-.167a1.99 1.99 0 0 1 .896-.518 1.99 1.99 0 0 1 .518-.896l.167-.167A3.004 3.004 0 0 0 6 5.499c-.22.46-.316.963-.288 1.46z"/>
                                  <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z"/>
                                  <path d="M10 9.5a2.99 2.99 0 0 0 .288-1.46l-.167.167a1.99 1.99 0 0 1-.896.518 1.99 1.99 0 0 1-.518.896l-.167.167A3.004 3.004 0 0 0 10 9.501z"/>
                                </svg>
                                  &nbsp;View
                                </a>
                                <SaveBtn onClick={() => this.saveBookToDb(book._id)} />
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col size="12">
                              <div class="text-center">
                                <img src={book.image} alt={book.title} className="float-sm-left mr-3 p-2" />
                              </div>
                              <h4>
                                Description:
                              </h4>
                              <p className='text-justify'>
                                {book.description}
                              </p>
                            </Col>
                          </Row>

                        </Col>
                      </Row>
                    </ListItem>
                  ))}
                </List>
              </div>
              ) : (
                <div>
                  <h2 className='d-inline p-1'>Results:</h2>
                  <List>
                      <h3 className='display-4 text-center py-5'>{this.state.searchMessage}</h3>
                  </List>
                </div>
              )
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;
