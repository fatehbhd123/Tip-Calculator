let inputs = document.querySelectorAll('input'),
    spans = document.querySelector('.select-tip').querySelectorAll('span'),
    custom = document.getElementById('custom'),
    amount = document.querySelector('.amount').querySelectorAll('span')[1],
    total = document.querySelector('.total').querySelectorAll('span')[1],
    btn = document.querySelector('button'),
    error = document.getElementById('error'),
    clicked = false,
    prct;
spans.forEach(function (span) {
    span.onclick = function () {
        spans.forEach(function (span) {
            span.classList.remove('active')
        })
        span.classList.add('active');
        btn.classList.add('active');
        prct = +(span.getAttribute('data-prct')) / 100;
        if (inputs[0].value !== '' && typeof (+inputs[0].value) != NaN && inputs[1].value !== '' && typeof (+inputs[1].value) != NaN) {
            calculate();
        } else {
            clicked = true;
            inputs[1].classList.add('active')
            error.style.opacity = '1';
        }
        if (document.getElementById('customizable')) {
            document.getElementById('customizable').value = '';
        }
    }
})
inputs[1].onfocus = function () {
    inputs[1].classList.remove('active');
    error.style.opacity = '0';
}
inputs.forEach(function (input) {
    input.onblur = function () {
        if (clicked) {
            if (inputs[0].value !== '' && typeof (+inputs[0].value) != NaN && inputs[1].value !== '' && typeof (+inputs[1].value) != NaN) {
                calculate();
            } else if (inputs[1].value == '') {
                error.style.opacity = '1';
                inputs[1].classList.add('active');
            }
        } else if (inputs[1].value == '' && inputs[0].value !== '') {
            error.style.opacity = '1';
            inputs[1].classList.add('active');

        }
    }
})
btn.onclick = function () {
    inputs[1].classList.remove('active');
    clicked = false;
    inputs = document.querySelectorAll('input');
    inputs.forEach(function (input) {
        input.value = '';
    })
    spans.forEach(function (span) {
        span.classList.remove('active');
    })
    error.style.opacity = '0';
    btn.classList.remove('active');
    amount.innerHTML = '0.00$';
    total.innerHTML = '0.00$';
}
custom.onclick = function () {

    let input = document.createElement('input');
    input.setAttribute('placeholder', '0');
    input.setAttribute('id', 'customizable')
    input.onfocus = function () {
        spans.forEach(function (span) {
            span.classList.remove('active')
        })
    }
    input.onchange = function () {

        prct = (+input.value) / 100;
        if (inputs[0].value !== '' && typeof (+inputs[0].value) != NaN && inputs[1].value !== '' && typeof (+inputs[1].value) != NaN) {
            calculate();
        } else {
            clicked = true;
            inputs[1].classList.add('active')
            error.style.opacity = '1';
        }
    }
    input.style.cssText = 'padding:5px 0;border:none;font-weight:normal;text-align: center;margin-top: 5px;margin-bottom: 5px;padding: 5px 0;border-radius: 5px;'
    custom.parentElement.append(input);
    custom.style.display = 'none';

}
calculate = function () {
    btn.classList.add('active');
    error.style.opacity = '0';
    inputs[1].classList.remove('active')

    let bill = +inputs[0].value,
        people = +inputs[1].value;
    console.log(people);
    console.log(bill);
    console.log(prct)
    amount.innerHTML = `${((bill + bill * prct) / people - (bill / people)).toFixed(2)}$`;
    total.innerHTML = `${((bill + bill * prct) / people).toFixed(2)}$`
}
