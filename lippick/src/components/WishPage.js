import { getBackend } from "@tensorflow/tfjs";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
    getWishItems,
    removeWishItem,
    addToCart,
} from "../_actions/user_actions";
import "./WishPage.scss";
import { Empty } from "antd";
import Balert from "./Balert.js";

function WishPage(props) {
    const [wishShow, setWishShow] = useState(false);

    const dispatch = useDispatch();
    let bagGet = () => {
        for (let i = 0; i++; i < 6) {
            setTimeout(() => {
                dispatch({ type: "bag-get" });
            }, i * 250);
        }
    };
    useEffect(() => {
        props.dispatch({ type: "nav-on" });
    }, [props.navTG]);
    useEffect(() => {
        let wishItems = [];

        if (props.user.userData && props.user.userData.wish) {
            if (props.user.userData.wish.length > 0) {
                props.user.userData.wish.forEach((item) => {
                    wishItems.push(item.id);
                });

                dispatch(getWishItems(wishItems, props.user.userData.wish));
                setWishShow(true);
            } else {
                setWishShow(false);
            }
        }
    }, [props.user.userData]);

    let removeFromWish = (productId) => {
        dispatch(removeWishItem(productId)).then((response) => {});
    };

    let removeAndCart = (productId) => {
        dispatch(removeWishItem(productId)).then(
            dispatch(addToCart(productId))
        );
        bagGet();
        props.dispatch({type:"bAlert-on"});
    };

    return (
        <div className="wish-top-wrap">
            {wishShow ? (
                <div>
                    <h3>나의 위시리스트</h3>
                    {props.bAlert && <Balert/>}
                    <div className="wish-wrap">
                        {props.user &&
                            props.user.wishDetail &&
                            props.user.wishDetail.map((item) => {
                                return (
                                    <div
                                        key={item._id}
                                        className="wish-item-wrap"
                                    >
                                        <div className="wish-item-top">
                                            <button
                                                className="wish-btn-removeFromWish"
                                                onClick={() =>
                                                    removeFromWish(item._id)
                                                }
                                            >
                                                &times;
                                            </button>
                                            <img
                                                src={`http://localhost:5000/${item.images[0]}`}
                                                alt="product"
                                            />
                                        </div>
                                        <div className="wish-item-bottom">
                                            <div className="wish-item-title">
                                                <span>{item.title}</span>
                                            </div>
                                            <div className="wish-item-info">
                                                <div className="wish-item-info-top">
                                                    <span>{item.price} 원</span>
                                                </div>

                                                <div className="wish-item-info-bottom">
                                                    <span>
                                                        {item.tone}&nbsp;
                                                        {item.category}
                                                    </span>
                                                    <div
                                                        className="wish-item-circle"
                                                        style={{
                                                            backgroundColor:
                                                                item.color,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>

                                            <button
                                                className="wish-btn-removeAndCart"
                                                onClick={() =>
                                                    removeAndCart(item._id)
                                                }
                                            >
                                                장바구니에 추가하기
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            ) : (
                <div className="wish-empty">
                    <Empty
                        description={false}
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                    <span
                        style={{
                            fontSize: "0.9rem",
                        }}
                    >
                        위시리스트가 비어있습니다.
                    </span>
                </div>
            )}
        </div>
    );
}
function stateprops(state) {
    return {
        navTG: state.reducer1,
        bAlert: state.reducer15,
    };
}

export default connect(stateprops)(WishPage);
