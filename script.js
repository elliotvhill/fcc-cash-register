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

const currencyCounts = [
    {
        unit: "penny",
        value: 0.01,
        amountInDrawer: 101,
    },
    {
        unit: "nickel",
        value: 0.05,
        amountInDrawer: 41,
    },
    {
        unit: "dime",
        value: 0.1,
        amountInDrawer: 31,
    },
    {
        unit: "quarter",
        value: 0.25,
        amountInDrawer: 17,
    },
    {
        unit: "one",
        value: 1,
        amountInDrawer: 90,
    },
    {
        unit: "five",
        value: 5,
        amountInDrawer: 11,
    },
    {
        unit: "ten",
        value: 10,
        amountInDrawer: 2,
    },
    {
        unit: "twenty",
        value: 20,
        amountInDrawer: 3,
    },
    {
        unit: "one hundred",
        value: 100,
        amountInDrawer: 1,
    },
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
// 1. does customer have enough money for price? √
// 2. does customer need change? √
// 3. does register have enough money to make customer's change? √
// 4. calculate change due in cents √
// 5. iterate through cash in drawer (in cents) to find change using minimum cents/bills possible
// 6. convert change due into units from original cid array
// 7. if making change empties register -> close register




const isThereEnoughMoney = (customerCash, price, cashInDrawer) => {
    customerCash = parseFloat(cashInput.value).toFixed(2) * 100;
    price *= 100;
    cashInDrawer *= 100;
    // register doesn't have enough money
    if (cashInDrawer < customerCash) {
        registerStatus("noFunds");
        changeDue.textContent = `Status: ${statusMsg.noFunds}`;
        console.log("Register does not have enough money for this transaction.");
    }
    // customer doesn't have enough money
    else if (customerCash < price) {
        registerStatus("noFunds");
        alert("Customer does not have enough money to purchase the item");
    }
    // customer uses exact change
    else if (customerCash == price) {
        registerStatus("open");
        changeDue.textContent = `No change due - customer paid with exact cash`;
    }
    // customer is owed change
    else {
        registerStatus("open");
        const changeOwed = customerCash - price;
        const changeOwedInDollars = parseFloat((customerCash - price) / 100).toFixed(2);
        console.log(`Customer is owed change: $${changeOwedInDollars}`);
        calculateChangeFromRegister(changeOwed, cid); // calculate customer change due
        // return changeOwed;
    }
};

const calculateChangeFromRegister = (changeOwed, /* cashInDrawer,  */ cid) => {
    // if total cashInDrawer (cents) > changeOwed (cents) -- register status: open, calculate change largest to smallest units

    // original cid array sorted desc in cents:
    const registerChangeArr = [];
    cid.forEach((element) => {
        registerChangeArr.push(Math.round(element[1] * 100));
        registerChangeArr.sort((a, b) => b - a);
        return registerChangeArr;
    });
    console.log(registerChangeArr);

    let changeMade = 0;

    for (let i = 0; i < registerChangeArr.length; i++) {
        // is changeOwed / registerChangeArr[i] > , < , or === 1 ?
        if (changeOwed / registerChangeArr[i] < 1) {
            console.log(registerChangeArr[i], "smaller change can be made");
        } else if (changeOwed / registerChangeArr[i] > 1) {
            console.log("this unit can be used to make change:", registerChangeArr[i]);
            // +1 count for matching currency unit
            // how many of each unit is available in cid?
            // how many of each unit is needed to make change?


            // changeMade += registerChangeArr[i]; // <-- wrong
            // console.log("changeMade: ", changeMade);
        }
    }

    
    // if total cashInDrawer (cents) == changeOwed (cents) -- register closed
    
};



////////////////////////////

// recursion?
// const coinsNeededToMakeChange = (units, change) => {
//     units.forEach((unit) => {
//         if (unit == change) {
//             return unit;
//         } else if (unit > change) {
//             return;
//         }
//         return console.log("unit: ", unit, coinsNeededToMakeChange(units, change - unit));
//     })
// };

// coinsNeededToMakeChange(registerChangeArr, changeOwed);




////////////////////////////

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

// };

const resetRegister = () => {
    cashInput.value = "";
    changeDue.textContent = "";
};

purchaseBtn.addEventListener("click", () => {
    console.log("customer cash given:", cashInput.value);
    // convertToCents(cash, price, calculateTotalCid(cid)); // functional, not needed
    isThereEnoughMoney(cash, price, calculateTotalCid(cid));
    // isThereEnoughMoney(cash, price, 10);
    // resetRegister();
});

// cashInput.addEventListener("keydown", (e) => {
//     if (e.key === "Enter") {
//         // calculateChange(cashInput, price, calcTotalCid(cid));
//     }
// });
