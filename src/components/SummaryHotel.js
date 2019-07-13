import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";

const styles = {
  info: {
    padding: "50px 20px",
    width: "100%"
  }
};

export default withStyles(styles)(props => {
  const { classes } = props;
  return props.name ? (
    <div className={`items__item ${props.isSelected ? "checked" : null}`}>
      <div className="item_info">
        <p className="item__address">
          <span>
            <b>{props.name}</b>
          </span>
          <span>Cena za dobe: {props.prize}</span>
          <span>Odległość od centrum: {props.distance}km</span>
        </p>
      </div>
    </div>
  ) : (
    <div className={`items__item`}>
      <Typography variant="h6" component="h2" className={classes.info}>
        Nie wybrałeś hotelu
      </Typography>
    </div>
  );
});
