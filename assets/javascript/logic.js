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


        $.ajax({
            url: queryURL,
            method: "GET",
        }).done(function (response) {
            console.log(response);
            for (let i = 0; i < 10; i++) {
                

                /////////////// COL //////////////

                // make a col div
                let div = $("<div>");

                // Assign it a class 
                div.addClass("col-xs-6");

                ///////////// PAN /////////////

                // Make a panel
                let pan = $("<div>");

                // Assign it a class 
                pan.addClass("panel panel-default");

                /////////////// TITLE //////////////

                // Make a title row
                let title = $("<div>");

                // Assign it a class 
                title.addClass("page-header");

                // Set title text

                // If there is a title,
                if (response.data[i].title) {

                    // Check if the title is longer than 20 characters
                    if (response.data[i].title.length > 20) {

                        // If so, check if title is also longer than 30 characters
                        if (response.data[i].title.length > 30) {

                            // If so, make the title tiny
                            title.html("<p style='font-size: 16px;'>" + response.data[i].title + "<p>");


                            // Otherwise, 
                        } else {

                            // Just make title small
                            title.html("<p>" + response.data[i].title + "<p>");
                        }

                        // If none of the above, 
                    } else {

                        //make the regular title
                        title.html("<h3>" + response.data[i].title + "<h3>");
                    }

                    // If there is no title
                } else {

                    // Set title to Untitled
                    title.html("<h3>Untitled<h3>");
                }

                ////////////// ANI_BTN ////////////

                // Create a button
                let btn = $("<button>");

                // Set text
                btn.text("Animate!");

                // Assign it a class 
                btn.addClass("btn btn-default");

                btn.attr("id", "btn-custom");


                ////////////// RATED //////////////

                // Make a rated row
                let rated = $("<div>");



                // Set title text
                if (response.data[i].rating) {
                    rated.html("<p>Rated: " + response.data[i].rating + "</p>");
                } else {
                    rated.html("<p>Unrated</p>");
                }

                // Set Source text
                if (response.data[i].source_tld) {

                    // Make a makeshift container for link
                    let linkDiv = $("<p>");

                    // Make source link
                    let link = $("<a>" + response.data[i].source_tld + "</a>");

                    // Assign its href 
                    link.attr("href", response.data[i].source);

                    // Assign it a class 
                    link.addClass("link-custom");

                    // Assemble link component
                    linkDiv.append(link);

                    // Append link component
                    rated.append(linkDiv);
                } else {
                    rated.append("<p>No Source Availible</p>");
                }


                /////////////// IMG //////////////

                // Create an image
                let img = $("<img>");

                // Get and set the img link of the responses 
                img.attr("src", response.data[i].images.downsized_still.url);

                // Get and set the moving link responses 
                img.attr("data-new", response.data[i].images.downsized.url);

                // Assign it a class 
                img.addClass("thumbnail");

                img.attr("id", "imgs");

                ///////////// ASSEMBLY /////////////

                // Put title in panel
                pan.append(title);

                // Put img in panel
                pan.append(img);

                pan.append(btn);

                // Insert rating into div
                pan.append(rated);

                // Insert panel into div
                div.append(pan);

                // Insert div into img-row
                $("#img-row").append(div);
            }
        })
    },



    animate: function (target) {
        target.attr("src", $(this).data);
    }
}

$(document).ready(function () {
    main.renderButtons();
    // When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
    $('body').on('click', 'img', function () {
        console.log("test");
        // main.animate($(this));
    })

    $("button").on("click", function () {
        main.render($(this).val());
    })

});

// function () {  // HERE NOW ONLY FOR TEST MOVE TO BOTTOM LATER

//     // var reverseData = $(this).data().reverse;
//     // $(this).data("reverse", this.src);
//     // this.src = reverseData;
// });




// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing

// Under every gif, display its rating (PG, G, so on). 
// * This data is provided by the GIPHY API.
// * Only once you get images displaying with button presses should you move on to the next step.


// Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

// Make a  1/3 column
