import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

import City from "./pages/CityPage";
import Atractions from "./pages/AttractionsPage";
import Summary from "./pages/SummaryPage";
import Hotels from "./pages/HotelsPage";
import test from "./components/test";
import { MyProvider } from "./components/providers/HotelProvider";

function App() {
    return (
        <Router>
            <MyProvider>
                <div className="App" />

                <Route path="/" exact component={City} />
                <Route path="/test" component={test} />
                <Route path="/hotels" component={Hotels} />
                <Route path="/atractions" component={Atractions} />
                <Route path="/summary" component={Summary} />
            </MyProvider>
        </Router>
    );
}

export default App;
