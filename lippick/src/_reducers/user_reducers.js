export default function user(state = {}, action) {
    switch (action.type) {
        case "login_user":
            return { ...state, loginSuccess: action.payload };
        case "register_user":
            return { ...state, register: action.payload };
        case "auth_user":
            return { ...state, userData: action.payload };
        case "add_to_cart":
            return {
                ...state,
                userData: {
                    ...state.userData,
                    cart: action.payload,
                },
            };
        case "get_cart_items":
            return { ...state, cartDetail: action.payload };
        case "remove_cart_item":
            return {
                ...state,
                cartDetail: action.payload.productInfo,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart,
                },
            };
        case "on_success_buy":
            return {
                ...state,
                cartDetail: action.payload.cartDetail,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart,
                },
            };
        case "add_to_wish":
            return {
                ...state,
                userData: {
                    ...state.userData,
                    wish: action.payload,
                },
            };
        case "get_wish_items":
            return { ...state, wishDetail: action.payload };
        case "remove_wish_item":
            return {
                ...state,
                wishDetail: action.payload.productInfo,
                userData: {
                    ...state.userData,
                    wish: action.payload.wish,
                },
            };
        default:
            return state;
    }
}
