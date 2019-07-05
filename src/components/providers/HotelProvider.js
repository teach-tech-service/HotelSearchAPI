import React from "react";

export const MyContext = React.createContext();

export class MyProvider extends React.Component {
    state = {
        city: "Krakow",
        hotelPrize: 0,
        hotelName: "",
        hotelDistance: 0,
        attrPrize: 0
    };

    render() {
        return (
            <MyContext.Provider
                value={{
                    state: this.state,
                    setCity: city => {
                        this.setState({ city: city });
                    },
                    setHotelPrize: prize => {
                        this.setState({ hotelPrize: prize });
                    },
                    setAttrPrize: prize => {
                        this.setState({ attrPrize: prize });
                    },
                    setHotelName: name => {
                        this.setState({ hotelName: name });
                    },
                    setHotelDistance: distance => {
                        this.setState({ hotelDistance: distance });
                    }
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}
