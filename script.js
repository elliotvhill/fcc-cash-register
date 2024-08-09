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
// 0. calculate customer cash, price, cash in drawer √
// 1. does customer have enough money for price? √
// 2. does customer need change? √
// 3. does register have enough money to make customer's change? √
// 4. calculate change due √
// 5. iterate through cash in drawer to find change using minimum cents/bills possible
// 6. convert change due into units from original cid array
// 7. if making change empties register -> close register


const isThereEnoughMoney = (cashPaid, price, cashInDrawer) => {
    
    // register doesn't have enough money √
    if (cashInDrawer < cashPaid) {
        registerStatus("noFunds");
        changeDue.textContent = `Status: ${statusMsg.noFunds}`;
        console.log("Register does not have enough money for this transaction.");
    }
    
    // customer doesn't have enough money √
    else if (cashPaid < price) {
        registerStatus("noFunds");
        alert("Customer does not have enough money to purchase the item");
    }
    
    // customer uses exact change √
    else if (cashPaid == price) {
        registerStatus("open");
        changeDue.textContent = `No change due - customer paid with exact cash`;
    }
    
    // customer is owed change √
    else {
        registerStatus("open");
        const changeOwed = cashPaid - price;
        console.log(`Customer is owed change: ${changeOwed}`);
        makeChange(cid, changeOwed);
    }
};


const makeChange = (cid, changeOwed) => {
    // object sorted desc from cid array:
    const registerChangeObj = Object.fromEntries(cid.toReversed());
    console.log("Change available in register: ", registerChangeObj);
    
    // iterate thru obj denoms
    // check if changeOwed / by each denom < 1
    // if so, count of that denom +1
    // changeOwed - denom value
    // repeat until changeOwed == 0
    

};




////////////////////////

// const calculateChangeFromRegister = (changeOwed, /* cashInDrawer,  */ cid) => {
//     // calculate change largest to smallest units

//     // cid array sorted DESC denoms (in cents):
//     const registerChangeArr = cid.toReversed();
//     console.log("Change (cents) in register: ", registerChangeArr);
//     // [10000, 9000, 6000, 5500, 2000, 425, 310, 205, 101]


//     // const changeObject = Object.fromEntries(registerChangeArr).flat();
//     const changeObject = Object.fromEntries(registerChangeArr)
//     console.log(changeObject);

//     // calculate denom counts in register
//     const denomValues = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01]

//     for (let i = 0; i < denomValues.length; i++) {
//         if (changeObject / denomValues[i] ) {}
//     };

    // correct change: 1 five, 2 ones, 2 quarters
    
    // if total cashInDrawer (cents) == changeOwed (cents) -- register closed
// };

////////////////////////



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
    console.log(`customer cash paid: ${cashInput.value}; cash on hand: ${calculateTotalCid(cid)}`);
    isThereEnoughMoney(cashInput.value, price, calculateTotalCid(cid))
});

// cashInput.addEventListener("keydown", (e) => {
//     if (e.key === "Enter") {
//         // calculateChange(cashInput, price, calcTotalCid(cid));
//     }
// });
