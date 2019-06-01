//<a href="https://www.freepik.com/free-photos-vectors/love">Love vector created by freepik - www.freepik.com</a>
$(document).ready(function () {
    $("#gifs").hide();
    $("input").on("click", function () {
        $("#gifs").show();
        
        var mood = $(this).attr("data-mood");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + mood + "&api_key=9Li299K6c8k8VCHxN38Q4Uht6Bkp3XXG&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        })

            .then(function (response) {
                console.log(queryURL);
                console.log(response);

                var results = response.data;

                for (var i = 0; i <results.length; i++) {
                    var moodDiv = $("<div>");

                    var p = $("<p>").text("Rating: " + results[i].rating);

                    var moodImage = $("<img>");
                    moodImage.attr("src", results[i].images.fixed_height.url);

                    moodDiv.append(moodImage);
                    moodDiv.append(p);

                    $("#gifs").prepend(moodDiv);
                    
                };
            });
    });
})