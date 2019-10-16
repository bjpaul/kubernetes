import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Create from "./components/create";
import Edit from "./components/edit";
import Delete from "./components/delete";
import List from "./components/list";
import Home from "./components/home";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            
            <Link to="/" className="navbar-brand">Contact Book</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/list" className="nav-link">List</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={Home} />
          <Route path="/list" component={List} />
          <Route path="/edit/:id" component={Edit} />
          <Route path="/create" component={Create} />
          <Route path="/delete/:id" component={Delete} />
        </div>
      </Router>
    );
  }
}

export default App;