import React from "react";
import "./../App.css";
import { MyContext } from "../components/providers/HotelProvider";
import { Link } from "react-router-dom";
import data from "../data/data";
import HotelItem from "../components/HotelItem";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

export class Hotels extends React.Component {
  state = {
    zoom: 16,
    show: false,
    lng: 19.944544,
    lat: 50.049683,
    itemsChecked: 0,
    prize: 0,
    hotel: {
      name: "",
      distance: 0
    }
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
  getHotelPrize = hotel1 => {
    this.setState(prevState => {
      prize: prevState.prize = hotel1.prize;
      hotel: prevState.hotel.name = hotel1.name;
      hotel: prevState.hotel.distance = hotel1.distance;
    });
  };

  render() {
    console.log(data);
    return (
      <MyContext.Consumer>
        {({
          state: { city },
          setHotelPrize,
          setHotelName,
          setHotelDistance
        }) => (
          <div className="wrapper">
            <Map
              google={this.props.google}
              zoom={this.state.zoom}
              initialCenter={{
                lng: this.state.lng,
                lat: this.state.lat
              }}
              disableDefaultUI
            >
              {data.map(item => {
                return item.city === city ? (
                  <Marker
                    key={`key ${item.location.name}`}
                    name={item.location.name}
                    position={{
                      lat: item.location.latitude,
                      lng: item.location.longitude
                    }}
                    onClick={e => {
                      console.log(e);
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
              <ul className="items__list" id="items_list">
                {data.map(item => {
                  return item.city === city ? (
                    <HotelItem
                      key={`item ${item.location.name}`}
                      name={item.location.name}
                      prize={item.prize}
                      distance={item.location.distance}
                      lat={item.location.latitude}
                      lng={item.location.longitude}
                      test1={this.showButton}
                      onClick={this.getHotelPrize}
                    />
                  ) : null;
                })}
              </ul>
              <p>*proszę wybrać jeden hotel</p>
              {this.state.show ? (
                <button className="btn-select">
                  <Link
                    to="/atractions"
                    onClick={() => {
                      setHotelPrize(this.state.prize);
                      setHotelName(this.state.hotel.name);
                      setHotelDistance(this.state.hotel.distance);
                    }}
                  >
                    Wybierz
                  </Link>
                </button>
              ) : null}
            </section>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDzGLroP91cG9fH6lP5n1kkazfwptaaVr8"
})(Hotels);
