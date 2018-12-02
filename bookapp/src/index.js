import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {BaseLayout} from './components/BaseLayout'
import {AddBook} from './components/AddBook'
import {AllBooks} from './components/AllBooks'
import {Footer} from './components/Footer'
import {Header} from './components/Header'
import {UpdateBook} from './components/UpdateBook'
import {Login} from './components/Login'
import {Register} from './components/Register'

ReactDOM.render(


  <BrowserRouter>
  <BaseLayout>
    <Switch>
      <Route exact path="/" component={AllBooks} />
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/add-book" component={AddBook} />
      <Route path="/update-book/:bookId" component={UpdateBook} />
    </Switch>
  </BaseLayout>
  </BrowserRouter>



  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
