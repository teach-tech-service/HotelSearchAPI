import React from "react";

export default props => {
  return (
    <div className={`items__item ${props.isSelected ? "checked" : null}`}>
      <div className="item__info">
        <p className="item__address">
          <span>
            <b>{props.name}</b>
          </span>
          <span>Cena: {props.prize}</span>
        </p>
      </div>
    </div>
  );
};
