import axios from "axios";

let bagCount = 0;
axios.get("/api/users/auth").then((response) => {
    response.data.cart.map((item) => {
        bagCount += parseInt(item.quantity, 10);
    });
});
function setBagCount(state = bagCount, action) {
    if (action.type == "bag-add") {
        bagCount += 1;
    }
    if (action.type == "bag-remove") {
        bagCount -= 1;
    }
}
export { setBagCount as default };
