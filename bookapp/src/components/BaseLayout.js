import React, { Component } from 'react';
import {AddBook} from './AddBook'
import {AllBooks} from './AllBooks'
import {Footer} from './Footer'
import {Header} from './Header'
import {UpdateBook} from './UpdateBook'
import './main.css'

export class BaseLayout extends Component {

  render() {
    return (

      <div>
          <Header />
              {this.props.children}
          <Footer />

      </div>

    )
  }

}
