import { connect } from "react-redux";
import React from "react";
import "./Footer.scss"


function Footer(props){


    return(


        <div className={`footer-wrap footer-${props.footer}`}>
            <div className="footer-top">
                <div className="footer-top-item">
                    <ul className="footer-top-ul">
                        <li className="footer-top-li-1">Lippick</li>
                        <li>퍼스널 컬러 테스트</li>
                        <li>익스클루시브 서비스</li>
                        <li>채용</li>
                        <li>브랜드 소개</li>
                    </ul>
                </div>
                <div className="footer-top-item">
                    <ul className="footer-top-ul">
                        <li className="footer-top-li-1">고객 서비스</li>
                        <li>주문 배송 조회</li>
                        <li>반품 신청</li>
                        <li>배송 서비스</li>
                        <li>회원 가입</li>
                        <li>FAQ</li>
                        <li>고객 문의</li>
                    </ul>
                </div>
                <div className="footer-top-item">
                    <ul className="footer-top-ul">
                        <li className="footer-top-li-1">법률</li>
                        <li>이용 약관</li>
                        <li>개인정보 보호정책</li>
                        <li>반품 정책</li>
                        <li>배송 정책</li>
                    </ul>
                </div>
                <div className="footer-top-item">
                    <ul className="footer-top-ul">
                        <li className="footer-top-li-1">소셜 미디어</li>
                        <li>페이스북</li>
                        <li>인스타그램</li>
                        <li>유튜브</li>
                        <li>트위터</li>
                    </ul>
                </div>

            </div>

            <div className="footer-bottom">

                <div className="footer-bottom-item">
                    <span>@2022 Lippick INC.</span>
                </div>
            </div>



        </div>
    )



}

function stateprops(state) {
    return {
      footer: state.reducer11,
    };
  }
  
  export default connect(stateprops)(Footer);
  