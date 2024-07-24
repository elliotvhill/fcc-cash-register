let price = 1.87;
price = 2.5;
let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
];

const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const statusMsg = {
    noFunds: "INSUFFICIENT_FUNDS",
    closed: "CLOSED",
    open: "OPEN",
};

const registerStatus = (status) => {
    if (statusMsg[status]) {
        changeDue.textContent = `Status: ${statusMsg[status]}`;
        console.log("Status: ", statusMsg[status]);
    }
};

const makeChange = (cash, price) => {
    if (cash.value < price) {
        registerStatus("noFunds");
        console.log("cash: ", cash.value, "price: ", price);
        alert("Customer does not have enough money to purchase the item")
    } else if (cash.value > price) {
        registerStatus("open");
        console.log("cash: ", cash.value, "price: ", price);
    } else {
        changeDue.textContent = "No change due - customer paid with exact cash";
        console.log("cash: ", cash.value, "price: ", price);
    }
};

const resetRegister = () => {
    customerCash.value = "";
    changeDue.textContent = "";
};

purchaseBtn.addEventListener("click", () => {
    console.log("customer cash:", cashInput.value);
    makeChange(cashInput, price);
});

cashInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        makeChange(cashInput, price);
    }
});
