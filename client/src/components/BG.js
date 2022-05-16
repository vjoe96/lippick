import React from "react";
import { connect } from "react-redux";

function BG(props) {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.7)",
        zIndex: "920",
      }}
      onClick={(e) => {
        props.dispatch({ type: "bg-off" });

        props.dispatch({ type: "nav-off" });

        props.dispatch({ type: "expand-off" });

        props.dispatch({ type: "login-off" });
        props.dispatch({ type: "play" });
        props.searchClickHandler(null);
      }}
    ></div>
  );
}

function stateprops(state) {
  return {
    bg: state.reducer6,
    expand: state.reducer5,
    myTG: state.reducer8,
  };
}

export default connect(stateprops)(BG);
