main = {
    // create an array of strings, each one related to a topic that interests you.
    topics: ["computers", "cats", "video games", "art", "nature"],

    // take the topics in this array and create buttons in your HTML
    renderButtons: function (target) {

        // Loop for each topic
        for (let i = 0; i < main.topics.length; i++) {

            // Create a new button
            let btn = $("<button>");

            // Assign its value, insert text
            btn.val(main.topics[i]);
            btn.text(main.topics[i]);

            // Assign a class 
            btn.addClass("btn btn-default");

            // Assign unique ID's
            btn.attr("id", "button-" + [i]);
            
            
            // Insert into button row
            $("#button-row").append(btn);

        }


    },
    // When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
    render: function (topic) {
        var key = "UPA3OlvXVVrYNiKnas5HbGqoosksA9ll";
        var URL = "https://api.giphy.com/v1/gifs/search?api_key="
        var queryURL = URL + key + "&q=" + topic + "&limit=25&offset=0&rating=G&lang=en";
        $("#img-row").text("");

        for (let i = 0; i < 9; i++) {
        $.ajax({
            url: queryURL,
            method: "GET",
        }).done(function (response) {
            
            console.log(response);
            
           /////////////// <DIV>  /////////////
            // make a col
            let div = $("<div>");

            // Assign a class 
            div.addClass("col-xs-4");
            
            ///////////// <PANEL> /////////////
            // Make a panel
            let pan = $("<div>");

            // Assign a class 
            pan.addClass("panel panel-default");

            // Create an image
            let img = $("<img>");

            // Get and set the img link of the responses 
            img.attr("src", response.data[i].images.downsized.url);
            img.attr("style", "max-width:150px; max-height:150px");
            
            // Put img in panel
            pan.append(img);

            // Insert panel into div
            div.append(pan);

            // Insert div into img-row
            $("#img-row").append(div);
        })
    }

    }
}

$(document).ready(function () {
    main.renderButtons();
    $("button").on("click", function(){
        main.render($(this).val());
    })

});




// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing

// Under every gif, display its rating (PG, G, so on). 
// * This data is provided by the GIPHY API.
// * Only once you get images displaying with button presses should you move on to the next step.


// Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

// Make a  1/3 column
