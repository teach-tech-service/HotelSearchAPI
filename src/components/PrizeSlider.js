import "rc-slider/assets/index.css";

import React from "react";
import ReactDOM from "react-dom";
import Slider from "rc-slider";

const Range = Slider.Range;

const style = { width: 400, margin: 50 };

function log(value) {}

export default class CustomizedRange extends React.Component {
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
        return (
            <div>
                <h1>Cena za hotel:</h1>
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

class DynamicBounds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            min: 0,
            max: 100
        };
    }
    onSliderChange = value => {
        log(value);
    };
    onMinChange = e => {
        this.setState({
            min: +e.target.value || 0
        });
    };
    onMaxChange = e => {
        this.setState({
            max: +e.target.value || 100
        });
    };
    render() {
        return <p />;
    }
}

class ControlledRange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [20, 40, 60, 80]
        };
    }
    handleChange = value => {
        this.setState({
            value
        });
    };
    render() {
        return <Range value={this.state.value} onChange={this.handleChange} />;
    }
}
