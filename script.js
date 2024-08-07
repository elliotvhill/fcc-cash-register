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

const calculateTotalCid = (cid) => {
    let currSum = 0;
    let totalCid = 0;
    for (let i = 0; i < cid.length; i++) {
        currSum += cid[i][1];
        totalCid = parseFloat(currSum).toFixed(2);
    }
    // console.log("total drawer cash:", totalCid);
    return totalCid;
};

// STEPS:
// 0. calculate customer cash, price, cash in drawer in cents √
// 1. does customer have enough money for price?
// 2. does customer need change?
// 3. does register have enough money to make customer's change?
// 4. calculate change due in cents
// 5. iterate through cash in drawer (in cents) to find change using minimum cents/bills possible
// 6. convert change due into units from original cid array



const convertToCents = (customerCash, price, cashInDrawer) => {
    customerCash = parseFloat(cashInput.value).toFixed(2) * 100;
    price *= 100;
    cashInDrawer *= 100;
    console.log("customerCash:", customerCash, "price:", price, "cashInDrawer:", cashInDrawer);
};
const isThereEnoughMoney = () => { };
const calculateCustomerChange = () => { };
const calculateChangeFromRegister = () => { };





/////////////////

// const calculateChange = (cash, price, totalCid) => {
//     if (cash.value < price) {
//         registerStatus("noFunds");
//         console.log("cash: ", cash.value, "price: ", price);
//         alert("Customer does not have enough money to purchase the item");
//     } else if (cash.value > price) {
//         registerStatus("open");
//         let change = parseFloat(cash.value).toFixed(2) - price;
//         console.log("cash: ", cash.value, "price: ", price, "change: ", change);
//         return change;
//     } else {
//         changeDue.textContent = "No change due - customer paid with exact cash";
//         console.log("cash: ", cash.value, "price: ", price);
//     }
// }

// const makeChange = (totalCid, cash, changeInCents) => { };

////////////////////////////

// const calculateChange = (cash, price /* , totalCid */) => {
//     if (cash.value < price) {
//         registerStatus("noFunds");
//         console.log("cash: ", cash.value, "price: ", price);
//         alert("Customer does not have enough money to purchase the item");
//     } else if (cash.value > price) {
//         registerStatus("open");
//         console.log("cash: ", cash.value, "price: ", price, "change in cents: ", change);
//     } else {
//         changeDue.textContent = "No change due - customer paid with exact cash";
//         console.log("cash: ", cash.value, "price: ", price);
//     }
//     return change;
// };

// const makeChange = (cid, change) => {
//     // parseInt(change);
//     const changeArray = [];
//     cid.forEach((element) => {
//         changeArray.push(Math.round(element[1] * 100));
//     });
//     changeArray.sort((a, b) => b - a); // sort desc cid array
//     // return console.log(changeArray);

//     let count = 0;
//     let remainingChange = 0;

//     console.log(typeof (change))
    
//     for (let i = 0; i < changeArray.length; i++) {
//         // let changeInt = parseInt(changeArray[i]);
//         // console.log("current change int:", changeInt);
//         // if (change / changeInt > 1) {
//         //     count += changeInt;
//         //     console.log("count:", count);
//         // }
//         // change -= changeInt;
//         // console.log("change - changeInt:", change);
//         // return change;
//         if (change / changeArray[i] > 1) {
//             count += changeArray[i];
//             console.log("count:", count);
//         }
//         change -= changeArray[i];
//         console.log("change - changeInt:", change);
//         return change;
//     }

    // change (750) / changeArray[0] (10000) < 1 ? YES (0.075)
    // change (750) / changeArray[1] (9000) < 1 ? YES (0.083)
    // change (750) / changeArray[2] (6000) < 1 ? YES (0.235)
    // change (750) / changeArray[3] (5500) < 1 ? YES (0.136)
    // change (750) / changeArray[4] (2000) < 1 ? YES (0.375)
    // change (750) / changeArray[5] (425) < 1 ? NO (1.76)
    // // count: 425
    // // remaining change to make: change (750) - count (425)
    // // [remaining] change = 325
    // change (325) / changeArray[6] (310) < 1 ? NO (1.048)
    // // count += 310 (735 total)
    // // remaining change to make: change (750) - count (735)
    // // [remaining] change = 15
    // change (15) / changeArray[7] (310) < 1 ? NO (1.048)
// };

const resetRegister = () => {
    cashInput.value = "";
    changeDue.textContent = "";
};

purchaseBtn.addEventListener("click", () => {
    console.log("customer cash given:", cashInput.value);
    convertToCents(cash, price, calculateTotalCid(cid));
    resetRegister();
});

// cashInput.addEventListener("keydown", (e) => {
//     if (e.key === "Enter") {
//         // calculateChange(cashInput, price, calcTotalCid(cid));
//     }
// });
