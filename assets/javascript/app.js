// array of movies
var movies = ["The Matrix", "The Thing", "Mad Max", "Aliens", "The Good The Bad and The Ugly", "Lord of the Rings", 
"The Matrix", "Shawn of the Dead", "Kazaam"];

// function for scraping the JSON content for each button into the empty div on the html page
function displayMovieGif() {
  // identifying the created empty div
  $("#movies-view").empty();
  var movie = $(this).attr("data-name");
  // creating a limit of 10 at the end
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  movie + "&api_key=wt7bOsQ6wCxLn0MkwC7AGYQG3xz7BXaN&limit=10";
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    
    var results = response.data;
    
    for (var i = 0; i < results.length; i++) {
      
        // making a div for the scraped gif
        var movieDiv = $("<div>");
        movieDiv.attr({"class": "gif"})
        
        // Creating an image tag
        var movieImage = $("<img>");
        
        // Giving the image tag an src attribute of a proprty pulled off the
        // result item
        movieImage.attr({
          "src": results[i].images.fixed_height_still.url,
          "data-still": results[i].images.fixed_height_still.url,
				  "data-animate": results[i].images.fixed_height.url,
          "data-state": "still",
          "class": "gif"
        });
        // Appending the paragraph and personImage we created to the "gifDiv" div we created
 
        movieDiv.append(movieImage);
        
        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
        $("#movies-view").prepend(movieDiv);
        console.log(movieImage.attr("src"));
      
    }
    $(".gif").on("click", function() {
			
			// $(this) just means "the element with class 'gif' that was clicked" from shoe!
		   var state = $(this).attr("data-state");
		   
		   // $(this).attr("data-state") will either be "still" or "animate" from shoe and class 6.2
		   // IF it's still: we change it to animate
		   if (state === "still") {
			   
			   var newSrc = $(this).attr("data-animate");
			   $(this).attr("src", newSrc);
			   $(this).attr("data-state", "animate");
			   
			// OTHERWISE it's animated already, so we change it to still so its an easy back and forth
		   } else {
			   var newSrc = $(this).attr("data-still");
			   $(this).attr("src", newSrc);
			   $(this).attr("data-state", "still");
		   }
	   }); 
  });
};

// Function for displaying movie data
function renderButtons() {
  
  // Deleting the buttons prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();
  
  // Looping through the array of movies
  for (var i = 0; i < movies.length; i++) {
    
    // Then dynamically generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie to our button
    a.addClass("movie");
    // Adding a data-attribute
    a.attr("data-name", movies[i]);
    // Providing the initial button text
    a.text(movies[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-movie").on("click", function(event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var movie = $("#movie-input").val().trim();

  // Adding the movie from the textbox to our array
  movies.push(movie);
  console.log(movies);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Function for displaying the movie info
// Using $(document).on instead of $(".movie").on to add event listeners to dynamically generated elements
$(document).on("click", ".movie", displayMovieGif);

// Calling the renderButtons function to display the initial buttons
renderButtons();