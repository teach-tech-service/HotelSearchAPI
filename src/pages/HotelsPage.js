import React from "react";
import "./../App.css";
import { MyContext } from "../components/providers/HotelProvider";
import PrizeSlider from "./../components/PrizeSlider";
import { Link } from "react-router-dom";
import data from "../data/data";
import HotelItem from "../components/HotelItem";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

export class Hotels extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      zoom: 16,
      show: false,
      itemsChecked: 0,
      prize: 0,
      hotel: {
        name: "",
        distance: 0
      },
      min: 100,
      max: 150
    };
  }

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
  getCenterMap = hotel1 => {
    this.setState(prevState => {
      prize: prevState.prize = hotel1.prize;
      hotel: prevState.hotel.name = hotel1.name;
      hotel: prevState.hotel.distance = hotel1.distance;
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
    //this.renderMarkers(this.state.min, this.state.max);
    //this.renderHotels(this.state.min, this.state.max);
  };

  render() {
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
                  (item.prize > this.state.min &&
                    item.prize < this.state.max) ? (
                  <Marker
                    key={`keymar ${item.id}`}
                    name={item.location.name}
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
                      onClick={this.getCenterMap}
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
