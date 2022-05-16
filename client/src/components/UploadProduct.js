import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import FileUpload from "./FileUpload";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./UploadProduct.scss";
import { connect } from "react-redux";

const { TextArea } = Input;

function UploadProduct(props) {
    useEffect(() => {
        props.dispatch({ type: "nav-on" });
    }, [props.navTG]);

    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState([]);
    const [Price, setPrice] = useState(0);
    const [Category, setCategory] = useState("립스틱");
    const [Tone, setTone] = useState("봄웜");
    const [Images, setImages] = useState([]);
    const [Color, setColor] = useState("");

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value);
    };
    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value);
    };
    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value);
    };
    const categoryChangeHandler = (event) => {
        setCategory(event.currentTarget.value);
    };
    const toneChangeHandler = (event) => {
        setTone(event.currentTarget.value);
    };
    const colorChangeHandler = (event) => {
        setColor(event.currentTarget.value);
    };

    const updateImages = (newImages) => {
        setImages(newImages);
    };

    const detailImages = (description) => {
        setDescription(description);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (
            !Title ||
            !Description ||
            !Price ||
            !Category ||
            !Tone ||
            !Images ||
            !Color
        ) {
            return alert("모든 값을 넣어주세요.");
        }

        // 서버에 채운 값들을 request로 보낸다.
        const body = {
            title: Title,
            description: Description,
            price: Price,
            category: Category,
            tone: Tone,
            images: Images,
            color: Color,
        };

        axios.post("/api/product", body).then((response) => {
            if (response.data.success) {
                props.history.push("/product/upload");
                alert("상품을 업로드 했습니다.");
            } else {
                alert("상품 업로드 실패했습니다.");
            }
        });
    };

    return (
        <div className="upload-wrap">
            <div>
                <h2> 제품 업로드 </h2>
            </div>

            <Form className="upload-form" onSubmitCapture={submitHandler}>
                <FileUpload refreshFunction={updateImages} />
                <label>이름</label>

                <Input onChange={titleChangeHandler} value={Title} />

                <label>설명</label>
                <FileUpload refreshFunction={detailImages} />
                {/* <TextArea onChange={descriptionChangeHandler} value={Description}/> */}

                <label>가격</label>
                <Input onChange={priceChangeHandler} value={Price} />

                <label>색정보</label>
                <Input
                    placeholder="#123456"
                    onChange={colorChangeHandler}
                    value={Color}
                />
                <div className="upload-bottom">
                    <label>카테고리</label>

                    <select
                        className="upload-select"
                        onChange={categoryChangeHandler}
                        value={Category}
                    >
                        <option key="1" value="립스틱">
                            립스틱
                        </option>
                        <option key="2" value="리퀴드">
                            리퀴드
                        </option>
                        <option key="3" value="립글로스">
                            립글로스
                        </option>
                        <option key="4" value="립케어">
                            립케어
                        </option>
                    </select>

                    <label>톤</label>

                    <select
                        className="upload-select"
                        onChange={toneChangeHandler}
                        value={Tone}
                    >
                        <option key="1" value="봄웜">
                            봄웜
                        </option>
                        <option key="2" value="여름쿨">
                            여름쿨
                        </option>
                        <option key="3" value="가을웜">
                            가을웜
                        </option>
                        <option key="4" value="겨울쿨">
                            겨울쿨
                        </option>
                    </select>

                    <Button className="upload-btn" htmlType="submit">
                        확인
                    </Button>
                </div>
            </Form>
        </div>
    );
}

function stateprops(state) {
    return {
        navTG: state.reducer1,
    };
}

export default withRouter(connect(stateprops)(UploadProduct));
