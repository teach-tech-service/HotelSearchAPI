import React from "react";

export default function HotelItem(props) {
    return (
        <li
            className="items__item"
            onClick={e => {
                props.test1(e);
            }}
        >
            <div className="item__info">
                <p className="item__address">
                    <span>
                        <b>{props.name}</b>
                    </span>
                    <span>Cena za dobe: {props.prize}</span>
                    <span>Odległość od centrum: {props.distance}km</span>
                </p>
            </div>
        </li>
    );
}
