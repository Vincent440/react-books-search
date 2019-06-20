/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import { List, ListItem } from "../components/List";

class Saved extends Component {
  state = {
    savedDbBooks: [],
    saved: false
};

componentDidMount() {
  API.getBooks().then(res => this.setState({ savedDbBooks: res.data })).catch(err => console.log(err));
}

handleDeleteButton = id => {
  API.deleteBook(id).then(res => this.componentDidMount()).catch(err => console.log(err));
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
        {this.state.saved ? (
              <List>
                {this.state.savedBooks.map(book => (
                  <ListItem key={book._id}>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
        </Col>
      </Row>
  </Container>
  )}
  
}

export default Saved;
