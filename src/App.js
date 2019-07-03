import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

import CitiesList from "./components/CitiesList";
import test from "./components/test";
import { MyProvider } from "./MyProvider";

function App() {
    return (
        <Router>
            <MyProvider>
                <div className="App" />

                <Route path="/" exact component={CitiesList} />
                <Route path="/test" component={test} />
            </MyProvider>
        </Router>
    );
}

export default App;
