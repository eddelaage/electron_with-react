import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios'

class App extends Component {

  state = {
    posts: []
  }

  componentDidMount() {
    axios.get('http://reddit.com/r/aww.json')
    .then(response => {
      this.setState({
        posts: response.data.data.children
      })
      console.log(response.data.data.children)
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="App">
        <ul className="list-group list-group-flush">
          {this.state.posts.map(post =>
            <li key={post.data.id} className="list-group-item flex-container">
              <img src={post.data.thumbnail} alt="image" className="thumbnail" />
              <div>{post.data.title}</div>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
