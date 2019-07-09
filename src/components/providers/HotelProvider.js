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
    attrPrizes: [],
    attrNames: [],

    centerMap: {
      lat: 0,
      lng: 0
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
          setAttrName: name => {
            this.setState(prevState => ({
              attrNames: [...prevState.attrNames, name]
            }));
          },
          setAttrPrize: prize => {
            this.setState(prevState => ({
              attrPrizes: [...prevState.attrPrizes, prize]
            }));
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
