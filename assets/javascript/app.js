$(document).ready(function() {
  var gift = {
    arr: ["cat", "dog", "cow", "chicken" ,"pork"]
  }

  gift.initialize = function() {
    $("#buttonRow").empty();
    for (var i = 0; i < gift.arr.length; i++) {
      var newB = $("<button>");
      newB.addClass("btn-primary-spacing");
      newB.addClass("clearing");
      newB.attr("data-name", gift.arr[i]);
      newB.text(gift.arr[i]);
      $("#buttonRow").append(newB);
    }
  };

  $("#search").on("click", function(event) {       //TODO: figure out how to use button and other tags instead of input and still be able to prevent enter key refresh
    event.preventDefault();
    gift.arr.push(($("#searchText").val()).trim());
    gift.initialize();
    $("#searchText").val('');
  });

  $(document).on("click", ".clearing", function() {
    $("#results").empty();
    var animal = $(this).attr("data-name");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      animal +
      "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      results = response.data;
      for (var i = 0; i < results.length; i++) {
        var newDiv = $("<div>");
        var newP = $("<p>");
        newP.text("Ratings: "+results[i].rating);
        var newImg = $("<img/>");
        newImg.attr("src", results[i].images.fixed_height.url);
        newImg.attr("moving", results[i].images.fixed_height.url);
        newImg.attr("still", results[i].images.fixed_height_still.url);
        newImg.attr("state", "play");
        newImg.addClass("gif");
        newDiv.append(newImg);
        newDiv.append(newP);
        $("#results").prepend(newDiv);
      }
    });
  });

  $(document).on("click",".gif", function () {
    var state = $(this).attr("state");
    if (state == "pause") {
      $(this).attr("src", $(this).attr("moving"));
      $(this).attr('state',"play");
    }
    else {
      $(this).attr("src", $(this).attr("still"));
      $(this).attr('state',"pause");
    }
  });

  gift.initialize();
});
