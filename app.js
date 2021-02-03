let usdToBdt = 84.85;
let bdtToUsd = 0.01178551;



function convertCurrency() {
    convert('usd','bdt',usdToBdt);
    convert('bdt','usd',bdtToUsd);
}



function convert(from, to, rate) {
    let convertedAmount = 0;
    let fromCurrency = document.getElementById('fromCurrency');
    let toCurrency = document.getElementById('toCurrency');
    let inputAmount = document.getElementById('inputAmount');
    if (fromCurrency.value === from && toCurrency.value === to){
        convertedAmount = inputAmount.value * rate;
        document.getElementById('convertedAmount').innerText = convertedAmount.toFixed(3);
    }
    if(fromCurrency.value === toCurrency.value){
        document.getElementById('convertedAmount').innerText = inputAmount.value;
    }
}

document.getElementById('inputAmount').addEventListener("keydown", function (event) {
    console.log(event.key);
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("convertBtn").click();
    }
});