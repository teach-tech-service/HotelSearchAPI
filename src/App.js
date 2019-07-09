import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

import City from "./pages/CityPage";
import Atractions from "./pages/AtractionsPage";
import Summary from "./pages/SummaryPage";
import Hotels from "./pages/HotelsPage";
import NotFound from "./pages/NotFound";
import { MyProvider } from "./components/providers/HotelProvider";

function App() {
  return (
    <Router>
      <MyProvider>
        <div className="App" />
        <Route path="/" exact component={City} />
        <Route path="/atractions" exact component={Atractions} />
        <Route path="/summary" exact component={Summary} />
        <Route path="/hotels/:city" exact component={Hotels} />
        <Route component={NotFound} />
      </MyProvider>
    </Router>
  );
}

export default App;
