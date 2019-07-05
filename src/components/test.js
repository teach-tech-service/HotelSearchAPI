import React from "react";
import { MyContext } from "./providers/HotelProvider";

export default class test extends React.Component {
    render() {
        return (
            <React.Fragment>
                <MyContext.Consumer>
                    {({ state: { city } }) => (
                        <div>
                            <h1>Strona testowa, wybrae miasto: {city}</h1>
                        </div>
                    )}
                </MyContext.Consumer>
            </React.Fragment>
        );
    }
}
