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
    // convert customer cash to cents
    customerCash = parseFloat(cashInput.value).toFixed(2) * 100;
    // convert item price, register cash to cents
    price *= 100;
    cashInDrawer *= 100;
    
    // register doesn't have enough money √
    if (cashInDrawer < customerCash) {
        registerStatus("noFunds");
        changeDue.textContent = `Status: ${statusMsg.noFunds}`;
        console.log("Register does not have enough money for this transaction.");
    }

    // customer doesn't have enough money √
    else if (customerCash < price) {
        registerStatus("noFunds");
        alert("Customer does not have enough money to purchase the item");
    }
    
    // customer uses exact change √
    else if (customerCash == price) {
        registerStatus("open");
        changeDue.textContent = `No change due - customer paid with exact cash`;
    }

    // customer is owed change √
    else {
        registerStatus("open");
        const changeOwed = customerCash - price;
        console.log(`Customer is owed change: ${changeOwed} cents`);
        calculateChangeFromRegister(changeOwed, cid); // calculate customer change due
        // return changeOwed;
    }
};

const calculateChangeFromRegister = (changeOwed, /* cashInDrawer,  */ cid) => {
    // calculate change largest to smallest units

    // cid array sorted DESC denoms (in cents):
    const registerChangeArr = cid.toReversed();
    console.log("Change (cents) in register: ", registerChangeArr);
    // [10000, 9000, 6000, 5500, 2000, 425, 310, 205, 101]


    const changeObject = Object.fromEntries(registerChangeArr)
    console.log(changeObject);





    // correct change: 1 five, 2 ones, 2 quarters

    // 750 - 425 > 1

    
    // if total cashInDrawer (cents) == changeOwed (cents) -- register closed
    
};



///////// recursion? /////////

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
                
////////////////////////////



const resetRegister = () => {
    cashInput.value = "";
    changeDue.textContent = "";
};

purchaseBtn.addEventListener("click", () => {
    // console.log("customer cash given:", cashInput.value);
    isThereEnoughMoney(cash, price, calculateTotalCid(cid));
    // isThereEnoughMoney(cash, price, 10);
});

// cashInput.addEventListener("keydown", (e) => {
//     if (e.key === "Enter") {
//         // calculateChange(cashInput, price, calcTotalCid(cid));
//     }
// });
