import Axios from "axios";

export function loginUser(dataToSubmit) {
    const request = Axios.post("/api/users/login", dataToSubmit).then(
        (response) => response.data
    );
    return {
        type: "login_user",
        payload: request,
    };
}

export function registerUser(dataToSubmit) {
    const request = Axios.post("/api/users/register", dataToSubmit).then(
        (response) => response.data
    );
    return {
        type: "register_user",
        payload: request,
    };
}

export function auth() {
    const request = Axios.get("/api/users/auth").then(
        (response) => response.data
    );
    return {
        type: "auth_user",
        payload: request,
    };
}

export function addToCart(id) {
    let body = {
        productId: id,
    };
    const request = Axios.post("/api/users/addToCart", body).then(
        (response) => response.data
    );
    return {
        type: "add_to_cart",
        payload: request,
    };
}

export function getCartItems(cartItems, userCart) {
    const request = Axios.get(
        `/api/product/products_by_id?id=${cartItems}&type=array`
    ).then((response) => {
        // CartItem들에 해당하는 정보들을
        // Product Collection에서 가져온 후에
        // Quantity 정보를 넣어 준다.

        userCart.forEach((cartItem) => {
            response.data.forEach((productDetail, index) => {
                if (cartItem.id === productDetail._id) {
                    response.data[index].quantity = cartItem.quantity;
                }
            });
        });

        return response.data;
    });

    return {
        type: "get_cart_items",
        payload: request,
    };
}

export function removeCartItem(productId) {
    const request = Axios.get(`/api/users/removeFromCart?id=${productId}`).then(
        (response) => {
            // productInfo, cart 정보를 조합해서 CartDetail을 만든다.
            response.data.cart.forEach((item) => {
                response.data.productInfo.forEach((product, index) => {
                    if (item.id === product._id) {
                        response.data.productInfo[index].quantity =
                            item.quantity;
                    }
                });
            });
            return response.data;
        }
    );

    return {
        type: "remove_cart_item",
        payload: request,
    };
}

export function onSuccessBuy(data) {
    const request = Axios.post(`/api/users/successBuy`, data).then(
        (response) => response.data
    );

    return {
        type: "on_success_buy",
        payload: request,
    };
}

export function addToWish(id) {
    let body = {
        productId: id,
    };
    const request = Axios.post("/api/users/addToWish", body).then(
        (response) => response.data
    );
    return {
        type: "add_to_wish",
        payload: request,
    };
}

export function getWishItems(wishItems, userWish) {
    const request = Axios.get(
        `/api/product/products_by_id?id=${wishItems}&type=array`
    ).then((response) => {
        userWish.forEach((wishItem) => {
            // response.data.forEach((productDetail, index) => {
            //     if(wishItem.id === productDetail._id){
            //         response.data.product[index] = wishItem
            //     }
            // })
        });

        return response.data;
    });

    return {
        type: "get_wish_items",
        payload: request,
    };
}

export function removeWishItem(productId) {
    const request = Axios.get(`/api/users/removeFromWish?id=${productId}`).then(
        (response) => {
            //  productInfo, cart 정보를 조합해서 CartDetail을 만든다.
            response.data.wish.forEach((item) => {
                // response.data.productInfo.forEach((product, index) => {
                //     if (item._id === product._id) {
                //         response.data.productInfo[index].quantity =
                //             item.quantity;
                //     }
                // });
            });
            return response.data;
        }
    );

    return {
        type: "remove_wish_item",
        payload: request,
    };
}
