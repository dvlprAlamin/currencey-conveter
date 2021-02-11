
document.querySelector('.buttons').addEventListener('click', function (event) {
    let input = event.target.innerText;
    const inputValue = document.getElementById('input-value');
    const output = document.getElementById('output-value');
    if (input === "AC") {
        inputValue.value = 0;
        output.value = '';
        return;
    }
    if (input === "Del") {
        let preBack = inputValue.value.split('')
        if (preBack.length === 1) {
            inputValue.value = 0;
            return;
        }
        let afterBack = preBack.slice(0, preBack.length - 1).join('');
        inputValue.value = afterBack;
        return;
    }
    // output value return as input value after calculate something
    if (inputValue.value === '' && output.value !== '') {
        inputValue.value = output.value;
    }
    if (input === '=') {
        calculation();
        inputValue.value = '';
        return;
    }
    if (inputValue.value === '0') {
        inputValue.value = input;
    }
    else {
        inputValue.value = inputValue.value + input;
    }
});
function calculation() {
    let output = eval(document.getElementById('input-value').value);
    document.getElementById('output-value').value = output;
}