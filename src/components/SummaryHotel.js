import React from "react";

export default function summaryHotel(props) {
    return (
        <li className={`items__item ${props.isSelected ? "checked" : null}`}>
            <div className="item_info">
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
