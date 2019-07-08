import React from "react";
import "./../App.css";
import atractions from "../data/Atractions";
import { Link } from "react-router-dom";
import AtractionItem from "./../components/AtractionItem";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { MyContext } from "../components/providers/HotelProvider";

let City = "";

export class Atractions extends React.Component {
    state = {
        show: false,
        lng: 19.944544,
        lat: 50.049683,
        itemsChecked: 0,
        prize: 0
    };
    showButton = event => {
        if (
            !event.target.closest(".items__item").classList.contains("checked")
        ) {
            event.target.closest(".items__item").classList.add("checked");
            this.setState(
                {
                    itemsChecked: this.state.itemsChecked + 1
                },
                () => {
                    if (this.state.itemsChecked > 2) {
                        this.setState(prevState => ({
                            show: true
                        }));
                    } else {
                        this.setState(prevState => ({
                            show: false
                        }));
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
                    if (this.state.itemsChecked > 2) {
                        this.setState(prevState => ({
                            show: true
                        }));
                    } else {
                        this.setState(prevState => ({
                            show: false
                        }));
                    }
                }
            );
        }
    };

    getAttrPrize = attr => {
        this.setState(prevState => {
            prize: prevState.prize += attr.prize;
        });
        console.log(this.state.prize);
    };

    render() {
        return (
            <MyContext.Consumer>
                {context => (
                    <div className="wrapper" key="wrapper">
                        {(City = context.state.city)}
                        <Map
                            google={this.props.google}
                            zoom={14}
                            initialCenter={{
                                lng: this.state.lng,
                                lat: this.state.lat
                            }}
                            disableDefaultUI
                            key="map2"
                        >
                            {atractions.map(item => {
                                return item.city === City ? (
                                    <Marker
                                        key={`key ${item.id}`}
                                        name={item.location.name}
                                        position={{
                                            lat: item.location.latitude,
                                            lng: item.location.longitude
                                        }}
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
                                    return item.city === City ? (
                                        <AtractionItem
                                            key={`key  ${item.id}`}
                                            name={item.name}
                                            prize={item.prize}
                                            lat={item.location.latitude}
                                            lng={item.location.longitude}
                                            showBtn={this.showButton}
                                            onClick={this.getAttrPrize}
                                        />
                                    ) : (
                                        ""
                                    );
                                })}
                            </ul>
                            <p>*proszę wybrać przynajmniej trzy atrakcje</p>
                            {this.state.show ? (
                                <button className="btn-select">
                                    <Link
                                        to="/summary"
                                        onClick={() =>
                                            context.setAttrPrize(
                                                this.state.prize
                                            )
                                        }
                                    >
                                        Wybierz
                                    </Link>
                                </button>
                            ) : (
                                ""
                            )}
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
