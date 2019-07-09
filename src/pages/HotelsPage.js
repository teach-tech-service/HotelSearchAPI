import React from "react";
import "./../App.css";
import { MyContext } from "../components/providers/HotelProvider";
import PrizeSlider from "./../components/PrizeSlider";
import { withRouter, Redirect } from "react-router-dom";
import data from "../data/data";
import HotelItem from "../components/HotelItem";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import Button from "@material-ui/core/Button";

export class Hotels extends React.Component {
  state = {
    zoom: 15,
    show: false,
    itemsChecked: 0,
    prize: 0,
    hotel: {
      name: "",
      distance: 0
    },
    min: 200,
    max: 400
  };

  showButton = event => {
    if (!event.target.closest(".items__item").classList.contains("checked")) {
      event.target.closest(".items__item").classList.add("checked");
      this.setState(
        {
          itemsChecked: this.state.itemsChecked + 1
        },
        () => {
          if (this.state.itemsChecked > 0) {
            this.setState({
              show: true
            });
          } else {
            this.setState({
              show: false
            });
          }
        }
      );
    } else {
      event.target.closest(".items__item").classList.remove("checked");
      this.setState(
        {
          itemsChecked: this.state.itemsChecked - 1
        },
        () => {
          if (this.state.itemsChecked > 0) {
            this.setState({
              show: true
            });
          } else {
            this.setState({
              show: false
            });
          }
        }
      );
    }
  };
  getCenterMap = hotel => {
    this.setState(prevState => {
      prize: prevState.prize = hotel.prize;
      hotel: prevState.hotel.name = hotel.name;
      hotel: prevState.hotel.distance = hotel.distance;
      latitude: prevState.latitude = hotel.lat;
      longitude: prevState.longitude = hotel.lng;
    });
  };

  HotelSearch = value => {
    this.setState(
      prevState => ({
        min: value[0] * 10,
        max: value[1] * 10
      }),
      () => {
        console.log(`${this.state.min}   ${this.state.max}`);
      }
    );
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
              google={this.props.google}
              zoom={this.state.zoom}
              initialCenter={{
                lat: lat,
                lng: lng
              }}
              disableDefaultUI
            >
              {data.map(item => {
                return item.city === city &&
                  (item.prize >= this.state.min &&
                    item.prize <= this.state.max) ? (
                  <Marker
                    key={`keymar ${item.id}`}
                    name={item.location.name}
                    icon={{
                      url: "/img/hotel-icon.png",
                      scaledSize: new google.maps.Size(32, 32)
                    }}
                    position={{
                      lat: item.location.latitude,
                      lng: item.location.longitude
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
                {data.map(item => {
                  return item.city === city &&
                    (item.prize > this.state.min &&
                      item.prize < this.state.max) ? (
                    <HotelItem
                      key={`itemhot ${item.id}`}
                      name={item.location.name}
                      prize={item.prize}
                      distance={item.location.distance}
                      lat={item.location.latitude}
                      lng={item.location.longitude}
                      test1={this.showButton}
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
                style={{ visibility: this.state.show ? "visible" : "hidden" }}
                onClick={() => {
                  setHotelPrize(this.state.prize);
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
