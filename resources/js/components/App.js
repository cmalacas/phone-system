import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Scripts from '../pages/Scripts';
import Script from '../pages/Scripts/Script';
import Register from '../pages/Login/Register';
import Login from '../pages/Login';
import Companies from '../pages/Companies';

export default class App extends Component {

    constructor(props) {

        super(props);

    }

    render() {

        return (

            <Router>
                <Routes>
                        <Route path="/" exact element={<Companies />} />
                        <Route path="/dashboard" exact element={<Companies />} />
                        <Route path="/{id}/script" exact element={<Script />} />
                        <Route path="/register" exact element={<Register />} />
                        <Route path="/login" exact element={<Login />} />
                        <Route path="/companies" exact element={<Companies />} />
                        <Route path="/scripts" exact element={<Scripts />} />
                </Routes>
            </Router>
        )

    }
}


if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
