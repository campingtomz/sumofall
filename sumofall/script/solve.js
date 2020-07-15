function Value(firstNum, secondNum) {
    this.firstNum = firstNum;
    this.secondNum = secondNum;

};

    const $valueSpan = $('.valueSpan');
    const $value = $('#arrayRange');
    $valueSpan.html($value.val());
$value.on('input change', barValueChange);
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
$('#submit').click(findValue);

function barValueChange() {

    $valueSpan.html($value.val());
};
function checkBoxArray() {
    if (this.checked) {
        $('#userArrayInput').prop("disabled", true);
        $('#arrayRange').prop("disabled", false);
        $('#maxValueInput').prop("disabled", false);
        $('#userArrayInput').val(generateRandomArray($('#maxValueInput').val(), $('#arrayRange').val()));
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
        $('#userValueInput').val(getRandomNumber($('#maxValueInput').val())); 
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

function findValue() {
    let sumOf = parseInt($('#userValueInput').val());
    let searchArray = new Set($('#userArrayInput').val().split(",").filter((num) => { return num < sumOf }).map((num) => { return parseInt(num) }));
}
function outPutArray(searchSet, sumOf) {
    outPut = [];
    for (num of searchSet) {
        console.log(sumOf, num);
        if (searchSet.has(sumOf - num)) {
            outPut.push(new Value(num, sumOf - num));
            searchSet.delete(num);
        }
    }
    return outPut;
}