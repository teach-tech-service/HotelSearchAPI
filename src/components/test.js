import React from "react";
import { MyContext } from "../MyProvider";
import Hotels from "../data";

let markup = "a";

export default class test extends React.Component {
    render() {
        return (
            <React.Fragment>
                <MyContext.Consumer>
                    {context => (
                        <div>
                            <h1>
                                Strona testowa, wybrae miasto:{" "}
                                {context.state.city}
                            </h1>
                        </div>
                    )}
                </MyContext.Consumer>
            </React.Fragment>
        );
    }
}
