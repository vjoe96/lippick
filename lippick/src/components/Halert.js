import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Transition } from "react-transition-group";
import "./Halert.scss";

function Halert(props) {
    useEffect(() => {
      let timer = setTimeout(() => {
        props.dispatch({ type: "hAlert-off" });
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }, []);
  return (
    <div className="halert-wrap">
      <Transition in={props.hAlert} appear={props.hAlert} timeout={50}>
        {(status) => (
          <div className={`heart-alert hAlert-${status}`}>
            <span>위시리스트에 추가되었습니다.</span>
          </div>
        )}
      </Transition>
    </div>
  );
}

function stateprops(state) {
  return {
    hAlert: state.reducer14,
  };
}
export default connect(stateprops)(Halert);
