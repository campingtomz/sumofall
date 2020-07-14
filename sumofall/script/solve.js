$(document).ready(function () {

    const $valueSpan = $('.valueSpan');
    const $value = $('#arrayRange');
    $valueSpan.html($value.val());
    $value.on('input change', () => {

        $valueSpan.html($value.val());
    });
});