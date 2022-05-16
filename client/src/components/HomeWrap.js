import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import HomeContent1 from "./HomeContent1";
import HomeContent2 from "./HomeContent2.js";
import HomeMain from "./HomeMain";
import "./HomeWrap.scss";

function HomeWrap(props) {
  useEffect(() => {
    props.dispatch({ type: "footer-down" });

    return () => {
      props.dispatch({ type: "footer-up" });
    };
  }, []);

  return (
    <Container className="home-wrap">
      <HomeMain />
      <HomeContent1 />
      <HomeContent2
        Products={props.Products}
        refreshFunction={props.refreshFunction}
      />
    </Container>
  );
}

function stateprops(state) {
  return {
    bg: state.reducer6,
    login: state.reducer8,
    footer: state.reducer11,
  };
}

export default connect(stateprops)(HomeWrap);
