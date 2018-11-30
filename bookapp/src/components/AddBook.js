import React, { Component } from 'react';

export class AddBook extends Component {
      constructor(props){
        super(props)

        this.state ={
          book : {}
        }
      }
      addBook = (e) => {
      this.setState({
        book:{
            ...this.state.book,
            [e.target.name] : e.target.value
          }

      })

      }
      addButton = () =>{
        let bookInfo = this.state.book
        fetch('http://localhost:3050/addBook',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookInfo)
    }).then((response) => {
      return response.json()
    }).then((json) => {
      console.log(json)
      if(json.success == true) {
      this.props.history.push('/')
    } else {
      
    }
    })

      }

  render() {
    return (
      <div className="addBookContainer">
      <h2 className="addBookTitle">Add a New Book</h2>
      <label>Enter Book Title:</label>
      <input onChange={this.addBook} type="text" name="title"/> <br/>
      <label>Enter Published Date:</label>
      <input onChange={this.addBook} type="date" name="year"/> <br/>
      <label>Enter Author:</label>
      <input onChange={this.addBook} type="text" name="author"/> <br/>
      <label>Enter image URL:</label>
      <input onChange={this.addBook} type="text" name="imageUrl"/> <br/>
      <label>Choose genre of the book:</label>
      <select name="category" onChange={this.addBook}>
      <option selected disabled value>Select an option</option>
      <option value="Fiction">Fiction</option>
      <option value="Technical">Technical</option>
      <option value="Romance">Romance</option>
      <option value="Biography">Biography</option>
      </select> <br/>
      <button onClick={this.addButton}>Add Book</button>

</div>
    )
  }

}
