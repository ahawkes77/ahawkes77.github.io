import React from 'react';
import {HashRouter, Route, Link, Switch} from "react-router-dom";
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));

export default () => (
    <HashRouter>
        <Switch>
        </Switch>
    </HashRouter>
)