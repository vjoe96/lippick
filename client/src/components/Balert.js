import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Transition } from "react-transition-group";
import "./Halert.scss";

function Balert(props) {
    useEffect(() => {
      let timer = setTimeout(() => {
        props.dispatch({ type: "bAlert-off" });
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }, []);
  return (
    <div className="halert-wrap">
      <Transition in={props.bAlert} appear={props.bAlert} timeout={50}>
        {(status) => (
          <div className={`heart-alert hAlert-${status}`}>
            <span>쇼핑백에 추가되었습니다.</span>
          </div>
        )}
      </Transition>
    </div>
  );
}

function stateprops(state) {
  return {
    bAlert: state.reducer15,
  };
}
export default connect(stateprops)(Balert);
