import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Card, Row, Button } from "antd";
import Meta from "antd/lib/card/Meta";
import { connect } from "react-redux";
import "./Landing.scss";
import { Link } from "react-router-dom";
import Loading from "./Loading";

function LandingLiquid(props) {
    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState(0);

    const linkStyle = {
        color: "inherit",
        textDecoration: "none",
        maxHeight: "75px",
    };
    let domain = window.location.protocol + "//" + window.location.hostname;
    useEffect(() => {
        props.dispatch({ type: "nav-on" });
    }, [props.navTG]);

    useEffect(() => {
        let body = {
            skip: Skip,
            limit: Limit,
        };

        getProducts(body);
    }, []);

    const getProducts = (body) => {
        axios.post("/api/product/liquid", body).then((response) => {
            if (response.data.success) {
                if (body.loadMore) {
                    setProducts([...Products, ...response.data.productInfo]);
                } else {
                    setProducts(response.data.productInfo);
                }
                setPostSize(response.data.postSize);
            } else {
                alert(" 상품 가져오기 실패 ");
            }
        });
    };

    const loadMoreHandler = () => {
        let skip = Skip + Limit;
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true,
        };

        getProducts(body);
    };

    const renderCards = Products.map((product, index) => {
        props.dispatch({ type: "loading-end" });
        return (
            <Col
                lg={6}
                md={8}
                xs={24}
                key={index}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <Link
                    to={`./product/${product._id}`}
                    style={{ linkStyle, textDecoration: "none" }}
                >
                    <Card
                        cover={
                            <img src={`${domain}:5000/${product.images[0]}`} />
                        }
                    ></Card>
                </Link>

                <div className="product-content-wrap">
                    <Link
                        to={`./product/${product._id}`}
                        style={{ linkStyle, textDecoration: "none" }}
                    >
                        <span
                            className="product-title"
                            style={{ color: "#333" }}
                        >
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
                            marginTop: "1vh",
                        }}
                    ></div>
                    <span className="product-tone" style={{ marginTop: "1vh" }}>
                        {product.tone}
                    </span>
                    <span
                        className="product-price"
                        style={{ marginTop: "1vh" }}
                    >
                        {product.price} 원
                    </span>
                </div>
            </Col>
        );
    });

    return (
        <div style={{ width: "100%" }}>
            {props.loading ? (
                <Loading />
            ) : (
                <div>
                    <div className="bg-wrap">
                        <div className="bg bg-liquid">
                            <span
                                className="bg-title-1"
                                style={{
                                    position: "absolute",
                                    color: "#333",
                                    fontWeight: "500",
                                    fontSize: "2rem",
                                    left: "70%",
                                    top: "45%",
                                }}
                            >
                                리퀴드
                            </span>
                        </div>
                        <div className="content-text">
                            <span className="bg-title-2">리퀴드</span>
                            <span style={{ fontSize: "0.8rem" }}>
                                풍부한 컬러를 선사하는 리퀴드 립 컬러. 오래도록
                                강렬하고 선명한 메이크업 룩을 유지할 수
                                있습니다.
                            </span>
                        </div>
                    </div>

                    <div
                        style={{
                            width: "75%",
                            margin: "2% auto 3rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                width: "100%",
                            }}
                        >
                            <span
                                style={{
                                    float: "right",
                                    marginBottom: "1vh",
                                    fontSize: "0.8rem",
                                    fontWeight: "200",
                                }}
                            >
                                {Products.length} 상품
                            </span>
                        </div>
                        <Row gutter={[16, 16]}>{renderCards}</Row>

                        {PostSize >= Limit && (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Button onClick={loadMoreHandler}>
                                    더보기
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function stateprops(state) {
    return {
        navTG: state.reducer1,
        loading: state.reducer12,
    };
}

export default connect(stateprops)(LandingLiquid);
