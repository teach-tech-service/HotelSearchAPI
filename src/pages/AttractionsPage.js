import React from "react";
import "./../App.css";
import atractions from "./../data/Atractions";
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
        atraction: {
            attrPrizes: [],
            attrNames: [],
            attrId: []
        },
        prize: 0
    };
    showButton = (event, attr) => {
        if (
            !event.target.closest(".items__item").classList.contains("checked")
        ) {
            event.target.closest(".items__item").classList.add("checked");
            this.setState(
                {
                    itemsChecked: this.state.itemsChecked + 1,
                    atraction: {
                        attrId: [...this.state.atraction.attrId, attr.id],
                        attrPrizes: [
                            ...this.state.atraction.attrPrizes,
                            attr.prize
                        ],
                        attrNames: [
                            ...this.state.atraction.attrNames,
                            attr.name
                        ]
                    }
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

    render() {
        return (
            <MyContext.Consumer>
                {context => (
                    <div className="wrapper" key="wrapper">
                        {console.log(context.state.hotel.hotelName)}
                        <Map
                            google={this.props.google}
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
                                    return item.city === context.state.city ? (
                                        <AttractionItem
                                            key={`key ${item.id}`}
                                            name={item.name}
                                            prize={item.prize}
                                            lat={item.location.latitude}
                                            lng={item.location.longitude}
                                            showBtn={this.showButton}
                                            id={item.id}
                                        />
                                    ) : (
                                        ""
                                    );
                                })}
                            </ul>
                            <p>*proszę wybrać przynajmniej trzy atrakcje</p>
                            {this.state.show ? (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className="btn-select"
                                    onClick={() => {
                                        for (let value of this.state.atraction
                                            .attrPrizes) {
                                            context.setAttrPrize(value);
                                        }
                                        for (let value of this.state.atraction
                                            .attrNames) {
                                            context.setAttrName(value);
                                        }
                                        this.props.history.push(`/summary`);
                                    }}
                                >
                                    {" "}
                                    Wybierz
                                </Button>
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
