$(function() {
    renderButtons(topics, 'villainButton', '#villainButtons');
});

var topics = ["the joker", "dr evil", "the governor", "jafar", "bane", "mojo jojo", "lex luthor", "darth vader", "lord voldemort"];

function renderButtons(topics, villainButton, villainButtons){   
    $(villainButtons).empty();

    for (var i = 0; i < topics.length; i++){
        
        var a = $('<button>');
        a.addClass(villainButton);
        a.attr('data-name', topics[i]);
        a.text(topics[i]);
        $(villainButtons).append(a);
    }
}

$(document).on('click', '.villainButton', function(){
    $('#villains').empty();
    $('.villainButton').removeClass('active');
    $(this).addClass('active');

    var name = $(this).data('name');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({url: queryURL, method: 'GET'})
     .done(function(response) {
        
         var results = response.data;

         for(var i=0; i < results.length; i++){
             var villainDiv = $('<div class="villain-item">')

             var rating = results[i].rating;

             var p = $('<p>').text( "Rating: " + rating);

             var animated = results[i].images.fixed_height.url;
             var still = results[i].images.fixed_height_still.url;

             var villainImage = $('<img>');
             villainImage.attr('src', still);
             villainImage.attr('data-still', still);
             villainImage.attr('data-animate', animated);
             villainImage.attr('data-state', 'still')
             villainImage.addClass('villainImage');

             villainDiv.append(p)
             villainDiv.append(villainImage)

             $('#villains').append(villainDiv);
         }
    }); 
});

$(document).on('click', '.villainImage', function() {
    var state = $(this).attr('data-state'); 
    
    if ( state === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

$('#addvillain').on('click', function(){
    var newvillain = $('input').eq(0).val();

    if (newvillain.length > 2){
        topics.push(newvillain);
    }

    renderButtons(topics, 'villainButton', '#villainButtons');

    return false;
});