import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import DetailProductImage from "./DetailProductImage";
import { Row, Col, Form, Button, Select, Image } from "antd";
import { connect, useDispatch } from "react-redux";
import { addToCart, addToWish, removeWishItem } from "../_actions/user_actions";
import MakeUp from "./MakeUp";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { MdTty } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import Loading from "./Loading";
import "./DetailProduct.scss";
import Slider from "react-slick";
import { split } from "@tensorflow/tfjs";
import {
    MdOutlineArrowForwardIos,
    MdOutlineArrowBackIos,
} from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BootNav from "./BootNav";
import Halert from "./Halert.js";
import Balert from "./Balert.js";

const { Option } = Select;
function DetailProductPage(props) {
    useEffect(() => {
        props.dispatch({ type: "nav-on" });
        props.dispatch({type:"hAlert-off"});
        props.dispatch({type:"bAlert-off"});
    }, []);
    useEffect(() => {
        props.dispatch({ type: "bag-get" });
        setTimeout(() => {
            props.dispatch({ type: "bag-get" });
        }, 500);
        setTimeout(() => {
            props.dispatch({ type: "bag-get" });
        }, 750);
        setTimeout(() => {
            props.dispatch({ type: "bag-get" });
        }, 1000);
    }, [props]);
    const dispatch = useDispatch();

    const productId = props.match.params.productId;

    const [Product, setProduct] = useState({});

    const [tryOn, setTryOn] = useState(false);

    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState(0);

    const [searchTerm, setSearchTerm] = useState("");

    let userid = sessionStorage.getItem("userId");

    useEffect(() => {
        let body = {
            skip: Skip,
            limit: Limit,
        };

        getProducts(body);
        props.dispatch({ type: "loading-start" });
        
        
    }, []);

    const splitTitle = (text, number) => {
        let splited = [];
        if (text !== undefined) {
            splited = text.split(" ");
        } else {
            splited = ["", ""];
        }
        return splited[number];
    };

    const getProducts = (body) => {
        axios.post("/api/search", body).then((response) => {
            if (response.data.success) {
                if (body) {
                    setProducts([...response.data.productInfo]);
                }
                setPostSize(response.data.postSize);
            } else {
                alert(" 상품 가져오기 실패 ");
            }

            props.dispatch({ type: "loading-end" });
        });
    };

    const getProductsForSearch = (body) => {
        axios.post("/api/search", body).then((response) => {
            if (response.data.success) {
                if (body) {
                    setProducts([...response.data.productInfo]);
                }
                setPostSize(response.data.postSize);
            } else {
                alert(" 상품 가져오기 실패 ");
            }
        });
    };

    const updateSearchTerm = (newSearchTerm) => {
        let body = {
            skip: 0,
            limit: Limit,
            searchTerm: newSearchTerm,
        };

        setSkip(0);
        setSearchTerm(newSearchTerm);
        getProductsForSearch(body);
    };

    useEffect(() => {
        axios
            .get(`/api/product/products_by_id?id=${productId}`)
            .then((response) => {
                setProduct(response.data[0]);
            })
            .catch((err) => alert(err));
    }, []);

    const bagHandler = () => {
        // 필요한 정보를 cart field에 넣어준다.
        if (userid === "false") {
            //  alert("로그인 후 이용해주세요.");
            return props.history.back(1);
        }
        dispatch(addToCart(productId));
        //alert("상품을 장바구니에 추가했습니다.");
        dispatch({type:"bAlert-on"});
    };

    const changeTry = () => {
        setTryOn(!tryOn);
    };

    const searchTitle = (text) => {
        if (text === undefined) {
            return "";
        } else {
            let searchText = text.split(" ");
            return searchText[0];
        }
    };

    const searchOther = () => {
        setSearchTerm(searchTitle(Product.title));
        updateSearchTerm(searchTitle(Product.title));
    };

    const linkOther = (value) => {
        window.location.replace(`/product/${value}`);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    let duplicate = false;

    setDuplicate();

    if (duplicate) {
        dispatch({ type: "heart-fill" });
    } else {
        dispatch({ type: "heart-drain" });
    }

    return (
        <div className="detail-wrap">
            {props.loading ? (
                <Loading />
            ) : (
                <div className="detail-top-wrap">
                    {props.hAlert && <Halert />}
                    {props.bAlert && <Balert />}
                    <div className="detail-top-wrap-2">
                        <div className="detail-top-wrap-left">
                            {tryOn ? (
                                <MakeUp
                                    color={Product.color}
                                    tryOn={tryOn}
                                    setTryOn={setTryOn}
                                />
                            ) : (
                                <DetailProductImage detail={Product} />
                            )}
                        </div>
                        <div className="detail-top-wrap-right">
                            <div className="detail-info-wrap">
                                <div className="detail-title-wrap">
                                    <h3>{Product.title}</h3>
                                    {props.heart ? (
                                        <AiFillHeart
                                            className="heart"
                                            onClick={() => {
                                                if (userid === "false") {
                                                    alert(
                                                        "로그인 후 이용해주세요."
                                                    );
                                                    return props.history.back(
                                                        1
                                                    );
                                                }
                                                props.dispatch({
                                                    type: "heart-drain",
                                                });
                                                dispatch(
                                                    removeWishItem(productId)
                                                );
                                            }}
                                        />
                                    ) : (
                                        <AiOutlineHeart
                                            className="heart"
                                            onClick={() => {
                                                if (userid === "false") {
                                                    alert(
                                                        "로그인 후 이용해주세요."
                                                    );
                                                    return props.history.back(
                                                        1
                                                    );
                                                }
                                                props.dispatch({
                                                    type: "heart-fill",
                                                });
                                                props.dispatch({
                                                    type: "hAlert-on",
                                                });

                                                dispatch(addToWish(productId));
                                            }}
                                        />
                                    )}
                                </div>

                                <p>{Product.price} 원</p>
                                <Select
                                    style={{
                                        width: "200px",
                                        marginTop: "10px",
                                    }}
                                    placeholder="&nbsp;선택 가능한 컬러"
                                    onClick={() => {
                                        searchOther();
                                    }}
                                    onChange={(e) => {
                                        linkOther(e);
                                    }}
                                >
                                    {Products.map((pro) => {
                                        return (
                                            <Option value={pro._id}>
                                                {pro.title}
                                            </Option>
                                        );
                                    })}
                                </Select>

                                <button
                                    className="detail-btn"
                                    onClick={bagHandler}
                                >
                                    장바구니에 추가하기
                                </button>

                                <button
                                    className="detail-btn"
                                    onClick={changeTry}
                                >
                                    트라이온
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="detail-bottom-wrap">
                <div className="detail-tab-wrap">
                    <ul className="detail-tab">
                        <li
                            className={`${props.tab[0] && "tab-on"}`}
                            onClick={() => {
                                props.dispatch({ type: "on-1" });
                            }}
                        >
                            설명
                        </li>
                        <li
                            className={`${props.tab[1] && "tab-on"}`}
                            onClick={(e) => {
                                props.dispatch({ type: "on-2" });
                            }}
                        >
                            상품 필수 정보
                        </li>
                        <li
                            className={`${props.tab[2] && "tab-on"}`}
                            onClick={(e) => {
                                props.dispatch({ type: "on-3" });
                            }}
                        >
                            배송과 반품
                        </li>
                        <li
                            className={`${props.tab[3] && "tab-on"}`}
                            onClick={(e) => {
                                props.dispatch({ type: "on-4" });
                            }}
                        >
                            재입고 알림
                        </li>
                    </ul>
                </div>

                <div className="detail-bottom-content">
                    <span
                        className={`detail-bottom-desc ${
                            props.tab[0] && "tab-inline"
                        }`}
                    >
                        <pre>
                            {Product.detail !== undefined
                                ? Product.detail[0]
                                : ""}
                        </pre>
                    </span>
                    <span
                        className={`detail-bottom-desc ${
                            props.tab[1] && "tab-inline"
                        }`}
                    >
                        <pre>
                            {Product.detail !== undefined
                                ? Product.detail[1]
                                : ""}
                        </pre>
                    </span>
                    <span
                        className={`detail-bottom-desc ${
                            props.tab[2] && "tab-inline"
                        }`}
                    >
                        <pre>
                            배송 서비스는 다양한가요?
                            <br />
                            립픽 뷰티 공식 온라인 스토어는 고객님의 편의를
                            위하여 다양한 배송 서비스를 제공하고 있습니다.{" "}
                            <br />
                            선택 가능한 배송 서비스는 하기와 같습니다.
                            <br />
                            <br />
                            -일반 배송: 주문 후 평균 2~4일 이내 발송되는
                            서비스(영업일 기준). 3만 원 이상 구매 시 무료배송.
                            3만 원 미만 2,500원 유료 배송
                            <br />
                            <br />
                            -익일 배송: 주문 당일 자정 ~ 오후 1시까지의 주문
                            건에 대해 익일 내 배송되는 3,500원 유료 서비스(서울
                            지역에 한함, 영업일 기준)
                            <br />
                            -예약일 배송: 주문 당일 포함 5일 이후부터 2주 이내의
                            예약일에 맞춰 배송되는 3,500원 유료 배송
                            서비스(영업일 기준).
                            <br />
                            <br />
                            *주문 완료 후에는 배송지 변경이 불가합니다.
                            <br />
                            주문제품을 반품하거나 환불받으려면 어떻게 하나요?
                            <br />
                            립픽 뷰티 공식 온라인 스토어에서 구매하신 제품이
                            만족스럽지 않으실 경우 모든 제품 (일부 액세서리 및
                            개봉 흔적이 확인된 경우 제외, 이용약관에 상세 정보
                            확인 가능) 은 수령 후 7일 이내 환불 의사를 밝히고
                            반품 주시면 절차에 따라 환불 처리를 도와드리고
                            있습니다. 환불 소요일은 결제 수단에 따라 상이할 수
                            있습니다. 다만, 일부 결제 수단에 대해서는 환불
                            처리를 위하여 고객님께 별도의 계좌번호를 요청하는
                            경우가 있습니다. 주문 취소 및 반품에 대한 절차는
                            하기와 같습니다.
                            <br />
                            -주문 취소: 주문 후 30분 이내에 마이 페이지에서 주문
                            취소 버튼을 이용하여 취소하거나, 고객 센터를 통해
                            주문을 취소하실 수 있습니다. 30분 이후에는 주문
                            취소가 불가하며 필요에 따라 반품 절차로 대체 됩니다.
                            <br />
                            -교환: 립픽 뷰티 공식 온라인 스토어에서 구매한
                            제품은 온라인에서 반품 및 환불이 가능하나, 제품
                            교환은 불가능합니다. 교환을 원하실 경우, 제품을
                            수령하신 뒤 고객센터를 통해 반품 절차를 거치신 후
                            다시 주문하여 주십시오.
                            <br />
                            -반품/환불 접수: 반품과 환불 문의는 립픽 온라인
                            스토어의 고객센터로 연락 주시기 바랍니다.
                            <br />
                            -반품 가능 기간: 단순 변심에 의한 반품은 제품 수령
                            후 7일 이내에만 가능합니다.
                            <br />
                            <br />
                            -다음의 경우에는 단순 변심에 의한 반품이 불가합니다:
                            <br />
                            ⅰ. 이용자에게 책임 있는 사유로 재화 등이 멸실 또는
                            훼손된 경우(재화의 박스 또는 밀봉포장을 개봉하여
                            추가 포장비용 없이 재판매가 불가능한 경우를
                            포함하나, 배송용 박스 포장 훼손 및 상품 하자의 경우
                            등은 제외함)
                            <br />
                            ⅱ. 이용자의 사용 또는 일부 소비에 의하여 재화 등의
                            가치가 현저히 감소한 경우
                            <br />
                            ⅲ. 시간의 경과에 의하여 재판매가 곤란할 정도로 재화
                            등의 가치가 현저히 감소한 경우
                            <br />
                            ⅳ. 이용자가 반환한 제품이 주문한 정품이 아닌 경우
                            <br />
                            ⅴ. 주문 철회를 허용할 경우 립픽 뷰티 온라인 스토어에
                            회복할 수 없는 중대한 피해가 예상되는 경우로서
                            사전에 해당 거래에 대하여 별도로 그 사실을 고지하고
                            이용자의 동의를 받은 경우
                            <br />
                            ⅵ. 주문 시 동봉된 사은품, 샘플, 립픽 로고가 들어간
                            포장 패키지를 반환하지 않은 경우
                            <br />
                            <br />
                            -제품에 하자가 있거나 계약 내용과 다르게 이행된 경우
                            제품 수령일로부터 3개월 이내에 환불 가능합니다.
                            <br />
                            <br />
                            -반품 시 립픽과 계약한 택배업체가 아닌 타 택배사를
                            이용하는 경우 파손 및 분실에 대한 책임은 고객님께
                            있습니다.
                            <br />
                            <br />
                            -반품 택배 비용은 일양 택배 기사님께 직접 전달해야
                            합니다.
                            <br />
                            <br />
                            -반품 택배 비용은 5,000원 일괄 부담됩니다. 도서산간,
                            제주도를 포함한 국내 전 지역으로 배송 가능하나 일부
                            지역에 따라 배송 시기가 다를 수 있으며, 추가 운임
                            비용이 발생할 수 있습니다. (추가 운임의 경우 고객
                            별도 부담)
                            <br />
                            <br />
                            고객센터로 연락을 주시면 택배 기사님 반품 픽업
                            예약을 도와드리며 반품 접수 후 14일 이내에
                            물류센터에 반품 제품 도착 확인이 되어야 합니다. 반품
                            물품 도착 후 내부 심사를 통해 빠른 반품 및 환불을
                            도와드리도록 하겠습니다.
                            <br />
                            립픽 뷰티 공식 온라인 스토어에서는 반품 검수 완료 후
                            3일 영업일 이내에 환불 처리를 하나 결제 수단에 따라
                            고객님에게 실제 환불되는 시점은 상이할 수 있습니다.
                            반품하실 때에는 샘플 및 패키지를 반드시 제품과 함께
                            반송해 주시기 바라오며, 제품에 대한 교환 및 단순
                            변심에 의한 부분 반품 및 부분 환불 서비스는 제공되지
                            않습니다. 온라인 구매 상품은 오프라인 부티크에서
                            교환 및 반품, 환불을 받으실 수 없습니다.
                            <br />
                            <br />
                            배송 중 파손된 제품을 수령하셨다면 파손 제품의 상태
                            확인을 위해 사진을 촬영하신 후 립픽 뷰티 공식 온라인
                            스토어 고객 센터로 연락 부탁드리겠습니다.
                            <br />
                            <br />더 자세한 문의를 원하신다면 립픽 뷰티 공식
                            온라인 스토어의 고객 센터로 전화 또는 온라인 고객
                            문의를 주실 경우 빠르고 친절한 상담을 도와드릴 수
                            있도록 하겠습니다. - 고객 센터(080-332-2700) 운영
                            시간: 월-금, 오전 9시-오후 6시
                        </pre>
                        <br />
                    </span>
                    <span
                        className={`detail-bottom-desc ${
                            props.tab[3] && "tab-inline"
                        }`}
                    >
                        <pre>
                            제품 품절 시, 재입고 알림 신청 서비스를 이용하여
                            재입고 안내를 받으실 수 있습니다.
                            <br />
                            <br />
                            품절된 제품 상세페이지의 [재입고 알림] 버튼을 클릭
                            후, 연락처 정보를 입력해주세요. <br />
                            재입고 시 입력하신 연락처로 알림 메시지를
                            보내드립니다.
                            <br />
                            판매가 및 옵션 등의 상품 정보는 변경될 수 있으며,
                            재입고 알림 후 구매 시점에 따라 품절이 발생할 수
                            있습니다.{" "}
                        </pre>
                    </span>
                </div>
            </div>

            <div className="detail-slide-wrap">
                <div className="detail-slide-text-wrap">
                    <span>{splitTitle(Product.title, 0)}</span>
                    <h3>{splitTitle(Product.title, 1)}</h3>
                </div>
                <div className="detail-slide-img-wrap">
                    <Slider {...settings}>
                        {Product.description !== undefined
                            ? Product.description.map((desc) => {
                                  return (
                                      <div className="detail-slide-img">
                                          <img
                                              src={`http://localhost:5000/${desc}`}
                                              alt=""
                                          />
                                      </div>
                                  );
                              })
                            : ""}
                    </Slider>
                </div>
            </div>
        </div>
    );

    function setDuplicate() {
        if (props.user) {
            if (props.user.userData) {
                if (props.user.userData.isAuth) {
                    props.user.userData.wish.forEach((item) => {
                        if (item.id === productId) {
                            duplicate = true;
                        }
                    });
                }
            }
        }
    }
}

function stateprops(state) {
    return {
        navTG: state.reducer1,
        tab: state.reducer9,
        loading: state.reducer12,
        heart: state.reducer13,
        bagCount: state.setBagCount,
        hAlert: state.reducer14,
        bAlert : state.reducer15,
    };
}

export default connect(stateprops)(DetailProductPage);
