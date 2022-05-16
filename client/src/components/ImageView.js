import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
//import "./ImageView.scss";
import { connect } from "react-redux";
import { compose } from "@reduxjs/toolkit";
import * as tmImage from "@teachablemachine/image";
import { promise } from "bcrypt/promises";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import MakeUp from "./MakeUp";
import "./ImageView.scss";
import Slider from "react-slick";

import colortest from "../img/colortest_full.png";
import loadingGIF from "../img/loading.gif";
import {
    AiOutlineCloudUpload,
    AiOutlineSmile,
    AiOutlineSync,
} from "react-icons/ai";
import { Link } from "react-router-dom";

function ImageView(props) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    let domain = window.location.protocol + "//" + window.location.hostname;
    useEffect(() => {
        props.dispatch({ type: "nav-on" });
    }, [props.navTG]);

    //teachablemachine start
    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const picRef = useRef(null);
    const canvasRef = useRef(null);

    const URL2 = "https://teachablemachine.withgoogle.com/models/LstXi4uuR/";

    let model, webcam, labelContainer, maxPredictions;
    let [loading, setLoading] = useState(false);
    const [resultTitle, setTitle] = useState("");
    const [resultExplain, setExplain] = useState("");
    // Load the image model and setup the webcam
    const modelURL = URL2 + "model.json";
    const metadataURL = URL2 + "metadata.json";
    async function init() {
        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        if (fileImage === "") {
            alert("이미지를 업로드해주세요.");
            return Promise.reject(new Error(204));
        } else {
            model = await tmImage.load(modelURL, metadataURL);
            let maxPredictions = model.getTotalClasses();
            console.log(maxPredictions);
        }
    }

    // run the webcam image through the image model
    async function predict() {
        setLoading(true);
        model = await tmImage.load(modelURL, metadataURL);
        // predict can take in an image, video or canvas html element
        const pic = document.getElementById("pic");
        const prediction = await model.predict(pic, false);
        prediction.sort(
            (a, b) => parseFloat(b.probability) - parseFloat(a.probability)
        );
        console.log(prediction[0].className);
        switch (prediction[0].className) {
            case "봄":
                setTitle("봄 웜");
                setExplain("추천 컬러 : 카멜색, 복숭아색, 골드색");
                getProductsByTone("봄웜");
                break;
            case "여름":
                setTitle("여름 쿨");
                getProductsByTone("여름쿨");
                setExplain("추천 컬러 : 라벤더색, 연분홍색, 연하늘색");
                break;
            case "가을":
                setTitle("가을 웜");
                getProductsByTone("가을웜");
                setExplain("추천 컬러 : 연회색, 검정색");
                break;
            case "겨울":
                setTitle("겨울 쿨");
                getProductsByTone("겨울쿨");
                setExplain("추천 컬러 : 골드베이지, 누드톤");
                break;
            default:
                setTitle("알수없음");
        }

        setLoading(false);
    }
    //teachablemachine end

    //파일 미리볼 url을 저장해줄 state
    const [fileImage, setFileImage] = useState("");

    // 파일 저장
    const saveFileImage = (e) => {
        setFileImage(URL.createObjectURL(e.target.files[0]));
    };

    // 파일 삭제
    const deleteFileImage = () => {
        URL.revokeObjectURL(fileImage);
        setFileImage("");
        setTitle("");
        setExplain("");
    };
    const runFacemesh = async () => {
        const net = await facemesh.load(
            facemesh.SupportedPackages.mediapipeFacemesh
        );
        setTitle("");
        setExplain("");
        detect(net);
    };
    const [face, setFace] = useState();
    const [ctx, setCtx] = useState();

    const detect = async (net) => {
        if (typeof picRef.current !== "undefined" && picRef.current !== null) {
            canvasRef.current.width = picRef.current.width;
            canvasRef.current.height = picRef.current.height;
            const pic = document.getElementById("pic");
            const face1 = await net.estimateFaces({ input: pic });

            const ctx1 = canvasRef.current.getContext("2d");

            setFace(face1);
            setCtx(ctx1);

            // requestAnimationFrame(() => {

            // });
        }
    };
    const drawMesh = (predictions, ctx, color) => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        if (predictions.length > 0) {
            predictions.forEach((prediction) => {
                const keypoints1 = prediction.annotations.lipsLowerOuter;
                const keypoints2 = prediction.annotations.lipsLowerInner;
                const keypoints3 = prediction.annotations.lipsUpperOuter;
                const keypoints4 = prediction.annotations.lipsUpperInner;
                let i;
                ctx.beginPath();
                ctx.moveTo(keypoints1[0][0], keypoints1[0][1]);
                for (i = 1; i < keypoints1.length - 1; i++) {
                    ctx.lineTo(keypoints1[i][0], keypoints1[i][1]);
                }

                for (i = keypoints2.length - 1; i >= 0; i--) {
                    ctx.lineTo(keypoints2[i][0], keypoints2[i][1]);
                }
                ctx.lineTo(keypoints1[0][0], keypoints1[0][1]);
                ctx.moveTo(keypoints3[0][0], keypoints3[0][1]);

                for (i = 1; i < keypoints3.length - 1; i++) {
                    ctx.lineTo(keypoints3[i][0], keypoints3[i][1]);
                }
                for (i = keypoints4.length - 1; i >= 0; i--) {
                    ctx.lineTo(keypoints4[i][0], keypoints4[i][1]);
                }
                ctx.fillStyle = color;

                ctx.globalAlpha = 0.6;
                ctx.fill();
            });
        }
    };

    //톤 별 상품 불러오기
    const getProductsByTone = (tone) => {
        props.refreshFunction(tone);
    };
    const linkStyle = {
        color: "inherit",
        textDecoration: "none",
        maxHeight: "75px",
    };

    //

    return (
        <div className="colortest-wrap">
            {loading && (
                <div className="loading-wrap">
                    <img src={loadingGIF} alt="loading" />
                </div>
            )}
            <div className="colortest-left-wrap">
                <div
                    style={{
                        position: "relative",
                    }}
                >
                    <div style={{ position: "absolute" }}>
                        {fileImage && <canvas ref={canvasRef} />}
                    </div>
                    {fileImage ? (
                        <img
                            id="pic"
                            ref={picRef}
                            alt="sample"
                            src={fileImage}
                            onLoad={() => runFacemesh()}
                        />
                    ) : (
                        <img src={colortest} alt="" />
                    )}
                </div>
            </div>
            <div className="colortest-right-wrap">
                <div className="colortest-right-wrap-title">
                    <h1>퍼스널 컬러테스트 </h1>
                </div>
                <div className="colortest-right-wrap-span">
                    <span>
                        립픽 머신러닝 학습 모델을 통해 퍼스널 컬러를 진단합니다.
                    </span>
                </div>
                <div
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <input
                        name="imgUpload"
                        type="file"
                        accept="image/*"
                        onChange={saveFileImage}
                        id="input-image"
                        style={{ display: "none" }}
                    />
                    <div>
                        <span>톤 판정 결과:{resultTitle}</span>
                    </div>
                    <div>
                        <span className="resultExplain">{resultExplain}</span>
                    </div>
                    {resultTitle && (
                        <div className="test-slide-wrap">
                            <Slider {...settings}>
                                {props.Products.slice(0, 10).map((product) => {
                                    return (
                                        <div
                                            className="test-slide-img"
                                            onClick={() =>
                                                drawMesh(
                                                    face,
                                                    ctx,
                                                    product.color
                                                )
                                            }
                                        >
                                            <img
                                                src={`${domain}:5000/${product.images[0]}`}
                                                alt=""
                                            />

                                            <div className="product-content-wrap">
                                                <Link
                                                    to={`./product/${product._id}`}
                                                    style={linkStyle}
                                                >
                                                    <span className="product-title">
                                                        {resultTitle} 추천 제품:
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

                                                <span className="product-price">
                                                    {product.price} 원
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </Slider>
                        </div>
                    )}
                </div>
                <div className="btn-wrap">
                    <div className="input-image-wrap">
                        <label className="input-image-btn" for="input-image">
                            <div className="icon-wrap">
                                <AiOutlineCloudUpload />
                            </div>
                            <span>업로드</span>
                        </label>
                    </div>

                    <div className="input-image-wrap">
                        <label
                            className="input-image-btn"
                            onClick={() => predict()}
                        >
                            <div className="icon-wrap">
                                <AiOutlineSmile />
                            </div>
                            <span>테스트</span>
                        </label>
                    </div>
                </div>
                <div>
                    <span className="test-span">
                        *립스틱 사진을 클릭하면 테스트해볼 수 있습니다.
                    </span>
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

export default connect(stateprops)(ImageView);
