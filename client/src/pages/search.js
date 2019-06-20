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
    searchMessage:"No books to display.",
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
    API.saveBook(selectedBooks[0]).then(()=>this.setState({savedText:"Saved",errorText:""})).catch(()=> this.setState({savedText:"",errorText:"Error Saving"}))
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.searchGoogleBooks(this.state.title).then(res => {
      if (!res.data.items) {
        this.setState({ searchMessage: "No books found!", books: [] });
      }
      else {
        let booksNum = 0;
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
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
            <h1>Search Google Books</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row> 
          <Col size="2"/>
          <Col size="lg-8 md-10">
            <form className='text-center'>
              <Input value={this.state.title} onChange={this.handleInputChange} name="title" placeholder="Book Title" />
              <FormBtn disabled={!this.state.title} onClick={this.handleFormSubmit}>Search Google Books</FormBtn>
            </form>
          </Col>
          <Col size="2"/>
        </Row>
        <Row>
        <Col size="md-12">
        { (this.state.books.length > 0) ? (
          <div>
            <h4 className='d-inline p-1'>Results: {this.state.searchMessage}<span className="badge badge-success mx-3 p-2">{this.state.savedText}</span><span className="badge badge-danger mx-3 p-2">{this.state.errorText}</span></h4>
            <List>
              {this.state.books.map(book => (
                <ListItem key={book.id} >
                  <div className="row no-gutters my-4 border border-info">
                    <div className="col-12">
                      <h5 className="text-light bg-info p-2">{book.title}</h5>
                      <div className="row no-gutters">
                        <div className="col-6 p-2">
                          <span className="font-weight-bolder small">Author(s): </span>{book.author}
                        </div>
                        <div className="col-6 text-right">
                          <a href={book.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark px-3 m-2" role="button">View</a>
                          <SaveBtn onClick={() => this.saveBookToDb(book._id)} />
                        </div>
                      </div>
                      <div className="row no-gutters">
                        <div className="col-12 p-2">
                          <img src={book.image} alt={book.title} className="float-left mr-3 p-2" />
                          <span className="font-weight-bolder small">Description: </span>
                          <p className='text-justify'>{book.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ListItem>
              ))}
            </List>
          </div>
          ) : (
            <div>
              <h4 className='d-inline p-1'>Results:</h4>
              <List>
                  <h1 className='display-4 text-center py-5'>{this.state.searchMessage}</h1>
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
