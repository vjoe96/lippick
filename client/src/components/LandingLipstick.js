import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Card, Row, Button } from "antd";
import { connect } from "react-redux";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import "./Landing.scss";

function LandingLipstick(props) {
    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState(0);

    const linkStyle = {
        color: "inherit",
        textDecoration: "none",
        maxHeight: "75px",
    };

    useEffect(() => {
        props.dispatch({ type: "nav-on" });
        props.dispatch({ type: "loading-start" });
    }, [props.navTG]);

    useEffect(() => {
        let body = {
            skip: Skip,
            limit: Limit,
        };

        getProducts(body);
    }, []);

    const getProducts = (body) => {
        axios.post("/api/product/lipstick", body).then((response) => {
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
                            <img
                                src={`http://localhost:5000/${product.images[0]}`}
                            />
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
                        <div className="bg bg-lipstick">
                            <span
                                className="bg-title-1"
                                style={{
                                    position: "absolute",
                                    color: "white",
                                    fontWeight: "500",
                                    fontSize: "2rem",
                                    left: "20%",
                                    top: "45%",
                                }}
                            >
                                립스틱
                            </span>
                        </div>
                        <div className="content-text">
                            <span className="bg-title-2">립스틱</span>
                            <span style={{ fontSize: "0.8rem" }}>
                                입술에 새로운 매력을 더하는 샤넬 립 컬러.루쥬
                                알뤼르 립스틱은 단 한 번의 클릭으로 강렬한
                                색상을 선사합니다. 은은한 컬러에서 감각적인
                                컬러까지, 다양한 컬러에서 어울리는 색상을
                                선택하세요. 부드러운 텍스처의 루쥬 코코 립스틱은
                                입술을 선명하고 매혹적인 컬러로 물들입니다.
                                루미너스에서 눈부신 샤인 효과까지의 다양한
                                피니쉬를 경험해보세요.
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

export default connect(stateprops)(LandingLipstick);
