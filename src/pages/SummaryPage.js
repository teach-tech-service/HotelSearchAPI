import React from "react";
import "./../App.css";
import { MyContext } from "../components/providers/HotelProvider";
import { Link } from "react-router-dom";

export default class Summary extends React.Component {
    render() {
        return (
            <MyContext.Consumer>
                {({
                    state: { hotelPrize, attrPrize, hotelName, hotelDistance }
                }) => (
                    <div>
                        <h1>Podsunowanie:</h1>
                        <p>
                            Twój hotel to {hotelName} oddalony od centrum o{" "}
                            {hotelDistance}km.
                        </p>
                        <p>Twój całkowity koszt : {hotelPrize + attrPrize}</p>
                        <Link to="/">Cofnij do wyboru miasta</Link>
                        <br />
                        <Link to="/hotels">Cofnij do wyboru hotelu</Link>
                        <br />
                        <Link to="/atractions">Cofnij do wyboru atrakcji</Link>
                        <br />
                    </div>
                )}
            </MyContext.Consumer>
        );
    }
}
