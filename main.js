$('#loader-countainer').show();

$('#content').load('pokemon_list.html', function() {
    $('#loader-countainer').hide();
});
