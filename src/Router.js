import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Image from './Image'
// import Settings from './Settings'

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App}></Route>
            <Route exact path="/image" component={Image}></Route>
            {/* <Route exact path=""></Route> */}
        </Switch>
    </BrowserRouter>
)

export default Router