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
          <Col size="md-12">
            <Jumbotron>
              <h1>Saved Books</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
        <Col size="md-12">
        { (this.state.savedBooks.length > 0) ? (
        <div>
          <h4 className='d-inline p-1'>Saved Books:</h4> 
          <List>
              { this.state.savedBooks.map(book => (
                <ListItem key={book._id}>
                  <div className="row no-gutters my-2 border border-success">
                    <div className="col-12">
                      <h5 className="text-light bg-success p-1">{book.title}</h5>
                      <div className="row no-gutters">
                        <div className="col-6 p-2">
                          <span className="font-weight-bolder small">Author(s): </span>{book.author}
                        </div>
                        <div className="col-6 text-right">
                          <a href={book.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark px-3 m-2" role="button">View</a>
                          <DeleteBtn onClick={() => this.handleDeleteButton(book._id)} />
                        </div>
                      </div>
                      <div className="row no-gutters">
                        <div className="col-12 p-2">
                          <img src={book.image} alt={book.title} className="float-left mr-3 p-2" />
                          <span className="font-weight-bolder small">Description: </span>
                          <p className='text-justify p-2'>{book.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ListItem>
              ))  }
          </List>
        </div>)  : (<h1 className='border p-4 text-center'>No Saved Books to display</h1>)
        }
        </Col>
      </Row>
  </Container>
  )}
}
export default Saved;