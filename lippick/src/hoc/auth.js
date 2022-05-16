import React, { useEffect } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../_actions/user_actions";
import { BsArrowReturnRight } from "react-icons/bs";
import HomeWrap from "../components/HomeWrap";

export default function (SpecificComponent, option, adminRoute = null) {
    //null => 아무나 출입이 가능한 페이지
    //true => 로그인한 유저만 출입이 가능한 페이지
    //false => 로그인한 유저는 출입 불가능한 페이지

    function AuthenticationCheck(props) {
        const user = useSelector((state) => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then((response) => {
                // 로그인 하지 않은 상태
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push("/home");
                        alert("로그인 후 이용가능합니다.");
                    }
                } else {
                    // 로그인 한 상태
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push("/home");
                    } else {
                        if (option === false) {
                            props.history.push("/home");
                        }
                    }
                }
            });
        }, []);
        return <SpecificComponent {...props} user={user} />;
    }

    return AuthenticationCheck;
}
