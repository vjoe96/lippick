import { Link, withRouter } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../_actions/user_actions";
import { connect } from "react-redux";
import BG from "./BG";
import { MdOutlineClose } from "react-icons/md";
import { Transition } from "react-transition-group";
import "./LoginPage.scss";

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };
    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password,
        };

        dispatch(loginUser(body)).then((response) => {
            if (response.payload.loginSuccess) {
                let userId = response.payload.userId;
                sessionStorage.setItem("userId", true);
                window.location.replace("/home");
            } else {
                alert("아이디와 비밀번호를 확인해주세요.");
            }
        });
    };

    return (
        <div className="login-wrap">
            {props.bg ? <BG /> : "ss"}

            <Transition in={props.login} appear={props.login} timeout={50}>
                {(status) => (
                    <div className={`login-box login-${status}`}>
                        <div className="login-box-top">
                            <h2>로그인</h2>
                            <button
                                onClick={() => {
                                    props.dispatch({ type: "bg-off" });

                                    props.dispatch({ type: "nav-off" });

                                    props.dispatch({ type: "expand-off" });

                                    props.dispatch({ type: "login-off" });
                                    props.dispatch({ type: "play" });
                                }}
                            >
                                <MdOutlineClose />
                            </button>
                        </div>
                        <div className="login-box-mid">
                            <form
                                className="login-box-mid-form"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                                onSubmit={onSubmitHandler}
                            >
                                <span className="login-box-mid-form-title mb-3">
                                    Members
                                </span>
                                <span className="mt-5">이메일*</span>
                                <input
                                    type="email"
                                    value={Email}
                                    onChange={onEmailHandler}
                                    required
                                />
                                <span className="mt-3">비밀번호*</span>
                                <input
                                    type="password"
                                    value={Password}
                                    onChange={onPasswordHandler}
                                    required
                                />
                                {/* <span className="search-pw">비밀번호찾기</span> */}
                                <button className="login-box-btn">
                                    로그인
                                </button>
                            </form>
                        </div>
                        <div className="login-box-bottom">
                            <div className="login-box-bottom-margin">
                                <span className="login-box-bottom-title mb-3">
                                    Non-Members
                                </span>
                                <span className="login-box-bottom-content mt-5">
                                    새로 오신 고객님,&nbsp;&nbsp;회원 가입을
                                    하시면 더 많은 서비스를 이용하실 수
                                    있습니다.
                                </span>
                                <div>
                                    <Link
                                        to="./register"
                                        onClick={() => {
                                            props.dispatch({ type: "bg-off" });

                                            props.dispatch({ type: "nav-on" });

                                            props.dispatch({
                                                type: "expand-off",
                                            });

                                            props.dispatch({
                                                type: "login-off",
                                            });
                                            props.dispatch({ type: "play" });
                                        }}
                                    >
                                        <button className="login-box-btn ">
                                            회원가입
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Transition>
        </div>
    );
}

function stateprops(state) {
    return {
        bg: state.reducer6,
        tap: state.reducer9,
        login: state.reducer8,
    };
}

export default withRouter(connect(stateprops)(LoginPage));
