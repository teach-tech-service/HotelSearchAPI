import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import City from "./pages/CityPage";
import Atractions from "./pages/AttractionsPage";
import Summary from "./pages/SummaryPage";
import Hotels from "./pages/HotelsPage";
import { MyProvider } from "./components/providers/HotelProvider";

function App() {
    return (
        <Router>
            <Switch>
                <MyProvider>
                    <div className="App" />
                    <Route path="/" exact component={City} />
                    <Route path="/hotels" component={Hotels} />
                    <Route path="/atractions" component={Atractions} />
                    <Route path="/summary" component={Summary} />
                </MyProvider>
            </Switch>
        </Router>
    );
}

export default App;
