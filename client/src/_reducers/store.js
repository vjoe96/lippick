import { isAllOf } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
import { getCookie } from "../cookies";
import axios from "axios";

let bagCount = 0;

function setBagCount(state = bagCount, action) {
    if (action.type == "bag-get") {
        axios.get("/api/users/auth").then((response) => {
            let total = 0;
            if (response.data.cart) {
                response.data.cart.map((item) => {
                    total += parseInt(item.quantity, 10);
                });
                bagCount = total;
            }
        });
    }
    if (action.type == "bag-add") {
        bagCount += 1;
    }
    if (action.type == "bag-remove") {
        bagCount = 0;
    }

    return bagCount;
}

let navTG = false;

function reducer1(state = navTG, action) {
    if (action.type === "nav-on") {
        navTG = true;
    } else if (action.type === "nav-off") {
        navTG = false;
    }

    return navTG;
}

let test = true;

function reducer2(state = test, action) {
    return state;
}

let playing = true;

function reducer3(state = playing, action) {
    if (action.type === "pause") {
        playing = false;
    } else if (action.type === "play") {
        playing = true;
    }
    return playing;
}

let muted = true;

function reducer4(state = muted, action) {
    if (action.type === "vol") {
        muted = false;
    } else if (action.type === "mute") {
        muted = true;
    }
    return muted;
}

let expand = false;

function reducer5(state = expand, action) {
    if (action.type === "expand-on") {
        expand = true;
    } else if (action.type === "expand-off") {
        expand = false;
    }

    return expand;
}

let bg = false;

function reducer6(state = bg, action) {
    if (action.type === "bg-on") {
        bg = true;
    } else if (action.type === "bg-off") {
        bg = false;
    }

    return bg;
}

let content1img = [
    "content1-img-1",
    "content1-img-2",
    "content1-img-3",
    "content1-img-4",
];
let num = 0;
let selectImg = "content1-img-1";

function reducer7(state = selectImg, action) {
    if (action.type === "minus" && num === 0) {
        num = 3;
        selectImg = content1img[num];
    } else if (action.type === "plus" && num === 3) {
        num = 0;
        selectImg = content1img[num];
    } else if (action.type === "plus" && 0 <= num <= 3) {
        num += 1;
        selectImg = content1img[num];
    } else if (action.type === "minus" && 0 <= num <= 3) {
        num -= 1;
        selectImg = content1img[num];
    }

    return selectImg;
}

let login = false;

function reducer8(state = login, action) {
    if (action.type === "login-on") {
        login = true;
    } else if (action.type === "login-off") {
        login = false;
    }

    return login;
}

let tab = [true, false, false, false];

function reducer9(state = tab, action) {
    switch (action.type) {
        case "on-1":
            tab = [true, false, false, false];
            break;
        case "on-2":
            tab = [false, true, false, false];
            break;
        case "on-3":
            tab = [false, false, true, false];
            break;
        case "on-4":
            tab = [false, false, false, true];
            break;

        default:
            return tab;
    }

    return tab;
}

let ani = false;

function reducer10(state = ani, action) {
    if (action.type === "ani-on") {
        ani = true;
    } else if (action.type === "ani-off") {
        ani = false;
    }

    return ani;
}

let footer = false;

function reducer11(state = footer, action) {
    if (action.type === "footer-down") {
        footer = true;
    } else if (action.type === "footer-up") {
        footer = false;
    }
    return footer;
}

let loading = true;

function reducer12(state = loading, action) {
    if (action.type === "loading-end") {
        loading = false;
    } else if (action.type === "loading-start") {
        loading = true;
    }

    return loading;
}

let heart = false;

function reducer13(state = heart, action) {
    if (action.type === "heart-fill") {
        heart = true;
    } else if (action.type === "heart-drain") {
        heart = false;
    }

    return heart;
}

let hAlert = false;

function reducer14(state = hAlert, action) {
    if (action.type === "hAlert-on") {
        hAlert = true;
    } else if (action.type === "hAlert-off") {
        hAlert = false;
    }

    return hAlert;
}


let bAlert= false;

function reducer15(state = bAlert, action){

    if(action.type === "bAlert-on"){
        bAlert = true;
    }else if(action.type === "bAlert-off"){
        bAlert = false;

    }
    return bAlert;
}
export {
    reducer1,
    reducer2,
    reducer3,
    reducer4,
    reducer5,
    reducer6,
    reducer7,
    reducer8,
    reducer9,
    reducer10,
    reducer11,
    reducer12,
    reducer13,
    setBagCount,
    reducer14,
    reducer15
};
