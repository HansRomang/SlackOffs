

function walmartDisplay() {

	var walmartItem = $(this).attr("data-name");

	var queryURL = "http://api.walmartlabs.com/v1/search?apiKey={yjrkwv9phtddy72qkfxg4v33}&lsPublisherId={romanghans}&query=" + walmartItem + "&categoryId=3944&sort=price&order=asc";
//linking our search term "walmartItem" into our queryURL

$.ajax({
url: queryURL,
method: "GET"
}).then(function(response) {

 var walmartDiv = $("<div class='walmartDiv'");

 var walmartPrice = response.salesPrice;

 var walmartPriceText = $("<p>").text(walmartPrice);

 walmartDiv.append(walmartPriceText);

});


};

$("#a").on("click", function(event) {
	event.preventDefault();

	var walmartInput = $("#searchBar").val().trim();

	
});

