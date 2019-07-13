import React from "react";

export default props => {
  return (
    <li
      className="items__item"
      onClick={e => {
        props.showBtn(e);
        props.onClick(props);
      }}
    >
      <div className="item__info">
        <p className="item__address">
          <span>
            <b>{props.name}</b>
          </span>
          <span>Cena: {props.prize}</span>
        </p>
      </div>
    </li>
  );
};
