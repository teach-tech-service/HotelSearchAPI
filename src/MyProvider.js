import React from "react";

export const MyContext = React.createContext();

export class MyProvider extends React.Component {
    state = {
        city: "Krakow"
    };

    render() {
        return (
            <MyContext.Provider
                value={{
                    state: this.state,
                    setCity: city1 => {
                        this.setState({ city: city1 });
                    }
                }}
            >
                {this.props.children}
            </MyContext.Provider>
        );
    }
}
