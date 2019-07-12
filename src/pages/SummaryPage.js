import React from "react";
import "./../App.css";
import { MyContext } from "../components/providers/HotelProvider";
import SummaryAttr from "./../components/SummaryAttr";
import SummaryHotel from "./../components/SummaryHotel";
import { withStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";

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
    width: "100%",
    maxWidth: 600,
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
  },
  info: {
    padding: "50px 20px",
    width: "100%"
  }
};

const Summary = props => {
  const { classes, history } = props;
  return (
    <MyContext.Consumer>
      {({ state: { hotelPrize, attractions, hotelName, hotelDistance } }) => (
        <Container maxWidth="xl" className={classes.container}>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                variant="h5"
                component="h2"
                className={classes.header}
              >
                Podsumowanie:
              </Typography>
              <Typography variant="h6">Wybrałeś hotel:</Typography>
              <SummaryHotel
                name={hotelName}
                distance={hotelDistance}
                prize={hotelPrize}
              />
              <Typography variant="h6">Wybrałeś atrakcje:</Typography>
              <div
                className="attr"
                style={{
                  overflowY: attractions.length !== 0 ? "scroll" : "hidden"
                }}
              >
                {attractions.length !== 0 ? (
                  attractions.map(item => {
                    return (
                      <SummaryAttr
                        key={`key ${item.id}`}
                        name={item.name}
                        prize={item.prize}
                      />
                    );
                  })
                ) : (
                  <div className={`items__item`}>
                    <Typography
                      variant="h6"
                      component="h2"
                      className={classes.info}
                    >
                      Nie wybrałeś atrakcji
                    </Typography>
                  </div>
                )}
              </div>
              <div className="summary-btns">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/")}
                >
                  Wybierz miasto
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/hotels")}
                >
                  Wybierz hotel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/atractions")}
                >
                  Wybierz atrakcje
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      )}
    </MyContext.Consumer>
  );
};

export default withStyles(styles)(withRouter(Summary));
