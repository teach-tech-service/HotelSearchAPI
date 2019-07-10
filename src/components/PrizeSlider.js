import "rc-slider/assets/index.css";
import { withStyles } from "@material-ui/core";
import React from "react";
import Slider from "rc-slider";

const Range = Slider.Range;

const styles = {
    header: {
        textAlign: "center"
    },
    priceDiv: {
        width: "80%"
    }
};

class CustomizedRange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lowerBound: 20,
            upperBound: 40,
            value: [20, 40]
        };
    }
    onLowerBoundChange = e => {
        this.setState({ lowerBound: +e.target.value });
    };
    onUpperBoundChange = e => {
        this.setState({ upperBound: +e.target.value });
    };
    onSliderChange = value => {
        //console.log(value);
        this.setState(
            {
                value
            },
            () => {
                this.props.onChange(value);
            }
        );
    };
    handleApply = () => {
        const { lowerBound, upperBound } = this.state;
        this.setState({ value: [lowerBound, upperBound] });
    };
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.priceDiv}>
                <h1 className={classes.header}>Cena za hotel:</h1>
                <p>Min: {this.state.value[0] * 10}</p>
                <p>Max: {this.state.value[1] * 10}</p>
                <Range
                    allowCross={false}
                    value={this.state.value}
                    onChange={this.onSliderChange}
                />
            </div>
        );
    }
}

export default withStyles(styles)(CustomizedRange);
