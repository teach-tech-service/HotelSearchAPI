import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import City from "./pages/CityPage";
import Atractions from "./pages/AttractionsPage";
import Summary from "./pages/SummaryPage";
import Hotels from "./pages/HotelsPage";
import NotFound from "./pages/NotFound";
import { MyProvider } from "./components/providers/HotelProvider";

function App() {
    return (
        <MyProvider>
            <Router>
                <div className="App" />
                <Switch>
                    <Route path="/" exact component={City} />
                    <Route path="/summary" component={Summary} />
                    <Route path="/hotels" component={Hotels} />
                    <Route path="/atractions" component={Atractions} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </MyProvider>
    );
}

export default App;
