import React from "react";
import { connect } from "react-redux";
import { reducer7 } from "../app/store";
import "./HomeContent1.scss";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";

function HomeContent1(props) {
  const link = {
    "content1-img-1": "lipstick",
    "content1-img-2": "liquid",
    "content1-img-3": "gloss",
    "content1-img-4": "care",
  };

  return (
    <div className="content-wrap">
      <div className="content-box">
        <div className="deg90">
          <span>CHANEL_BEAUTY</span>
        </div>
        <div className="content-img-wrap">
          <Link
            to={`/${
              props.selectedImg === "content1-img-1"
                ? link["content1-img-1"]
                : props.selectedImg === "content1-img-2"
                ? link["content1-img-2"]
                : props.selectedImg === "content1-img-3"
                ? link["content1-img-3"]
                : props.selectedImg === "content1-img-4"
                ? link["content1-img-4"]
                : ""
            }`}
          >
            <div className={`content-img-box ${props.selectedImg}`}></div>
          </Link>
        </div>

        <div className="btn-box">
          <div className="content-text-wrap">
            {props.selectedImg === "content1-img-1" && <span>Lipstick</span>}
            {props.selectedImg === "content1-img-2" && <span>Liquid</span>}
            {props.selectedImg === "content1-img-3" && <span>Lip Gloss</span>}
            {props.selectedImg === "content1-img-4" && <span>Lip Care</span>}
          </div>
          <div className="btn-wrap-home">
            <button
              className="slide-btn"
              onClick={() => {
                props.dispatch({ type: "minus" });
              }}
            >
              <BsFillArrowLeftCircleFill />
            </button>
            <button
            style={{marginLeft:"10%"}}
              className="slide-btn"
              onClick={() => {
                props.dispatch({ type: "plus" });
              }}
            >
              <BsFillArrowRightCircleFill />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function stateprops(state) {
  return {
    selectedImg: state.reducer7,
  };
}

export default connect(stateprops)(HomeContent1);
