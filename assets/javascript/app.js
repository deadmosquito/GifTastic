

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
        movies.push(movie);

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
