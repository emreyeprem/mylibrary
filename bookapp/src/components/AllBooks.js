import React, { Component } from 'react';
import { setAuthenticationToken } from '../utils'
import axios from 'axios'
import {Link, NavLink} from 'react-router-dom'


export class AllBooks extends Component {
       constructor(props){
         super(props)
         this.state={
           books: []
         }

       }

       addBookButton = () =>{
         this.props.history.push('/add-book')
       }

       componentDidMount = ()=>{
         let token = localStorage.getItem('jsonwebtoken')

         setAuthenticationToken(token)
         axios.get("http://localhost:3050/api/getBooks").then((res)=> {
           console.log(res.data)
           this.setState({
              books: res.data
              })
         }).catch((error)=>{
           this.props.history.push('/login')
         })
         }

        deleteBook = (each) =>{
          fetch('http://localhost:3050/delete-book/'+ each.id ,{
    method: 'delete'
  }).then((response) =>{
    let arr = this.state.books
    let newarr = arr.filter(function(book){
      return each.id !== book.id
    })
    this.setState({
      books:newarr
    })
    console.log('success')
    this.props.history.push('/')
  })
}

    edit = (bookId)=>{
      console.log(bookId)
      this.props.history.push(`/update-book/${bookId}`)
    }


  render() {
    let books = this.state.books.map((each)=>{
      return <div className="card">
       <img id="pictures" className="card-img-top" src={each.imageurl} alt="Card image cap" />
       <div className="card-body">
       <div className="cardTitle">
         <h3 className="card-text car-title">{each.booktitle}</h3>
         </div>
         <p className="card-text"><b>Author:</b> {each.author}</p>
         <p className="card-text"><b>Genre: </b>{each.category}</p>
         <p className="card-text"><b>Published on: </b>{each.publisheddate}</p>
         <div className="btn-div">
         <button className="btn btn-primary buttons" onClick={this.deleteBook.bind(this,each)}>Delete</button>
         <button onClick={() => this.edit(each.id)} className="btn btn-warning buttons">Edit</button>
         </div>
       </div>
     </div>
    })
    return (


      <div>
      <div className="maindiv">
       {books}

      </div>
      <button onClick={this.addBookButton} className="addButton btn btn-warning">Add Book</button>

      </div>

    )
  }

}
