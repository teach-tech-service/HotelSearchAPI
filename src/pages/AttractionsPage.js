import React from "react";
import "./../App.css";
import { atractions } from "./../data/data";
import Button from "@material-ui/core/Button";
import AttractionItem from "./../components/AttractionItem";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { MyContext } from "../components/providers/HotelProvider";

export class Atractions extends React.Component {
  state = {
    show: false,
    lng: 19.944544,
    lat: 50.049683,
    itemsChecked: 0,
    selectedAttr: [],
    prize: 0
  };
  selectItem = event => {
    let atraction = atractions.filter(c => c.id == event.id)[0];
    let ifEx = this.state.selectedAttr.some(item => item.id === atraction.id);
    if (ifEx) {
      let filtered = this.state.selectedAttr.filter(
        item => item.id !== atraction.id
      );
      this.setState({
        selectedAttr: filtered,
        itemsChecked: filtered.length
      });
    } else {
      let data = Object.assign([], this.state.selectedAttr);
      data.push(event);
      this.setState({
        selectedAttr: data,
        itemsChecked: data.length
      });
    }
  };

  render() {
    const { google } = this.props;
    return (
      <MyContext.Consumer>
        {context => (
          <div className="wrapper" key="wrapper">
            <Map
              google={google}
              zoom={14}
              initialCenter={{
                lng: context.state.centerMap.lng,
                lat: context.state.centerMap.lat
              }}
              disableDefaultUI
              key="map2"
            >
              {atractions.map(item => {
                return item.city === context.state.city ? (
                  <Marker
                    key={`key ${item.id}`}
                    name={item.location.name}
                    icon={{
                      url: "/img/monuments-icon.png",
                      scaledSize: new google.maps.Size(32, 32)
                    }}
                    position={{
                      lat: item.location.latitude,
                      lng: item.location.longitude
                    }}
                    onClick={() => this.selectItem(item)}
                  />
                ) : (
                  ""
                );
              })}
            </Map>
            <section
              className="items"
              id="items"
              style={{ position: "relative" }}
            >
              <ul className="items__list" id="items_list">
                {atractions.map(item => {
                  let isSelected = this.state.selectedAttr.some(
                    c => c.id == item.id
                  );

                  return item.city === context.state.city ? (
                    <AttractionItem
                      key={`key ${item.id}`}
                      name={item.name}
                      isSelected={isSelected}
                      prize={item.prize}
                      lat={item.location.latitude}
                      lng={item.location.longitude}
                      showBtn={this.selectItem}
                      id={item.id}
                    />
                  ) : (
                    ""
                  );
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
                * Proszę wybrać przynajmniej trzy atrakcje
              </p>

              <Button
                variant="contained"
                color="secondary"
                className="btn-select"
                style={{
                  visibility:
                    this.state.itemsChecked >= 3 ? "visible" : "hidden"
                }}
                onClick={() => {
                  context.setAttractions(this.state.selectedAttr);
                  this.props.history.push(`/summary`);
                }}
              >
                {" "}
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
})(Atractions);
