let price = 1.87;
price = 2.5;
let cid = [ // 335.41
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

const calcTotalCid = (arr) => {
    let currSum = 0
    let totalCid = 0
    for (let i = 0; i < arr.length; i++) {
        currSum += arr[i][1];
        // console.log("current sum: ", currSum);
        totalCid = parseFloat(currSum).toFixed(2);
    }
    return console.log("total drawer cash:", totalCid);
};

const makeChange = (cash, price, totalCid) => {
    if (cash.value < price) {
        registerStatus("noFunds");
        console.log("cash: ", cash.value, "price: ", price);
        alert("Customer does not have enough money to purchase the item")
    } else if (cash.value > price) {
        registerStatus("open");
        let change = parseFloat(cash.value).toFixed(2) - price; 
        console.log("cash: ", cash.value, "price: ", price, "change: ", change);
        return change;
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
    // calculate total cash in drawer -- 335.41 √
    // calcTotalCid(cid);
    // let totalCid;
    makeChange(cashInput, price, calcTotalCid(cid));
});

cashInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        makeChange(cashInput, price);
    }
});
