import React from "react";
import "./../App.css";
import { MyContext } from "../components/providers/HotelProvider";
import PrizeSlider from "./../components/PrizeSlider";
import { withRouter } from "react-router-dom";
import data from "../data/data";
import HotelItem from "../components/HotelItem";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import Button from "@material-ui/core/Button";

export class Hotels extends React.Component {
    state = {
        zoom: 15,
        show: false,
        selectedHotel: null,
        prize: 0,
        hotel: {
            name: "",
            distance: 0
        },
        min: 200,
        max: 400
    };

    selectItem = event => {
        let hotel = data.filter(c => c.id == event.id)[0];

        if (this.state.selectedHotel === null) {
            this.setState({
                selectedHotel: hotel,
                show: true
            });
            this.setContextData(hotel);
        } else
            this.setState({
                selectedHotel: null,
                show: false
            });
    };
    setContextData = hotel => {
        this.setState(prevState => {
            prevState.prize = hotel.prize;
            prevState.hotel.name = hotel.name;
            prevState.hotel.distance = hotel.distance;
        });
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
                                        key={`${item.id}`}
                                        id={item.id}
                                        name={item.location.name}
                                        icon={{
                                            url: "/img/hotel-icon.png",
                                            scaledSize: new google.maps.Size(
                                                32,
                                                32
                                            )
                                        }}
                                        position={{
                                            lat: item.location.latitude,
                                            lng: item.location.longitude
                                        }}
                                        onClick={() => this.selectItem(item)}
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
                                            name={item.location.name}
                                            isSelected={isSelected}
                                            prize={item.prize}
                                            distance={item.location.distance}
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
                                    visibility: this.state.show
                                        ? "visible"
                                        : "hidden"
                                }}
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
