/* eslint-disable no-unused-vars */
import React from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function noMatch() {
  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>404 Page Not Found</h1>
            <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
              </span>
            </h1>
            <Router>
              <Route >
                <a href="/">Back to Search</a>
              </Route>
            </Router>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default noMatch;
