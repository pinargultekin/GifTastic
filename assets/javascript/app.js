$(document).ready(function () {

    //VARIABLE
    var currentMood = ["Happy", "Excited", "Energetic", "Angry", "Joyful", "Melancholy", "Stressed", "Irritated"];


    //FUNCTION  
    function buttons() {

       // $("#buttons").empty();

        for (var i = 0; i < currentMood.length; i++) {
            var btn = $("<button>");
            btn.addClass("searchButton");
            btn.attr("data-mood", currentMood[i]);
            btn.text(currentMood[i]);
            $("#buttons").append(btn);

        };
    };
    
    // Adding mood buttons using submit button
    $("#addMood").on("click", function (event) {
     //   $("#user-input").empty();
        event.preventDefault();
        var userInput = $("#user-input").val().trim();
        currentMood.push(userInput);
        $("#buttons").append("<button class='searchButton' data-mood= " + userInput + ">" + userInput + "</button>");
       
        
    }); 
    
    $("#gifs").hide();

    // click event for search button 
    $(document).on("click", ".searchButton", function () {
        $("#gifs").show();
        $("#gifs").empty();

        var mood = $(this).attr("data-mood");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + mood + "&api_key=9Li299K6c8k8VCHxN38Q4Uht6Bkp3XXG&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        })

            .then(function (response) {

                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var moodDiv = $("<div>");

                    var p = $("<p>").text("Rating: " + results[i].rating);

                    var moodImage = $("<img>");
                    moodImage.attr("src", results[i].images.fixed_height_still.url);
                    moodImage.attr("data-animate", results[i].images.fixed_height.url);
                    moodImage.attr("data-still", results[i].images.fixed_height_still.url);
                    moodImage.attr("data-state", "still");
                    moodImage.attr("class", "gif");

                    moodDiv.append(moodImage);
                    moodDiv.append(p);
                    moodImage.on("click", animateGif);
                    $("#gifs").prepend(moodDiv);

                };
            });
            
    });

    function animateGif() {

        var state = $(this).attr("data-state");
        
        if (state === "still") {
          $(this).attr("src", $(this).data("animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).data("still"));
          $(this).attr("data-state", "still");
        }
      };

    buttons();
});