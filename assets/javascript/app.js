

      // week 6 day 2 at 1:30:00 starts how to populate the list of gifs
      // Initial array of movies
      var movies = ["The Matrix", "The Thing", "Dr. Who", "The Princess Bride"];

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < movies.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("movie");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", movies[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(movies[i]);
          // Adding the button to the HTML
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where one button is clicked
      $("#add-movie").on("click", function (event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var movie = $("#movie-input").val().trim();
        // The movie from the textbox is then added to our array
        movie.push(movie);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
      });
      // class 6.1 at 2:55:00
      // Calling the renderButtons function at least once to display the initial list of movies
      renderButtons();
      // Assign a click event to each of those .clickable-image images
      $(".clickable-image").on('click', function () {
        // Get the still image, animated image and current image
        var stillImage = $(this).attr('data-still');
        var animatedImage = $(this).attr('data-animated');
        var currentImage = $(this).attr('src');

        // If the current image is the still image, swap to the animated one
        if (currentImage === stillImage) {
          $(this).attr('src', animatedImage);
        } else { // else, the current image must be the animated one, so switch it to the still
          $(this).attr('src', stillImage);
          // you can also set the source without jQuery 
          this.src = stillImage;
        }
      })
      $("button").on("click", function() {
        // Grabbing and storing the data-animal property value from the button
        var movie = $(this).attr("data-movie");
  
        // Constructing a queryURL using the animal name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          movie + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
  
        // Performing an AJAX request with the queryURL
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // After data comes back from the request
          .then(function(response) {
            console.log(queryURL);
            console.log(movie);
            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;
            $(".clickable-image").text(JSON.stringify(response));
  
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {
  
              // Creating and storing a div tag
              var movieDiv = $("<div>");
  
              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + results[i].rating);
  
              // Creating and storing an image tag
              var stillImage = $("<img>");
              // Setting the src attribute of the image to a property pulled off the result item
              stillImage.attr("src", results[i].images.fixed_height.url);
  
              // Appending the paragraph and image tag to the animalDiv
              movieDiv.append(p);
              movieDiv.append(stillImage);
  
              // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
              $("#gifs-appear-here").prepend(movieDiv);
            }
          });
      });
