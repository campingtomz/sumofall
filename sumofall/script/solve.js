

    const $valueSpan = $('.valueSpan');
    const $value = $('#arrayRange');
    $valueSpan.html($value.val());
$value.on('input change', barValueChange);
    

let array = [];
let inputValue;
$('#randomInputCheck').change(checkBoxInput);
$('#randomArrayCheck').change(checkBoxArray);
//$('#arrayRange').on('input change', checkBoxArray);
$('#maxValueInput').change(function () {
    generateRandomArray($('#maxValueInput').val(), $('#arrayRange').val());
});
$('#arrayRange').change(function () {
    generateRandomArray($('#maxValueInput').val(), $('#arrayRange').val());
});

function barValueChange() {

    $valueSpan.html($value.val());
};
function checkBoxArray() {
    if (this.checked) {
        $('#userArrayInput').prop("disabled", true);
        $('#arrayRange').prop("disabled", false);
        $('#maxValueInput').prop("disabled", false);
        array = generateRandomArray($('#maxValueInput').val(), $('#arrayRange').val());
    }
    else {
        $('#userArrayInput').prop("disabled", false);
        $('#arrayRange').prop("disabled", true);
        $('#maxValueInput').prop("disabled", true);
        array = [];
        $('#userArrayInput').val("");
        $('#userArrayInput').attr("placeholder", '');
        $('#maxValueInput').prop("disabled", true);
        $('#maxValueInput').val("100");
        $('#maxValueInput').attr("placeholder", '100');
        $('#arrayRange').val('50');
        barValueChange();

    }
};

function checkBoxInput() {
    if (this.checked) {
        $('#userValueInput').prop("disabled", true);
        inputValue = getRandomNumber($('#maxValueInput').val())      
    }
    else {
        $('#userValueInput').val("");
        $('#userValueInput').attr("placeholder", '');
        $('#userValueInput').prop("disabled", false);
    }
};
function getRandomNumber() {
    let randomValue = generateRandomNumber($('#maxValueInput').val())
    $('#userValueInput').val(randomValue);
    $('#userValueInput').attr("placeholder", randomValue);
    return randomValue;
}
function generateRandomArray() {
    let randomValue = generateRandomNumber($('#maxValueInput').val())
}
function generateRandomNumber(maxValue) {
    return (Math.floor(Math.random() * maxValue));
}
function generateRandomArray( maxValue, maxLength) {
    let numberArray = [];
    for (let i = 0; i < maxLength; i++) {
        numberArray.push(generateRandomNumber(maxValue));
    }
    $('#userArrayInput').val(numberArray);
    $('#userArrayInput').attr("placeholder", numberArray);
    return numberArray;
}

function 