import React from "react";
import "./../App.css";
import { MyContext } from "../components/providers/HotelProvider";
import AttractionItem from "./../components/AttractionItem";
import HotelItem from "./../components/HotelItem";
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
                    state: {
                        hotelPrize,
                        attrPrizes,
                        attrNames,
                        hotelName,
                        hotelDistance
                    }
                }) => (
                    <div>
                        <h1>Podsumowanie:</h1>
                        <p>Wybrałeś hotel:</p>
                        <HotelItem
                            name={hotelName}
                            distance={hotelDistance}
                            prize={hotelPrize}
                        />
                        <p>Wybrałeś atrakcje:</p>
                        <div className="attr">
                            {attrNames.map((item, index) => {
                                return (
                                    <AttractionItem
                                        key={`key ${item}`}
                                        name={item}
                                        prize={attrPrizes[index]}
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
