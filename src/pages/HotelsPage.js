import React from "react";
import "./../App.css";
import { MyContext } from "../components/providers/HotelProvider";
import PrizeSlider from "./../components/PrizeSlider";
import { withRouter } from "react-router-dom";
import { hotels } from "../data/data";
import HotelItem from "../components/HotelItem";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import Button from "@material-ui/core/Button";

export class Hotels extends React.Component {
  state = {
    show: false,
    selectedHotel: null,
    hotel: {
      name: "",
      distance: 0,
      prize: 0
    },
    min: 200,
    max: 400
  };

  selectItem = event => {
    let hotel = hotels.filter(c => c.id == event.id)[0];
    console.log(event);
    console.log(hotel);

    if (this.state.selectedHotel === null) {
      this.setState({
        selectedHotel: hotel,
        show: true
      });
      this.setContextData(hotel);
    } else if (this.state.selectedHotel.id === hotel.id) {
      this.setState({
        selectedHotel: null,
        show: false
      });
    } else {
      this.setState({
        selectedHotel: hotel,
        show: true
      });
      this.setContextData(hotel);
    }
  };
  setContextData = hotel => {
    this.setState(prevState => {
      prevState.hotel.prize = hotel.prize;
      prevState.hotel.name = hotel.name;
      prevState.hotel.distance = hotel.distance;
    });
    console.log(this.state);
  };

  HotelSearch = value => {
    this.setState(prevState => ({
      min: value[0] * 10,
      max: value[1] * 10
    }));
  };

  render() {
    const { google } = this.props;
    return (
      <MyContext.Consumer>
        {({
          state: {
            city,
            centerMap: { lng, lat }
          },
          setHotelPrize,
          setHotelName,
          setHotelDistance
        }) => (
          <div className="wrapper">
            <Map
              google={google}
              zoom={15}
              initialCenter={{
                lat: lat,
                lng: lng
              }}
              disableDefaultUI
            >
              {hotels.map(item => {
                return item.city === city &&
                  (item.prize >= this.state.min &&
                    item.prize <= this.state.max) ? (
                  <Marker
                    key={`${item.id}`}
                    id={item.id}
                    name={item.location.name}
                    icon={{
                      url: "/img/hotel-icon.png",
                      scaledSize: new google.maps.Size(32, 32)
                    }}
                    distance={item.location.distance}
                    position={{
                      lat: item.location.latitude,
                      lng: item.location.longitude
                    }}
                    onClick={() => {
                      this.selectItem(item);
                      this.setContextData(item);
                    }}
                  />
                ) : null;
              })}
            </Map>
            <section
              className="items"
              id="items"
              style={{ position: "relative" }}
            >
              <PrizeSlider onChange={this.HotelSearch} />
              <ul className="items__list" id="items_list">
                {hotels.map(item => {
                  let isSelected = false;

                  if (
                    this.state.selectedHotel !== null &&
                    this.state.selectedHotel.id === item.id
                  )
                    isSelected = true;

                  return item.city === city &&
                    (item.prize > this.state.min &&
                      item.prize < this.state.max) ? (
                    <HotelItem
                      key={`itemhot ${item.id}`}
                      id={item.id}
                      name={item.name}
                      isSelected={isSelected}
                      prize={item.prize}
                      distance={item.distance}
                      lat={item.location.latitude}
                      lng={item.location.longitude}
                      setHotel={this.selectItem}
                      onClick={this.setContextData}
                    />
                  ) : null;
                })}
              </ul>
              <p
                style={{
                  marginTop: 10,
                  color: "gray",
                  fontSize: 14,
                  borderTop: "1px solid lightgray",
                  width: "100%",
                  paddingTop: 5
                }}
              >
                * Proszę wybrać jeden hotel
              </p>
              <Button
                variant="contained"
                color="secondary"
                className="btn-select"
                style={{
                  visibility: this.state.show ? "visible" : "hidden"
                }}
                onClick={() => {
                  setHotelPrize(this.state.hotel.prize);
                  setHotelName(this.state.hotel.name);
                  setHotelDistance(this.state.hotel.distance);
                  this.props.history.push(`/atractions`);
                }}
              >
                Wybierz
              </Button>
            </section>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDzGLroP91cG9fH6lP5n1kkazfwptaaVr8"
})(withRouter(Hotels));
