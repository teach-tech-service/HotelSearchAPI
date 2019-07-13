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

const City = props => {
  const { classes, history } = props;
  return (
    <React.Fragment>
      <MyContext.Consumer>
        {context => (
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

                <React.Fragment>
                  <FormControl className={classes.form}>
                    <InputLabel>Miasto</InputLabel>
                    <NativeSelect
                      onChange={e => {
                        context.setCity(e.target.value);
                        switch (e.target.value) {
                          case "Krakow":
                            context.setMapCenter(50.062342, 19.93689);
                            break;
                          case "Warszawa":
                            context.setMapCenter(52.23239, 21.023423);
                            break;
                          default:
                            context.setMapCenter(50.062342, 19.93689);
                        }
                      }}
                    >
                      <option value="" />
                      <option value="Krakow">Krakow</option>
                      <option value="Warszawa">Warszawa</option>
                    </NativeSelect>
                  </FormControl>
                </React.Fragment>
              </CardContent>
              <CardActions className={classes.cardFooter}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.btn}
                  onClick={() => {
                    history.push(`/hotels`);
                  }}
                >
                  Dalej
                </Button>
              </CardActions>
            </Card>
          </Container>
        )}
      </MyContext.Consumer>
    </React.Fragment>
  );
};

export default withStyles(styles)(withRouter(City));
