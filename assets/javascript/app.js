// array of movies
var movies = ["The Matrix", "The Thing", "Mad Max", "Aliens", "The Good The Bad and The Ugly", "Lord of the Rings",
  "The Princess Bride", "Shawn of the Dead", "Star Wars"];

// function for scraping the JSON content for each button into the empty div on the html page
function showGif() {
  // identifying the created empty div
  $("#movies-view").empty();
  var movie = $(this).attr("data-name");
  // creating a limit of 10 at the end
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    movie + "&api_key=wt7bOsQ6wCxLn0MkwC7AGYQG3xz7BXaN&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    var results = response.data;

    for (var i = 0; i < results.length; i++) {

      // making a div for the scraped gif
      var movieDiv = $("<div>");
      movieDiv.attr({ "class": "gif" })

      // making an image tag
      var movieImage = $("<img>");

      // giving the image tag an src attribute of a proprty pulled off the result item from the site itself
      movieImage.attr({
        "src": results[i].images.fixed_height_still.url,
        "data-still": results[i].images.fixed_height_still.url,
        "data-animate": results[i].images.fixed_height.url,
        "data-state": "still",
        "class": "gif"
      });
      // appending the movieImage we created to the movieDiv div we created

      movieDiv.append(movieImage);

      // prepending the movieDiv to the "#movies-view" div in the HTML
      $("#movies-view").prepend(movieDiv);
      console.log(movieImage.attr("src"));

    }
    $(".gif").on("click", function () {

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

// function for displaying movie data
function renderButtons() {

  // deleting the buttons prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // looping through the array of movies so that all 10 will populate
  for (var i = 0; i < movies.length; i++) {

    // then dynamically generating buttons for each movie in the array
    // this code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>) but im still putting it on the buttons view tag in html
    var a = $("<button>");
    // adding a class of movie to our button
    a.addClass("movie");
    // adding a data-attribute running through the loop
    a.attr("data-name", movies[i]);
    // providing the initial button text which runs through the loop
    a.text(movies[i]);
    // adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// this function handles events where one button is clicked to put our new movie
$("#add-movie").on("click", function (event) {
  event.preventDefault();

  // this line grabs the input from the textbox
  var movie = $("#movie-input").val().trim();

  // adding the movie from the textbox to our array
  movies.push(movie);
  console.log(movies);

  // calling renderButtons which makes the new button
  renderButtons();
});

// function for displaying the movie info
// using $(document).on instead of $(".movie").on to add event listeners to dynamically generated elements on the whole page
$(document).on("click", ".movie", showGif);

// using the renderButtons function to make the initial buttons we established
renderButtons();