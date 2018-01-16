var emotions = ["TFW", "SMH", "LOL", "Bye", "Groovy", "Eye roll", "Happy"]
// Adding click event listen listener to all buttons
function displayGiphyInfo() {
  var emotion = $(this).attr("data-emotion");
  // Constructing a queryURL using the emotion name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    emotion + "&api_key=FfTV66LfxjGtANy63jKzKGoadso1MHaB&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After data comes back from the request
    .then(function(response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Creating and storing a div tag
      var emotionDiv = $("<div>");

      // Creating a paragraph tag with the result item's rating
      var rating = results.rating;
      var p = $("<p>").text("Rating: " + rating);

      // Creating and storing an image tag
      var emotionImage = $("<img>");
      // Setting the src attribute of the image to a property pulled off the result item
      var giphy = results.images.fixed_height.url;
      emotionImage.attr("src", giphy);

      // Appending the paragraph and image tag to the emotionDiv
      emotionDiv.append(p);
      emotionDiv.append(emotionImage);

      // Prependng the emotionDiv to the HTML page in the "#gifs-appear-here" div
      $("#gifs-appear-here").prepend(emotionDiv);    
  });
}

function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < emotions.length; i++) {
    var a = $("<button>");
    a.addClass("emotion-btn");
    a.attr("emotion-name", emotions[i]);
    a.text(emotions[i]);
    $("#buttons-view").append(a);
  }
}

$("#add-emotion").on("click", function(event) {
  event.preventDefault();
  var emotion = $("#emotion-input").val().trim();
  emotions.push(emotion);
  renderButtons();
});

$(document).on("click", ".emotion-btn", displayGiphyInfo);
renderButtons();

