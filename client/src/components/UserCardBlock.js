import React from "react";
import "./UserCardBlock.scss";
import { AiOutlineEye, AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

function UserCardBlock(props) {
    const renderCartImage = (images) => {
        if (images.length > 0) {
            let domain =
                window.location.protocol + "//" + window.location.hostname;
            let image = images[0];
            return `${domain}:5000/${image}`;
        }
    };

    const linkStyle = {
        color: "inherit",
        textDecoration: "none",
    };

    return (
        <div className="card-top-wrap">
            <div className="card-title">
                {props.ShowTotal && <h3>나의 쇼핑백</h3>}
            </div>
            {props.products &&
                props.products.map((product, index) => {
                    return (
                        <div className="card-wrap">
                            <Link
                                to={`/product/${product._id}`}
                                className="card-left"
                            >
                                <div>
                                    <img
                                        src={renderCartImage(product.images)}
                                        alt=""
                                    ></img>
                                </div>
                            </Link>
                            <div className="card-right">
                                <div className="card-right-top">
                                    <h3>{product.title}</h3>
                                </div>
                                <div className="card-right-mid">
                                    <div className="card-right-mid-top">
                                        <div
                                            className="color-circle"
                                            style={{
                                                backgroundColor: product.color,
                                                borderRadius: "10px",
                                                width: "20px",
                                                height: "20px",
                                            }}
                                        ></div>
                                        <span> {product.quantity} EA</span>
                                    </div>
                                    <div className="card-right-mid-bottom">
                                        <span>
                                            {" "}
                                            {product.price *
                                                product.quantity}{" "}
                                            원
                                        </span>
                                    </div>
                                </div>
                                <div className="card-right-bottom">
                                    <Link
                                        to={`/product/${product._id}`}
                                        style={linkStyle}
                                    >
                                        <div>
                                            <span>
                                                <AiOutlineEye /> 상세보기
                                            </span>
                                        </div>
                                    </Link>
                                    <div
                                        className="card-right-bottom-btn"
                                        onClick={() =>
                                            props.removeItem(product._id)
                                        }
                                    >
                                        <span>
                                            <AiOutlineCloseCircle /> 삭제하기
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

export default UserCardBlock;
