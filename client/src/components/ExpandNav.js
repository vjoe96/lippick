import React, { useEffect, useState } from "react";
import "./ExpandNav.scss";
import { AiOutlineSearch } from "react-icons/ai";
import BG from "./BG";
import { connect } from "react-redux";
import { Transition } from "react-transition-group";
import { process_params } from "express/lib/router";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { Col, Card, Row, Button } from "antd";
import Meta from "antd/lib/card/Meta";

function ExpandNav(props) {
    const linkStyle = {
        color: "inherit",
        textDecoration: "none",
        maxHeight: "75px",
        width: "60px",
        marginRight: "3vw",
        cursor: "pointer",
    };
    let domain = window.location.protocol + "//" + window.location.hostname;
    const [searchTerm, setSearchTerm] = useState("");
    const [slideTG, setSlideTG] = useState(false);

    const searchHandler = (e) => {
        setSearchTerm(e.currentTarget.value);
        props.refreshFunction(e.currentTarget.value);
    };

    const searchClickHandler = (e) => {
        if (e === null) {
            setSearchTerm("");
            props.refreshFunction("");
        } else {
            setSearchTerm(e.target.innerText);
            props.refreshFunction(e.target.innerText);
        }
    };

    const products = props.Products.slice(0);
    const newProducts = props.Products.slice(-8);

    return (
        <div className="expand-wrap">
            {props.bg ? <BG searchClickHandler={searchClickHandler} /> : ""}

            <Transition in={props.expand} appear={props.expand} timeout={50}>
                {(status) => (
                    <div className={`expand-nav-wrap expand-${status}`}>
                        <div className="expand-top">
                            <form className="expand-form">
                                <div style={{ marginRight: "10px" }}>
                                    <AiOutlineSearch />
                                </div>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        searchHandler(e);
                                    }}
                                    placeholder="상품명을 입력해주세요."
                                />
                            </form>
                        </div>
                        <div className="expand-bottom">
                            <div className="expand-bottom-left">
                                <span
                                    style={{
                                        fontWeight: "500",
                                        marginRight: "3vw",
                                        marginTop: "5vh",
                                        fontSize: "1rem",
                                    }}
                                >
                                    샤넬 립
                                </span>

                                <span
                                    style={linkStyle}
                                    value="립스틱"
                                    onClick={(e) => {
                                        searchClickHandler(e);
                                        setSlideTG(false);
                                    }}
                                >
                                    립스틱
                                </span>

                                <span
                                    style={linkStyle}
                                    value="리퀴드"
                                    onClick={(e) => {
                                        searchClickHandler(e);
                                        setSlideTG(false);
                                    }}
                                >
                                    리퀴드
                                </span>
                                <span
                                    style={linkStyle}
                                    value="립글로스"
                                    onClick={(e) => {
                                        searchClickHandler(e);
                                        setSlideTG(false);
                                    }}
                                >
                                    립글로스
                                </span>
                                <span
                                    style={linkStyle}
                                    value="립케어"
                                    onClick={(e) => {
                                        searchClickHandler(e);
                                        setSlideTG(false);
                                    }}
                                >
                                    립케어
                                </span>
                            </div>
                            <div className="expand-bottom-right">
                                <span
                                    style={{
                                        fontWeight: "500",
                                        marginLeft: "3vw",
                                        marginTop: "5vh",
                                        marginBottom: "4vh",
                                        fontSize: "1rem",
                                    }}
                                >
                                    {searchTerm ? (
                                        "검색결과"
                                    ) : (
                                        <span>
                                            신상품 립
                                            <AiFillStar
                                                style={{
                                                    fontSize: "0.9rem",
                                                    color: "#FF5959",
                                                    marginBottom: "10px",
                                                }}
                                            />
                                        </span>
                                    )}
                                </span>

                                <div className="expand-img-wrap">
                                    {products.length === 0 ? (
                                        <span
                                            style={{
                                                marginLeft: "3vw",
                                                color: "gray",
                                                fontWeight: "300",
                                            }}
                                        >
                                            검색결과가 없습니다.
                                        </span>
                                    ) : searchTerm ? (
                                        <div>
                                            <ul className={`slide-${slideTG}`}>
                                                <li>
                                                    {products.map((product) => {
                                                        return (
                                                            <div className="expand-img-box-wrap">
                                                                <div className="expand-img-box">
                                                                    <Row>
                                                                        <Col>
                                                                            <a
                                                                                href={`/product/${product._id}`}
                                                                            >
                                                                                <Card
                                                                                    bodyStyle={{
                                                                                        padding:
                                                                                            "0",
                                                                                    }}
                                                                                    cover={
                                                                                        <img
                                                                                            src={`${domain}:5000/${product.images[0]}`}
                                                                                            alt=""
                                                                                        />
                                                                                    }
                                                                                >
                                                                                    {/* <Meta 
                                            title= {product.title}
                                        /> */}
                                                                                </Card>
                                                                            </a>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                                <span>
                                                                    {
                                                                        product.title
                                                                    }
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </li>
                                            </ul>
                                        </div>
                                    ) : (
                                        <div>
                                            <ul className={`slide-${slideTG}`}>
                                                <li>
                                                    {newProducts.map(
                                                        (product) => {
                                                            return (
                                                                <div className="expand-img-box-wrap">
                                                                    <div className="expand-img-box">
                                                                        <Row>
                                                                            <Col>
                                                                                <a
                                                                                    href={`/product/${product._id}`}
                                                                                >
                                                                                    <Card
                                                                                        bodyStyle={{
                                                                                            padding:
                                                                                                "0",
                                                                                        }}
                                                                                        cover={
                                                                                            <img
                                                                                                src={`${domain}:5000/${product.images[0]}`}
                                                                                                alt=""
                                                                                            />
                                                                                        }
                                                                                    >
                                                                                        {/* <Meta 
                                            title= {product.title}
                                        /> */}
                                                                                    </Card>
                                                                                </a>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                    <span>
                                                                        {
                                                                            product.title
                                                                        }
                                                                    </span>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {products.length > 4 && (
                                    <span className="slide-btn-wrap">
                                        {slideTG ? (
                                            <BsArrowLeftShort
                                                className="slide-btn"
                                                onClick={() => {
                                                    setSlideTG(!slideTG);
                                                }}
                                            />
                                        ) : (
                                            <BsArrowRightShort
                                                className="slide-btn"
                                                onClick={() => {
                                                    setSlideTG(!slideTG);
                                                }}
                                            />
                                        )}
                                    </span>
                                )}
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
        expand: state.reducer5,
    };
}

export default connect(stateprops)(ExpandNav);
