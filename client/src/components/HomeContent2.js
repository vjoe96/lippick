import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./HomeContent2.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Lippick } from "../img/lippick4.svg";
import { reverse } from "@tensorflow/tfjs";

function HomeContent2(props) {
    const [searchTerm, setSearchTerm] = useState("");
    let domain = window.location.protocol + "//" + window.location.hostname;
    useEffect(() => {
        setSearchTerm("립스틱");
        props.refreshFunction("립스틱");
    }, []);
    const searchClickHandler = (e) => {
        if (e === null) {
            setSearchTerm("");
            props.refreshFunction("");
            console.log(e.target.innerText);
        } else {
            setSearchTerm(e.target.innerText);
            props.refreshFunction(e.target.innerText);
            console.log(e.target.innerText);
        }
    };

    const linkStyle = {
        color: "inherit",
        textDecoration: "none",
        maxHeight: "75px",
    };

    const products2 = props.Products.slice(0, 4);

    return (
        <div className="content2-wrap">
            <div className="content2-box">
                <div className="content2-title">
                    <h2>립픽 추천 제품</h2>
                </div>
                <div className="content2-tab-wrap">
                    <ul className="content2-tab">
                        <li
                            className={`${props.tab[0] && "tab-on"}`}
                            onClick={() => {
                                props.dispatch({ type: "on-1" });
                                searchClickHandler(null);
                            }}
                        >
                            립스틱
                        </li>
                        <li
                            className={`${props.tab[1] && "tab-on"}`}
                            onClick={(e) => {
                                props.dispatch({ type: "on-2" });
                                searchClickHandler(e);
                            }}
                        >
                            리퀴드
                        </li>
                        <li
                            className={`${props.tab[2] && "tab-on"}`}
                            onClick={(e) => {
                                props.dispatch({ type: "on-3" });
                                searchClickHandler(e);
                            }}
                        >
                            립글로스
                        </li>
                        <li
                            className={`${props.tab[3] && "tab-on"}`}
                            onClick={(e) => {
                                props.dispatch({ type: "on-4" });
                                searchClickHandler(e);
                            }}
                        >
                            립케어
                        </li>
                    </ul>
                </div>

                <div className="content2-contents">
                    <div className="content2-contents-right-wrap">
                        {products2.map((product) => {
                            return (
                                <div className="content2-contents-right-img">
                                    <Link to={`./product/${product._id}`}>
                                        <img
                                            src={`${domain}:5000/${product.images[0]}`}
                                            alt=""
                                        />
                                    </Link>
                                    <div className="product-content-wrap">
                                        <Link
                                            to={`./product/${product._id}`}
                                            style={linkStyle}
                                        >
                                            <span className="product-title">
                                                {product.title}
                                            </span>
                                        </Link>
                                        <div
                                            className="color-box"
                                            style={{
                                                backgroundColor: `${product.color}`,
                                                width: "20px",
                                                height: "20px",
                                                borderRadius: "10px",
                                                marginTop: "3%",
                                            }}
                                        ></div>
                                        <span className="product-tone">
                                            {product.tone}
                                        </span>
                                        <span className="product-price">
                                            {product.price} 원
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

function stateprops(state) {
    return {
        bg: state.reducer6,
        tab: state.reducer9,
    };
}

export default connect(stateprops)(HomeContent2);
