import React from "react";
import "./../App.css";
import { Link } from "react-router-dom";
import { MyContext } from "../components/providers/HotelProvider";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";

const styles = {
    box: {
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        padding: "10px"
    },
    link: {
        textDecoration: "none",
        color: "black",
        height: "100%"
    },

    btn: {
        marginTop: "10px"
    },

    form: {
        display: "flex",
        flexDirection: "column"
    }
};

export default class City extends React.Component {
    state = {
        location: {
            Krakow: {
                lng: 19.943089,
                lat: 50.058561
            },
            Warszawa: {
                lng: 21.023423,
                lat: 52.23239
            }
        }
    };

    render() {
        return (
            <React.Fragment>
                <Container maxWidth="xl" style={styles.box}>
                    <Box width={1 / 4}>
                        <h2>Wybierz miasto które chcesz odwiedzić</h2>
                        <Box border={1} p={10}>
                            <MyContext.Consumer>
                                {context => (
                                    <React.Fragment>
                                        <FormControl style={styles.form}>
                                            <InputLabel>Miasto</InputLabel>
                                            <NativeSelect
                                                onChange={e => {
                                                    context.setCity(
                                                        e.target.value
                                                    );
                                                    switch (e.target.value) {
                                                        case "Krakow":
                                                            context.setMapCenter(
                                                                this.state
                                                                    .location
                                                                    .Krakow.lat,
                                                                this.state
                                                                    .location
                                                                    .Krakow.lng
                                                            );
                                                            break;
                                                        case "Warszawa":
                                                            context.setMapCenter(
                                                                this.state
                                                                    .location
                                                                    .Warszawa
                                                                    .lat,
                                                                this.state
                                                                    .location
                                                                    .Warszawa
                                                                    .lng
                                                            );
                                                            break;
                                                        default:
                                                            context.setMapCenter(
                                                                1,
                                                                1
                                                            );
                                                    }
                                                }}
                                            >
                                                <option value="" />
                                                <option value="Krakow">
                                                    Krakow
                                                </option>
                                                <option value="Warszawa">
                                                    Warszawa
                                                </option>
                                            </NativeSelect>
                                        </FormControl>
                                        <Button
                                            variant="contained"
                                            style={styles.btn}
                                        >
                                            <Link
                                                to="/hotels"
                                                size="large"
                                                style={styles.link}
                                            >
                                                Dalej
                                            </Link>
                                        </Button>
                                    </React.Fragment>
                                )}
                            </MyContext.Consumer>
                        </Box>
                    </Box>
                </Container>
            </React.Fragment>
        );
    }
}
