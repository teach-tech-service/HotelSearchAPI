import React from "react";
import "./../App.css";
import { withRouter } from "react-router-dom";
import { MyContext } from "../components/providers/HotelProvider";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    height: "100vh"
  },
  link: {
    textDecoration: "none",
    color: "black",
    height: "100%"
  },

  btn: {
    marginTop: "2rem"
  },

  form: {
    display: "flex",
    flexDirection: "column"
  },
  card: {
    minWidth: 275,
    maxWidth: 400,
    padding: "3rem",
    boxSizing: "content-box",
    marginTop: "-10vh"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  cardFooter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    marginBottom: "1rem"
  }
};

class City extends React.Component {
  state = {
    location: {
      Krakow: {
        lng: 19.93689,
        lat: 50.062342
      },
      Warszawa: {
        lng: 21.023423,
        lat: 52.23239
      }
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Container maxWidth="xl" className={classes.container}>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                variant="h5"
                component="h2"
                className={classes.header}
              >
                Wybierz miasto które chcesz odwiedzić
              </Typography>
              <MyContext.Consumer>
                {context => (
                  <React.Fragment>
                    <FormControl className={classes.form}>
                      <InputLabel>Miasto</InputLabel>
                      <NativeSelect
                        onChange={e => {
                          context.setCity(e.target.value);
                          switch (e.target.value) {
                            case "Krakow":
                              context.setMapCenter(
                                this.state.location.Krakow.lat,
                                this.state.location.Krakow.lng
                              );
                              break;
                            case "Warszawa":
                              context.setMapCenter(
                                this.state.location.Warszawa.lat,
                                this.state.location.Warszawa.lng
                              );
                              break;
                            default:
                              context.setMapCenter(
                                this.state.location.Krakow.lat,
                                this.state.location.Krakow.lng
                              );
                          }
                        }}
                      >
                        <option value="" />
                        <option value="Krakow">Krakow</option>
                        <option value="Warszawa">Warszawa</option>
                      </NativeSelect>
                    </FormControl>
                  </React.Fragment>
                )}
              </MyContext.Consumer>
            </CardContent>
            <CardActions className={classes.cardFooter}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.btn}
                onClick={() => {
                  this.props.history.push("/hotels");
                }}
              >
                Dalej
              </Button>
            </CardActions>
          </Card>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(City));
