$('#caldera').on('click', function(){
    $('#furtherReading').text("Caldera Volcano ");
    $('img').css('display', 'none');
    $('#one').css('display', 'block');
})

$('#complexVolcano').on('click', function(){
    $('#furtherReading').text("Complex Volcano");
    $('img').css('display', 'none');
    $('#two').css('display', 'block');
})

$('#shield').on('click', function(){
    $('#furtherReading').text("Shield Volcano");
    $('img').css('display', 'none');
    $('#three').css('display', 'block');
})

$('#stratovolcano').on('click', function(){
    $('#furtherReading').text("Stratovolcano");
    $('img').css('display', 'none');
    $('#four').css('display', 'block');
})

$('#volcanicField').on('click', function(){
    $('#furtherReading').text("Volcanic Field");
    $('img').css('display', 'none');
    $('#five').css('display', 'block');
})
