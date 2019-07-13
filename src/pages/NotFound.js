import React from "react";
import "./../App.css";
import { withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
//import ZoomIn from "@bit/mui-org.material-ui-icons.zoom-in";

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
    },
    content: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
};

const NotFound = props => {
    const { classes } = props;
    return (
        <React.Fragment>
            <Container maxWidth="xl" className={classes.container}>
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <Typography
                            variant="h5"
                            component="h2"
                            className={classes.header}
                        >
                            Nie znaleziono strony
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.cardFooter}>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.btn}
                            onClick={() => {
                                props.history.push(`/`);
                            }}
                        >
                            Powrót do strony głównej
                        </Button>
                    </CardActions>
                </Card>
            </Container>
        </React.Fragment>
    );
};

export default withStyles(styles)(withRouter(NotFound));
