/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import { List, ListItem } from "../components/List";

class Saved extends Component {
  state = {
    savedBooks: []
};
componentDidMount() {
  API.getBooks()
  .then(res => this.setState({ savedBooks: res.data }))
  .catch(err => console.log(err));
}
handleDeleteButton = id => {
  API.deleteBook(id)
  .then(()=> this.componentDidMount())
  .catch(err => console.log(err));
}
render() {
  return (
      <Container fluid>
        <Row>
          <Col size="12">
            <Jumbotron>
              <h1>Saved Books</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
        <Col size="12">
          { (this.state.savedBooks.length > 0) ? (
            <div>
              <h2 className="pl-4">
                Saved Books
              </h2>
              <List>
                { this.state.savedBooks.map(book => (
                  <ListItem key={book._id}>
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
                                <svg class="bi bi-link-45deg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                                  <path d="M5.712 6.96l.167-.167a1.99 1.99 0 0 1 .896-.518 1.99 1.99 0 0 1 .518-.896l.167-.167A3.004 3.004 0 0 0 6 5.499c-.22.46-.316.963-.288 1.46z"/>
                                  <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z"/>
                                  <path d="M10 9.5a2.99 2.99 0 0 0 .288-1.46l-.167.167a1.99 1.99 0 0 1-.896.518 1.99 1.99 0 0 1-.518.896l-.167.167A3.004 3.004 0 0 0 10 9.501z"/>
                                </svg>
                                &nbsp;View
                              </a>
                              <DeleteBtn onClick={() => this.handleDeleteButton(book._id)} />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col size="12">
                            <img src={book.image} alt={book.title} className="float-sm-left mr-3 p-2" />
                            <h4>Description:</h4>
                            <p className='text-justify p-2'>
                              {book.description}
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </ListItem>
                ))  }
              </List>
            </div>
            )  : (<h2 className='border p-4 text-center'>No books to display.</h2>)
          }
        </Col>
      </Row>
  </Container>
  )}
}
export default Saved;