import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios'
// import { ipcRenderer } from 'electron';

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer
const Menu = electron.remote.Menu

class App extends Component {

  state = {
    posts: []
  }

  componentDidMount() {
    this.initMenu()
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

  showImage = (image) => {
    ipcRenderer.send('toggle-image', image)
  }

  initMenu() {
    const menu = Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {label: 'New Wildow'},
                {label: 'Setting',
                accelerator: 'CmdOrCtrl+',
                click: () => {
                    // console.log('ok ')
                    ipcRenderer.send('toggle-settings')
                }},
                {type: 'separator'},
                {label: 'Quit',
                accelerator: 'CmdOrCtrl+Q'}, 
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {label: 'Menu item 1'},
                {label: 'Menu item 2'},
                {label: 'Menu item 3'},
            ]
        }
    ])

    Menu.setApplicationMenu(menu)
}

  render() {
    return (
      <div className="App">
        <ul className="list-group list-group-flush">
          {this.state.posts.map(post =>
            <li 
              key={post.data.id} 
              className="list-group-item flex-container" 
              onClick={() => this.showImage(post.data.preview.images[0].source.url)}
            >
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
