import React from "react";
import "./../App.css";
import { MyContext } from "../components/providers/HotelProvider";
import SummaryAttr from "./../components/SummaryAttr";
import SummaryHotel from "./../components/SummaryHotel";
import { Link } from "react-router-dom";

export default class Summary extends React.Component {
    style = {
        textDecoration: "none",
        color: "black",
        width: "100%",
        height: "100%"
    };

    render() {
        return (
            <MyContext.Consumer>
                {({
                    state: { hotelPrize, attractions, hotelName, hotelDistance }
                }) => (
                    <div>
                        <h1>Podsumowanie:</h1>
                        <p>Wybrałeś hotel:</p>
                        <SummaryHotel
                            name={hotelName}
                            distance={hotelDistance}
                            prize={hotelPrize}
                        />
                        <p>Wybrałeś atrakcje:</p>
                        <div className="attr">
                            {attractions.map(item => {
                                return (
                                    <SummaryAttr
                                        key={`key ${item.id}`}
                                        name={item.name}
                                        prize={item.prize}
                                    />
                                );
                            })}
                        </div>
                        <div className="summary-btns">
                            <button className="btn-select">
                                <Link to="/" style={this.style}>
                                    Cofnij do wyboru miasta
                                </Link>
                            </button>
                            <br />
                            <button className="btn-select">
                                <Link to="/hotels" style={this.style}>
                                    Cofnij do wyboru hotelu
                                </Link>
                            </button>
                            <br />
                            <button className="btn-select">
                                <Link to="/atractions" style={this.style}>
                                    Cofnij do wyboru atrakcji
                                </Link>
                            </button>
                        </div>
                        <br />
                    </div>
                )}
            </MyContext.Consumer>
        );
    }
}
