import React from "react";
import "./Nav.scss";
import lippick02 from "../img/lippick02.png"

function Nav() {
  return (
    <div className="nav-container">

        <div className="logobox">
            <img src={lippick02} alt="logo"/>
        </div>
    </div>
  );
}

export default Nav;
