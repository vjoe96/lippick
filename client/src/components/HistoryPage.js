import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./HistoryPage.scss";
import { AiOutlineEye, AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";

function HistoryPage(props) {
    useEffect(() => {
        props.dispatch({ type: "nav-on" });
    }, [props.navTG]);

    const linkStyle = {
        color: "inherit",
        textDecoration: "none",
        flex: "1",
    };
    let domain = window.location.protocol + "//" + window.location.hostname;
    return (
        <div className="history-top-wrap">
            <div className="history-wrap">
                <div className="history-card-title">
                    <h3>나의 주문내역</h3>
                    <span>
                        {props.user.userData &&
                            props.user.userData.history.length}{" "}
                        상품
                    </span>
                </div>
                <div className="history-card-top-wrap">
                    {props.user.userData &&
                        props.user.userData.history.map((item) => {
                            return (
                                <div className="history-card-wrap">
                                    <Link
                                        to={`/product/${item.id}`}
                                        style={linkStyle}
                                        className="link-1"
                                    >
                                        <div className="history-card-left">
                                            <img
                                                src={`${domain}:5000/${item.image}`}
                                                alt="이미지 삽입"
                                            />
                                        </div>
                                    </Link>

                                    <div className="history-card-right">
                                        <div className="history-card-right-top">
                                            <h3>{item.name}</h3>
                                        </div>
                                        <div className="history-card-right-mid">
                                            <div className="history-card-right-mid-top">
                                                <div
                                                    className="color-circle"
                                                    style={{
                                                        backgroundColor:
                                                            item.color,
                                                        borderRadius: "10px",
                                                        width: "20px",
                                                        height: "20px",
                                                    }}
                                                ></div>
                                                <span> {item.quantity} EA</span>
                                            </div>
                                            <div className="history-card-right-mid-bottom">
                                                <span> {item.price} 원</span>
                                            </div>
                                        </div>
                                        <div className="history-card-right-bottom">
                                            <Link
                                                to={`/product/${item.id}`}
                                                style={linkStyle}
                                                className="link-2"
                                            >
                                                <div>
                                                    <span>
                                                        <AiOutlineEye /> 주문
                                                        제품 상세보기
                                                    </span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

function stateprops(state) {
    return {
        navTG: state.reducer1,
    };
}
export default connect(stateprops)(HistoryPage);
