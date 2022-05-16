import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./MainBottom.scss";
import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from "react-icons/bs";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

function MainBottom(props) {
    let userid;

    const personalAuth = () => {
        getUserid();
        if (userid === "false") {
            alert("로그인 후 이용해주세요.");
            return props.history.push("/home");
        }
        props.history.push("/personal");
    };

    return (
        <div className="high-wrap">
            <Container className="main-bottom-wrap">
                <Link onClick={personalAuth}>
                    <div className="link-box">
                        <span>퍼스널 컬러 테스트</span>
                    </div>
                </Link>
                <div className="icon-box">
                    {props.muted ? (
                        <BsFillVolumeMuteFill
                            onClick={() => {
                                props.dispatch({ type: "vol" });
                            }}
                        />
                    ) : (
                        <BsFillVolumeUpFill
                            onClick={() => {
                                props.dispatch({ type: "mute" });
                            }}
                        />
                    )}
                    {props.playing ? (
                        <AiFillPauseCircle
                            onClick={() => {
                                props.dispatch({ type: "pause" });
                            }}
                        />
                    ) : (
                        <AiFillPlayCircle
                            onClick={() => {
                                props.dispatch({ type: "play" });
                            }}
                        />
                    )}
                </div>
            </Container>
        </div>
    );

    function getUserid() {
        userid = sessionStorage.getItem("userId");
    }
}

function stateprops(state) {
    return {
        playing: state.reducer3,

        muted: state.reducer4,
    };
}

export default withRouter(connect(stateprops)(MainBottom));
