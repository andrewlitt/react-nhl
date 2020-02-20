import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import './index.css';
import 'tachyons';
import Game from './containers/Game/Game';
import Home from './containers/Home/Home';
import * as serviceWorker from './serviceWorker';

export default function App(){
    return(
        <Router>
            <Switch>
            <Route path="/game/:gamePk" component={ Game }/>
            <Route path="/">
                <Home />
            </Route>
            </Switch>
        </Router>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
