// Fetch data from server
const fetchData = callBack => {
    const ApiKey = '14a15c45c48c92bea5ab98276efd6f55'
    const url = 'http://data.fixer.io/api/latest?access_key=' + ApiKey;
    fetch(url)
    .then(res => res.json())
    .then(data => callBack(data))
}

// Set up currency list
const currency = data => {
    const rates = data.rates;
    const currencyName = Object.keys(rates);
    currencyName.forEach(name => {
        const fromCurrencyField = document.getElementById('fromCurrency');
        const toCurrencyField = document.getElementById('toCurrency');
        fromCurrencyField.innerHTML += `<option> ${name}</option>`
        toCurrencyField.innerHTML += `<option> ${name}</option>`
    });
    // Set default value of option
    const optionsFrom = document.querySelectorAll('#fromCurrency option');
    optionsFrom.forEach(option => {
        if (option.text === 'USD') {
            option.setAttribute('selected', true);
        }
    });
    const optionsTo = document.querySelectorAll('#toCurrency option');
    optionsTo.forEach(option => {
        if (option.text === 'BDT') {
            option.setAttribute('selected', true);
        }
    });
}

// Call currency function with fetch data
fetchData(currency); 

// Convert currency with fetch data
const convertCurrency = () => fetchData(calculateAmount);

// Calculate converted amount of currency
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

// Enter key event handler
document.getElementById('inputAmount').addEventListener("keydown", function (event) {
    console.log(event.key);
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("convertBtn").click();
    }
});