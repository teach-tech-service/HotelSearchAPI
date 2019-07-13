import React from "react";

export const MyContext = React.createContext();

export class MyProvider extends React.Component {
    state = {
        city: "Krakow",
        hotel: {
            hotelPrize: 0,
            hotelName: "",
            hotelDistance: 0
        },
        attractions: [],

        centerMap: {
            lng: 19.943089,
            lat: 50.058561
        }
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
                    setHotelName: name => {
                        this.setState({ hotelName: name });
                    },
                    setHotelDistance: distance => {
                        this.setState({ hotelDistance: distance });
                    },
                    setAttractions: attr => {
                        this.setState({
                            attractions: attr
                        });
                    },
                    setMapCenter: (lat, lng) => {
                        this.setState({ centerMap: { lat: lat, lng: lng } });
                    }
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}
