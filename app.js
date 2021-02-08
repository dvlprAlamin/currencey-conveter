
const fetchData = callBack => {
    const url = 'http://data.fixer.io/api/latest?access_key=14a15c45c48c92bea5ab98276efd6f55';
    fetch(url)
    .then(res => res.json())
    .then(data => callBack(data))
}



const currency = data => {
    const rates = data.rates;
    // console.log(rates);
    const currencyName = Object.keys(rates);
    currencyName.forEach(name => {
        const fromCurrencyField = document.getElementById('fromCurrency');
        const toCurrencyField = document.getElementById('toCurrency');
        fromCurrencyField.innerHTML += `
            <option> ${name}</option>
            `
        toCurrencyField.innerHTML += `
            <option> ${name}</option>
            `
    });
    const optionsFrom = document.querySelectorAll('#fromCurrency option');
    for (let i = 0; i < optionsFrom.length; i++) {
        const option = optionsFrom[i];
        if (option.text === 'USD') {
            option.setAttribute('selected', true);
        }
    }
    const optionsTo = document.querySelectorAll('#toCurrency option');
    for (let i = 0; i < optionsTo.length; i++) {
        const option = optionsTo[i];
        if (option.text === 'BDT') {
            option.setAttribute('selected', true);
        }
    }
}
 

const convertCurrency = () => {
    const url = 'http://data.fixer.io/api/latest?access_key=14a15c45c48c92bea5ab98276efd6f55';
    fetch(url)
        .then(res => res.json())
        .then(data => calculateAmount(data))
   

}
const calculateAmount = data => {
    const rates = data.rates;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const from = rates[fromCurrency];
    const to = rates[toCurrency];
    const inputAmount = parseFloat(document.getElementById('inputAmount').value);
    const convertedAmount = (1 / from) * to * inputAmount;
    document.getElementById('convertedAmount').innerText = convertedAmount.toFixed(3);
}

fetchData(currency);








// function convertCurrency() {
//     convert('usd','bdt',usdToBdt);
//     convert('bdt','usd',bdtToUsd);
// }



// function convert(from, to, rate) {
//     let convertedAmount = 0;
//     let fromCurrency = document.getElementById('fromCurrency');
//     let toCurrency = document.getElementById('toCurrency');
//     let inputAmount = document.getElementById('inputAmount');
//     if (fromCurrency.value === from && toCurrency.value === to){
//         convertedAmount = inputAmount.value * rate;
//         document.getElementById('convertedAmount').innerText = convertedAmount.toFixed(3);
//     }
//     if(fromCurrency.value === toCurrency.value){
//         document.getElementById('convertedAmount').innerText = inputAmount.value;
//     }
// }

document.getElementById('inputAmount').addEventListener("keydown", function (event) {
    console.log(event.key);
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("convertBtn").click();
    }
});