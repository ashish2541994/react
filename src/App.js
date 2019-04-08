import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home'
import { Route, Link, BrowserRouter as Router ,IndexRoute} from 'react-router-dom'
import Singleuser from './components/Singleuser/Singleuser'
//import {Router, Route} from "react-router";
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          
            Learn React
          </header>   */}
          {/* <Home/> */}
        {/* </header> */}
        <Router>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={Singleuser} />
        </Router>
        {/* <Router >
                <Route exact path="/" component={Home} >
                    
                    <Route path={"users/"} component={Singleuser} />
                    <Route path={"home"} component={Home} />
                </Route>
                
            </Router> */}
        

      </div>
    );
  }
}

export default App;
