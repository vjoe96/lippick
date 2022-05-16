import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
    getCartItems,
    removeCartItem,
    onSuccessBuy,
} from "../_actions/user_actions";
import UserCardBlock from "./UserCardBlock";
import Paypal from "./Paypal";
import { Empty, Result } from "antd";
import "./BagPage.scss";
import { GoCreditCard } from "react-icons/go";
import { RiTruckLine } from "react-icons/ri";
import { GiTrade } from "react-icons/gi";
import { AiOutlineGift } from "react-icons/ai";

function BagPage(props) {
    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0);
    const [CartNumber, setCartNumber] = useState(0);
    const [ShowTotal, setShowTotal] = useState(false);
    const [ShowSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        props.dispatch({ type: "nav-on" });
    }, [props.navTG]);

    useEffect(() => {
        let cartItems = [];

        // 리덕스 User State안에 cart 안에 상품이 들어있는지 확인
        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach((item) => {
                    cartItems.push(item.id);
                });

                dispatch(
                    getCartItems(cartItems, props.user.userData.cart)
                ).then((response) => {
                    calculateTotal(response.payload);
                });
            }
        }
    }, [props.user.userData]);
    // useEffect(() => {
    //     bagGet();
    // }, [ShowSuccess, ShowTotal]);
    let calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map((item) => {
            total += parseInt(item.price, 10) * item.quantity;
        });
        setTotal(total);
        setShowTotal(true);
    };

    let cartNum = (cartDetail) => {
        let total = 0;

        cartDetail.map((item) => {
            total += parseInt(item.quantity, 10);
        });
        setCartNumber(total);
    };

    let bagGet = () => {
        for (let i = 0; i++; i < 30) {
            setTimeout(() => {
                dispatch({ type: "bag-get" });
            }, i * 250);
        }
    };

    let removeFromCart = (productId) => {
        // dispatch({ type: "bag-get" });
        dispatch(removeCartItem(productId)).then((response) => {
            if (response.payload.productInfo.length <= 0) {
                setShowTotal(false);
            }
            bagGet();
        });
    };

    const transactionSuccess = (data) => {
        dispatch(
            onSuccessBuy({
                paymentData: data,
                cartDetail: props.user.cartDetail,
            })
        ).then((response) => {
            if (response.payload.success) {
                dispatch({ type: "bag-remove" });
                setShowTotal(false);
                setShowSuccess(true);
            }
        });
    };

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={`bag-wrap show-${ShowTotal}`}>
                <div className="bag-left-wrap">
                    <UserCardBlock
                        products={props.user.cartDetail}
                        removeItem={removeFromCart}
                        ShowTotal={ShowTotal}
                        onClick={() => {}}
                    />
                </div>
                <div className="bag-right-wrap">
                    {ShowTotal ? (
                        <div className="bag-right-top">
                            <div className="span-wrap">
                                <span>합계</span>{" "}
                                <span style={{ fontWeight: "500" }}>
                                    {Total} 원
                                </span>
                            </div>
                            <div className="span-wrap">
                                <span>배송</span>{" "}
                                <span style={{ fontWeight: "500" }}>0 원</span>
                            </div>
                            <div
                                className="span-wrap"
                                style={{ marginTop: "5%", marginBottom: "5%" }}
                            >
                                <span>총액</span>{" "}
                                <span style={{ fontWeight: "500" }}>
                                    {Total} 원
                                </span>
                            </div>
                        </div>
                    ) : ShowSuccess ? (
                        <div>
                            <Result status="success" />
                            <pre
                                style={{
                                    fontSize: "0.9rem",
                                    paddingLeft: "10px",
                                    overflow: "auto",
                                    whiteSpace: "pre-wrap",
                                    minWidth: "170px",
                                }}
                            >
                                결제가 완료되었습니다.
                            </pre>
                        </div>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Empty
                                description={false}
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                            <pre
                                style={{
                                    fontSize: "0.9rem",
                                    paddingLeft: "15px",
                                    overflow: "auto",
                                    whiteSpace: "pre-wrap",
                                    minWidth: "190px",
                                }}
                            >
                                쇼핑백이 비어있습니다.
                            </pre>
                        </div>
                    )}

                    {ShowTotal && (
                        <Paypal
                            className="paypal-wrap"
                            total={(Total / 1243.5).toFixed(2)}
                            onSuccess={transactionSuccess}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        />
                    )}

                    {ShowTotal && (
                        <div className="bag-right-bottom">
                            <div
                                className="bag-right-item"
                                onClick={() => {
                                    props.dispatch({ type: "modal-1" });
                                }}
                            >
                                <div className="bag-right-item-left">
                                    <GoCreditCard />
                                </div>
                                <div className="bag-right-item-right">
                                    <span>결제 안내</span>
                                    <span>Paypal</span>
                                </div>
                            </div>
                            <div
                                className="bag-right-item"
                                onClick={() => {
                                    props.dispatch({ type: "modal-2" });
                                }}
                            >
                                <div className="bag-right-item-left">
                                    <RiTruckLine />
                                </div>
                                <div className="bag-right-item-right">
                                    <span>배송 안내</span>
                                    <span>무료 배송 서비스</span>
                                </div>
                            </div>
                            <div
                                className="bag-right-item"
                                onClick={() => {
                                    props.dispatch({ type: "modal-3" });
                                }}
                            >
                                <div className="bag-right-item-left">
                                    <GiTrade />
                                </div>
                                <div className="bag-right-item-right">
                                    <span>교환 및 환불 정책</span>
                                    <span>
                                        7일 이내에 반품 또는 14일 이내에 교환
                                        가능
                                    </span>
                                </div>
                            </div>
                            <div
                                className="bag-right-item"
                                onClick={() => {
                                    props.dispatch({ type: "modal-4" });
                                }}
                            >
                                <div className="bag-right-item-left">
                                    <AiOutlineGift />
                                </div>
                                <div className="bag-right-item-right">
                                    <span>선물 포장</span>
                                    <span>무료 선물 포장 서비스 제공</span>
                                </div>
                            </div>
                        </div>
                    )}
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
export default connect(stateprops)(BagPage);
