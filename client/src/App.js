import React from "react";
import "./App.css";
import ImageView from "./components/ImageView";
import BootNav from "./components/BootNav";
import { connect } from "react-redux";
import ExpandNav from "./components/ExpandNav";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

import LandingLipstick from "./components/LandingLipstick";
import LandingLiquid from "./components/LandingLiquid";
import LandingGloss from "./components/LandingGloss";
import LandingCare from "./components/LandingCare";
import DetailProductPage from "./components/DetailProductPage";

import BagPage from "./components/BagPage";
import WishPage from "./components/WishPage";
import HistoryPage from "./components/HistoryPage";

import { Route, Switch } from "react-router-dom";
import HomeWrap from "./components/HomeWrap";
import Footer from "./components/Footer.js";
import Auth from "./hoc/auth";
import UploadProduct from "./components/UploadProduct";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function App(props) {
    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState(0);

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        let body = {
            skip: Skip,
            limit: Limit,
        };

        getProducts(body);
    }, []);

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
        getProducts(body);
    };

    return (
        <div className="App">
            {props.login && <LoginPage />}
            <Route path="/:id">
                {props.expand ? (
                    <ExpandNav
                        Products={Products}
                        refreshFunction={updateSearchTerm}
                    />
                ) : (
                    <BootNav refreshFunction={updateSearchTerm} />
                )}
            </Route>
            <Route path="/lippick/">
                <HomeWrap
                    Products={Products}
                    refreshFunction={updateSearchTerm}
                />
            </Route>

            <Switch>
                <Route path="/personal">
                    <ImageView
                        Products={Products}
                        refreshFunction={updateSearchTerm}
                    />
                </Route>
                <Route path="/personal1">
                    <ImageView />
                </Route>
                <Route path="/register">
                    <RegisterPage />
                </Route>
                <Route path="/product/upload">
                    <UploadProduct />
                </Route>

                <Route path="/lipstick">
                    <LandingLipstick />
                </Route>
                <Route path="/liquid">
                    <LandingLiquid />
                </Route>
                <Route path="/gloss">
                    <LandingGloss />
                </Route>
                <Route path="/care">
                    <LandingCare />
                </Route>

                <Route path="/test">
                    <DetailProductPage
                        Products={Products}
                        refreshFunction={updateSearchTerm}
                    />
                </Route>
                <Route
                    path="/product/:productId"
                    component={Auth(DetailProductPage, null)}
                ></Route>
                <Route path="/bag" component={Auth(BagPage, true)}></Route>
                <Route
                    path="/wishlist"
                    component={Auth(WishPage, true)}
                ></Route>
                <Route
                    path="/history"
                    component={Auth(HistoryPage, true)}
                ></Route>
            </Switch>
            <Route path="/:id">
                <Footer />
            </Route>
        </div>
    );
}

function stateprops(state) {
    return {
        navTG: state.reducer1,
        expand: state.reducer5,
        login: state.reducer8,
    };
}

export default connect(stateprops)(App);
