function Value(firstNum, secondNum) {
    this.firstNum = firstNum;
    this.secondNum = secondNum;

};

const $valueSpan = $('.valueSpan');
const $value = $('#arrayRange');
$valueSpan.html($value.val());
$value.on('input change', barValueChange);
//let inputValue;
let dataOutPut;
$('#randomInputCheck').change(checkBoxInput);
$('#randomArrayCheck').change(checkBoxArray);
$('#showMoreBtn').click(function () {
    $('#outputText').hide();
    $('#showMoreBtn').hide();
    $('#outputList').show();
});
$('#maxValueInput').change(function () {
    generateRandomArray($('#maxValueInput').val(), $('#arrayRange').val());
});
$('#arrayRange').change(function () {
    generateRandomArray($('#maxValueInput').val(), $('#arrayRange').val());
});
$('#submit').click(function () {
    $('#outputText').empty();
    $('#outputList').hide();
    $('#outputText').show();
    $('#outputList').empty();
    findValue();
});

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
    if (!$('#userValueInput').val()) {
        $('#userValueInput').val(getRandomNumber($('#maxValueInput').val()));
    }
    if (!$('#userArrayInput').val()) {
        $('#userArrayInput').val(generateRandomArray($('#maxValueInput').val(), $('#arrayRange').val()));
    } 
    let sumOf = parseInt($('#userValueInput').val());
    let searchArray = new Set($('#userArrayInput').val().split(",").filter((num) => { return num < sumOf }).map((num) => { return parseFloat(num) }));
    let valuesGreaterSumOf = $('#arrayRange').val() - searchArray.length;
    let duplicteCount = valuesGreaterSumOf - searchArray.length;
    dataOutPut = outPutArray(searchArray, sumOf);
    outPutData(dataOutPut, sumOf);
}
function outPutArray(searchSet, sumOf) {
    outPut = [];
    for (num of searchSet) {
        if (searchSet.has(sumOf - num)) {
            outPut.push(new Value(num, sumOf - num));
            searchSet.delete(num);
        }
    }
    console.log(outPut);
    return outPut;
}
function outPutData(outPutValues, sumOf) {
    $('#outputText').html(`The first Values that when added to gether equal ${sumOf}<br/>The numbers ${outPutValues[0].firstNum} and ${outPutValues[0].secondNum} when added together = ${sumOf}`);
    //$('#outputValues').append(`<p id="displayFirst">The numbers ${outPutValues[0].firstNum} and ${outPutValues[0].secondNum} when added together = ${sumOf}</p>`);
    $('#outputList').append(`All the Values that when added to gether equal ${sumOf}`);
    for (value of outPutValues) {
        $('#outputList').append(`<li> The numbers ${value.firstNum} and ${value.secondNum} when added together = ${sumOf}</il>`);

    }
    $('#showMoreBtn').show();
}