//////////////// HIGH LEVEL LOGIC /////////////////

$(document).ready(function () {

    // calls renderButtons at page load
    main.renderButtons();

    // Calls animate function on click
    $('body').on('click', 'img', function () {
        main.animate($(this));
    })

    // Calls render function on button click
    $('body').on('click', 'button', function () {
        main.render($(this).val());
    })

    // Calls addBtn function on add button click
    $('body').on('click', '#add-btn', function () {
        main.addBtn();
    })


});

/////////////////// CORE LOGIC //////////////////////

main = {
    // create an array of strings, each one related to a topic that interests you.
    topics: ["computers", "cats", "video games", "art", "nature"],

    // take the topics in this array and create buttons in your HTML
    renderButtons: function (target) {

        $("#button-row").html("");

        // Loop for each topic
        for (let i = 0; i < main.topics.length; i++) {

            // Create a new button
            let btn = $("<button>");

            // Assign its value, insert text
            btn.val(main.topics[i]);
            btn.text(main.topics[i]);

            // Assign a class 
            btn.addClass("btn btn-default");

            // Assign ID's
            btn.attr("id", "button-custom");


            // Insert into button row
            $("#button-row").append(btn);

        }


    },

    // Adds a button
    addBtn: function () {
        main.topics.push($("#btn-input").val());
        main.renderButtons();
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
            for (let i = 0; i < 24; i++) {


                /////////////// COL //////////////

                // make a col div
                let div = $("<div>");

                // Assign it a class 
                div.addClass("col-sm-6");

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
                            let output = [];
                            for (let j = 0; j < 30; j++) {

                                output.push(response.data[i].title[j]);

                            }

                            
                            // If so, make the title tiny
                            title.html("<h4>" + output.join("") + "...</h4>");

                            // Otherwise, 
                        } else {
                            // Just make title small
                            title.html("<h4>" + response.data[i].title + "<h>");
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
                img.attr("src", response.data[i].images.original_still.url);

                // Get and set the moving link responses 
                img.attr("data-new", response.data[i].images.original.url);

                // Get and set the still link responses 
                img.attr("data-old", response.data[i].images.original_still.url);

                // Assign it a class 
                img.addClass("thumbnail");

                img.attr("id", "imgs");

                ///////////// ASSEMBLY /////////////

                // Put title in panel
                pan.append(title);

                // Put img in panel
                pan.append(img);

                // pan.append(btn);

                // Insert rating into div
                pan.append(rated);

                // Insert panel into div
                div.append(pan);

                // Insert div into img-row
                $("#img-row").append(div);
            }
        })
    },

    // Switches between animated and still states
    animate: function (target) {

        if (target.attr("src") === target.attr("data-old")) {
            target.attr("src", target.attr("data-new"));
        } else if (target.attr("src") === target.attr("data-new")) {
            target.attr("src", target.attr("data-old"));
        } else {
            return
        }
    }
}

/////////////////////////////////////////////////////

