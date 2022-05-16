import React, { useState, useEffect } from "react";
import "./BootNav.scss";
import { Navbar, Container, Nav } from "react-bootstrap";
import { ReactComponent as Lippick } from "../img/lippick4.svg";
import { BiSearchAlt } from "react-icons/bi";
import { connect } from "react-redux";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { getCookie } from "../cookies";
import { withRouter } from "react-router-dom";
import UploadProduct from "./UploadProduct";
import { Badge } from "antd";

function BootNav(props) {
    let [dropTG, setDropTG] = useState(false);
    let [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        axios.get("/api/users/auth").then((response) => {
            setIsAuth(response.data.isAuth);
        });
    }, []);
    useEffect(() => {
        sessionStorage.setItem("userId", isAuth);
    }, [isAuth]);

    useEffect(() => {
        getBag(props);
    }, [props]);

    const linkStyle = {
        color: "inherit",
        textDecoration: "none",
    };

    const onClickHandler = () => {
        axios.get("/api/users/logout").then((response) => {
            alert("로그아웃 되었습니다.");
            setIsAuth(false);
            sessionStorage.clear();
            props.history.push("/home");
        });
    };

    const bagPageAuth = () => {
        if (isAuth === false) {
            alert("로그인 후 이용해주세요.");
            return props.history.back(1);
        }
        props.history.push("/bag");
    };

    const WishAuth = () => {
        if (isAuth === false) {
            alert("로그인 후 이용해주세요.");
            return props.history.back(1);
        }
        props.history.push("/wishlist");
    };

    const mouseLeave = () => {
        props.dispatch({ type: "nav-off" });
    };
    return (
        <>
            <Navbar
                bg="light"
                variant="light"
                className={`${props.navTG ? "navON" : "nav-wrap"}`}
                id="nav-bar"
            >
                <Container className="nav-container">
                    <button
                        className={`search-btn ${props.navTG ? "cb" : "cw"}`}
                        onClick={() => {
                            props.dispatch({ type: "expand-on" });
                            props.dispatch({ type: "bg-on" });
                        }}
                    >
                        <BiSearchAlt />
                        <span>검색</span>
                    </button>
                    <div className="logo-wrap">
                        <Link
                            to="/home"
                            style={linkStyle}
                            onClick={() => {
                                props.dispatch({ type: "nav-off" });
                            }}
                        >
                            <Navbar.Brand>
                                <div className="logo-box">
                                    <Lippick
                                        className={`${
                                            props.navTG ? "fb" : "fw"
                                        }`}
                                    />
                                </div>
                            </Navbar.Brand>
                        </Link>

                        <div
                            className={`logo-menu ${props.navTG ? "cb" : "cw"}`}
                        >
                            <Link to="/lipstick" style={linkStyle}>
                                <span>립스틱</span>
                            </Link>
                            <Link to="/liquid" style={linkStyle}>
                                <span>리퀴드</span>
                            </Link>
                            <Link to="/gloss" style={linkStyle}>
                                <span>립 글로스</span>
                            </Link>
                            <Link to="/care" style={linkStyle}>
                                <span>립 케어</span>
                            </Link>
                        </div>
                    </div>

                    <Nav className="nav-menu">
                        {isAuth && dropTG && (
                            <div
                                className="balloon"
                                onMouseLeave={() => {
                                    setDropTG(false);
                                }}
                            >
                                <ul>
                                    <Link to="./history" style={linkStyle}>
                                        <li>
                                            <span className="balloon-item">
                                                주문내역
                                            </span>
                                        </li>
                                    </Link>
                                    <Link to="./wishlist" style={linkStyle}>
                                        <li>
                                            <span className="balloon-item">
                                                위시리스트
                                            </span>
                                        </li>
                                    </Link>
                                    <Link to="./bag" style={linkStyle}>
                                        <li>
                                            <span className="balloon-item">
                                                장바구니
                                            </span>
                                        </li>
                                    </Link>
                                    <li>
                                        <span
                                            className="balloon-item"
                                            onClick={onClickHandler}
                                        >
                                            로그아웃
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        )}
                        <Nav.Link
                            className={`nav-item ${props.navTG ? "cb" : "cw"}`}
                        >
                            <Link onClick={WishAuth} style={linkStyle}>
                                <AiOutlineHeart />
                            </Link>
                        </Nav.Link>
                        <Nav.Link
                            className={`nav-item ${props.navTG ? "cb" : "cw"}`}
                        >
                            {isAuth ? (
                                <Link
                                    to="#"
                                    style={linkStyle}
                                    onClick={() => {
                                        setDropTG(!dropTG);
                                    }}
                                >
                                    <AiOutlineUser />
                                </Link>
                            ) : (
                                <Link
                                    to="#"
                                    style={linkStyle}
                                    onClick={() => {
                                        props.dispatch({ type: "bg-on" });
                                        props.dispatch({ type: "login-on" });
                                        props.dispatch({ type: "nav-off" });
                                        props.dispatch({ type: "pause" });
                                    }}
                                >
                                    <AiOutlineUser />
                                </Link>
                            )}
                        </Nav.Link>
                        {
                            <Badge
                                size="small"
                                count={props.bagCount}
                                style={{ marginRight: 8, marginTop: 12 }}
                            >
                                <Nav.Link
                                    className={`nav-item ${
                                        props.navTG ? "cb" : "cw"
                                    }`}
                                >
                                    <Link
                                        style={linkStyle}
                                        onClick={bagPageAuth}
                                    >
                                        <BsHandbag />
                                    </Link>
                                </Nav.Link>
                            </Badge>
                        }
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

function getBag(props) {
    for (let i = 0; i++; i < 5) {
        setTimeout(() => {
            props.dispatch({ type: "bag-get" });
        }, i * 250);
    }
}

function stateprops(state) {
    return {
        navTG: state.reducer1,
        playing: state.reducer3,
        expand: state.reducer5,
        bg: state.reducer6,
        login: state.reducer8,
        bagCount: state.setBagCount,
    };
}

export default withRouter(connect(stateprops)(BootNav));
