

main = {
    // create an array of strings, each one related to a topic that interests you.
    topics: ["computers", "cats", "video games", "art", "nature"],

    // take the topics in this array and create buttons in your HTML
    render: function (target) {

        // Loop for each topic
        for (let i = 0; i < main.topics.length; i++) {

            // Create a new button
            let x = $("<button>");

            // Assign its value
            x.val(main.topics[i]);
            x.addClass("btn btn-default");
            x.attr("id", "button-" + [i]);

            // Insert into button row
            $("#button-row").append(x);
        }


    }
}

$(document).ready(function(){

    main.render();
});

// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing

// Under every gif, display its rating (PG, G, so on). 
// * This data is provided by the GIPHY API.
// * Only once you get images displaying with button presses should you move on to the next step.


// Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

