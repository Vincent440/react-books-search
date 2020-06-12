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
                              <a href={book.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark px-3 m-2" role="button">View</a>
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