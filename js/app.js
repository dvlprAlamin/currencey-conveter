// Fetch data from server
const ApiKey = '14a15c45c48c92bea5ab98276efd6f55'
const url = 'http://data.fixer.io/api/latest?access_key=' + ApiKey;
fetch(url)
.then(res => res.json())
.then(data => {
    localStorage.setItem("currencyRate", JSON.stringify(data));
})

// Set up currency list
const currencyName = () => {
    const currencyRate = JSON.parse(localStorage.getItem("currencyRate"));
    const rates = currencyRate.rates;
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
currencyName();

// Calculate converted amount of currency
const calculateAmount = () => {
    const currencyRate = JSON.parse(localStorage.getItem("currencyRate"));
    const rates = currencyRate.rates;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const from = rates[fromCurrency];
    const to = rates[toCurrency];
    const inputAmount = parseFloat(document.getElementById('inputAmount').value);
    const convertedAmount = (1 / from) * to * inputAmount;
    document.getElementById('convertedAmount').value = convertedAmount.toFixed(3);
    document.getElementById('input-value').value = convertedAmount.toFixed(3);
}

// Enter key event handler
document.getElementById('inputAmount').addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("convertBtn").click();
    }
});

// Expand and collapse calculator
document.getElementById('collapse').addEventListener('click', () => {
    document.getElementById('calculator-body').style.display = 'none';
    document.getElementById('collapse').style.display = 'none';
    document.getElementById('expand').style.display = 'inline-block';
})
document.getElementById('expand').addEventListener('click', () => {
    document.getElementById('calculator-body').style.display = 'flex';
    document.getElementById('expand').style.display = 'none';
    document.getElementById('collapse').style.display = 'inline-block';
})